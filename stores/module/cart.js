import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    loading: false,
    error: null,
    isLoggedIn: false,
    summary: {
      subtotal: 0,
      tax: 0,
      tax_rate: 0,
      total: 0,
    },
    appliedCoupons: [],
    discountAmount: 0,
  }),

  getters: {
    cartTotal: (state) => {
      const subtotal = state.cart
        .reduce((total, item) => {
          // clean string (remove commas/spaces)
          const price = parseFloat(
            String(item.price.after_discount).replace(/,/g, "")
          );

          return total + item.quantity * (price || 0);
        }, 0);
      
      return (subtotal - state.discountAmount).toFixed(3);
    },
    cartSummary: (state) => {
      return state.summary;
    },
    getCartItem: (state) => (productId) => {
      return state.cart.find((item) => item.id === productId);
    },

    getCartItems: (state) => {
      return state.cart;
    },

    hasItems: (state) => {
      return state.cart.length > 0;
    },

    uniqueItemsCount: (state) => {
      return state.cart.length;
    },

    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    
    // Coupon getters
    appliedCouponsList: (state) => state.appliedCoupons,
    totalDiscount: (state) => state.discountAmount,
  },

  actions: {
    // Check if user is logged in
    checkAuthStatus() {
      if (process.client) {
        const token = useCookie("token");
        this.isLoggedIn = !!token.value;
      }
    },

    // Save cart to cookies
    saveCartToCookies() {
      if (process.client) {
        const cartCookie = useCookie("cart", {
          default: () => [],
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        cartCookie.value = this.cart;
      }
    },

    // Load cart from cookies
    loadCartFromCookies() {
      if (process.client) {
        const cartCookie = useCookie("cart", {
          default: () => [],
        });
        this.cart = cartCookie.value || [];
      }
    },

    // Sync cookie cart to server
    async syncCartToServer() {
      if (!this.isLoggedIn || this.cart.length === 0) return;

      try {
        const formattedProducts = this.cart.map((product) => ({
          id: product.id,
          quantity: product.quantity || 1,
        }));

        const { data, error } = await useMyFetch("/cart", {
          method: "POST",
          body: { products: formattedProducts },
        });

        if (error.value) {
          console.error("Failed to sync cart to server:", error.value.message);
        } else {
          console.log("Cart synced to server successfully");
          // Clear cookie cart after successful sync
          if (process.client) {
            const cartCookie = useCookie("cart");
            cartCookie.value = null;
          }
        }
      } catch (err) {
        console.error("Error syncing cart to server:", err);
      }
    },

    async loadCart() {
      this.checkAuthStatus();
      this.loading = true;
      if (this.isLoggedIn) {
        // Load from server if logged in
        const { data, error: fetchError } = await useMyFetch("/cart");
        if (fetchError.value) {
          this.error = fetchError.value.message || "Failed to load cart";
          // Fallback to cookie cart if server fails
          this.loadCartFromCookies();
        } else {
          this.cart = data.value?.products || [];
          this.summary = data.value?.summary || {};
          const cartCookie = useCookie("cart");
          cartCookie.value = [];
          this.loading = false;
        }
      } else {
        // Load from cookies if not logged in
        this.loadCartFromCookies();
        this.loading = false;
      }
    },
    async addToCart(products) {
      // Check auth status before adding
      this.checkAuthStatus();

      // Update local cart state with full product objects
      for (const product of products) {
        const existingItem = this.cart.find((item) => item.id === product.id);

        if (existingItem) {
          existingItem.quantity += product.quantity ?? 1;
        } else {
          // Add full product object to local cart
          this.cart.push({
            ...product,
            quantity: product.quantity ?? 1,
          });
        }
      }

      // If logged in, also send to server
      if (this.isLoggedIn) {
        try {
          const formattedProducts = products.map((product) => ({
            id: product.id,
            quantity: product.quantity || 1,
          }));

          const { data, error } = await useMyFetch("/cart", {
            method: "POST",
            body: { products: formattedProducts },
          });

          if (error.value) {
            console.error("Failed to sync to server:", error.value.message);
          }

          return data?.value;
        } catch (err) {
          console.error("Failed to add to cart on server:", err);
          // Don't throw error, cart is still saved locally
        }
      } else {
        this.saveCartToCookies();
      }

      return { success: true };
    },
    // Unified method to update cart - handles both updates and removals
    async updateCart() {
      try {
        // Format all current cart items for API
        const formattedProducts = this.cart.map((product) => ({
          id: product.id,
          quantity: product.quantity || 1,
        }));

        const { data, error } = await useMyFetch(`/cart`, {
          method: "PUT",
          body: { products: formattedProducts },
        });

        if (error.value) {
          console.error(
            "Failed to update cart on server:",
            error.value.message
          );
        }

        return data?.value;
      } catch (err) {
        console.error("Failed to update cart:", err);
        throw err;
      }
    },
    // Remove item from cart and sync remaining items
    async removeFromCart(productId) {
      const index = this.cart.findIndex((item) => item.id === productId);
      if (index > -1) {
        // Remove from local cart
        this.cart.splice(index, 1);
        this.saveCartToCookies();

        // If logged in, sync remaining cart to server
        this.checkAuthStatus();
        if (this.isLoggedIn) {
          try {
            if (this.cart.length == 0) {
              await this.clearCart();
            } else {
              await this.updateCart();
            }
          } catch (error) {
            console.error("Failed to sync cart after removal:", error);
          }
        }
      }
    },

    // Update individual product quantity
    async updateProductQuantity(productId, quantity) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          await this.removeFromCart(productId);
        } else {
          // Update quantity
          item.quantity = quantity;
          this.saveCartToCookies();

          // If logged in, sync to server
          this.checkAuthStatus();
          if (this.isLoggedIn) {
            try {
              await this.updateCart();
            } catch (error) {
              console.error("Failed to sync quantity update to server:", error);
            }
          }
        }
      }
    },

    // Increment product quantity
    async incrementQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
        this.saveCartToCookies();

        // If logged in, sync to server
        this.checkAuthStatus();
        if (this.isLoggedIn) {
          try {
            await this.updateCart();
          } catch (error) {
            console.error("Failed to sync increment to server:", error);
          }
        }
      }
    },

    // Decrement product quantity
    async decrementQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          this.saveCartToCookies();

          // If logged in, sync to server
          this.checkAuthStatus();
          if (this.isLoggedIn) {
            try {
              await this.updateCart();
            } catch (error) {
              console.error("Failed to sync decrement to server:", error);
            }
          }
        } else {
          // Remove item if quantity would be 0
          await this.removeFromCart(productId);
        }
      }
    },

    async clearCart() {
      const { status, error } = await useMyFetch(`/cart`, {
        method: "DELETE",
      });
      console.log(status.value);
      if (error.value) {
        console.error("Failed to clear cart:", error.value.message);
      } else if (status.value == "success") {
        this.cart = [];
        const cartCookie = useCookie("cart");
        cartCookie.value = null;
        console.log("Cart cleared");
        window.location.reload();
      }
    },

    async checkout() {
      // Replace with actual checkout API call
      this.loading = true;
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.clearCart();
        this.error = null;
        return { success: true, message: "Order placed successfully" };
      } catch (error) {
        this.error = error.message;
        console.error("Checkout failed:", error);
        return { success: false, message: error.message };
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = null;
    },

    // Handle user login - sync cookie cart to server
    async onUserLogin() {
      this.checkAuthStatus();
      if (this.isLoggedIn) {
        // Load any existing cart from cookies
        this.loadCartFromCookies();
        // Sync to server
        await this.syncCartToServer();
        // Reload from server to get the latest state
        await this.loadCart();
      }
    },

    // Handle user logout - save current cart to cookies
    onUserLogout() {
      this.checkAuthStatus();
      if (!this.isLoggedIn) {
        this.saveCartToCookies();
      }
    },

    // Apply coupon code
    async applyCoupon(code) {
      try {
        this.loading = true;
        this.error = null;

        const { data, error } = await useMyFetch("/coupons", {
          method: "POST",
          body: { code: code.trim() },
        });

        if (error.value) {
          this.error =  "Failed to apply coupon";
          return { success: false, message: this.error };
        }

        const response = data.value;
        
        // Handle API error response format
        if (response.status === false) {
          const errorMessage =  "Failed to apply coupon";
          console.log('errorMessage :>> ', errorMessage);
          this.error = errorMessage;
          return { success: false, message: errorMessage };
        }
        
        if (response.status === true && response.available) {
          // Check if coupon is already applied
          const existingCoupon = this.appliedCoupons.find(coupon => coupon.code === code);
          
          if (existingCoupon) {
            this.error = "Coupon already applied";
            return { success: false, message: "Coupon already applied" };
          }

          // Add coupon to applied list
          const couponData = {
            code: code,
            amount: response.amount,
            message: response.message,
          };
          
          this.appliedCoupons.push(couponData);
          this.discountAmount += response.amount;
          this.summary.total -= response.amount;

          return { 
            success: true, 
            message: response.message, 
            amount: response.amount 
          };
        } else {
          // Handle error response format
          const errorMessage ="Coupon not available";
          this.error = errorMessage;
          return { success: false, message: errorMessage };
        }
      } catch (err) {
        this.error = "Failed to apply coupon";
        console.error("Apply coupon error:", err);
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Remove coupon code
    removeCoupon(code) {
      const couponIndex = this.appliedCoupons.findIndex(coupon => coupon.code === code);
      
      if (couponIndex > -1) {
        const coupon = this.appliedCoupons[couponIndex];
        
        // Remove from applied coupons
        this.appliedCoupons.splice(couponIndex, 1);
        
        // Subtract amount from total discount
        this.discountAmount -= coupon.amount;
        
        // Ensure discount doesn't go below 0
        if (this.discountAmount < 0) {
          this.discountAmount = 0;
        }

        return { success: true, message: "Coupon removed successfully" };
      }
      
      return { success: false, message: "Coupon not found" };
    },

    // Clear all applied coupons
    clearAllCoupons() {
      this.appliedCoupons = [];
      this.discountAmount = 0;
      return { success: true, message: "All coupons removed" };
    },

    // Get coupon by code
    getCouponByCode(code) {
      return this.appliedCoupons.find(coupon => coupon.code === code);
    },
  },
});
