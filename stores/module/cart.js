import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    loading: false,
    error: null
  }),

  getters: {
    cartItemsCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    
    cartTotal: (state) => {
      // This would need to be connected with products store for actual prices
      return state.cart.reduce((total, item) => {
        // Placeholder calculation - replace with actual product price lookup
        // In a real app, you'd get the product from the products store
        return total + (item.quantity * 1000) // Assuming 1000 as base price
      }, 0)
    },
    
    getCartItem: (state) => (productId) => {
      return state.cart.find(item => item.productId === productId)
    },

    getCartItems: (state) => {
      return state.cart
    },

    hasItems: (state) => {
      return state.cart.length > 0
    },

    uniqueItemsCount: (state) => {
      return state.cart.length
    },

    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    addToCart(productId, quantity = 1) {
      const existingItem = this.cart.find(item => item.productId === productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cart.push({
          productId,
          quantity,
          addedAt: new Date().toISOString()
        })
      }
      
      this.saveUserPreferences()
    },

    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.productId === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
        this.saveUserPreferences()
      }
    },

    updateCartItemQuantity(productId, quantity) {
      const item = this.cart.find(item => item.productId === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
          this.saveUserPreferences()
        }
      }
    },

    incrementQuantity(productId) {
      const item = this.cart.find(item => item.productId === productId)
      if (item) {
        item.quantity += 1
        this.saveUserPreferences()
      }
    },

    decrementQuantity(productId) {
      const item = this.cart.find(item => item.productId === productId)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        this.saveUserPreferences()
      } else if (item && item.quantity === 1) {
        this.removeFromCart(productId)
      }
    },

    clearCart() {
      this.cart = []
      this.saveUserPreferences()
    },

    // User preferences persistence
    saveUserPreferences() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cart))
      } catch (error) {
        console.error('Failed to save cart:', error)
        this.error = 'Failed to save cart'
      }
    },

    loadUserPreferences() {
      try {
        const cart = localStorage.getItem('cart')
        if (cart) {
          this.cart = JSON.parse(cart)
        }
        this.error = null
      } catch (error) {
        console.error('Failed to load cart:', error)
        this.error = 'Failed to load cart'
      }
    },

    async syncCart() {
      // Replace with actual API call to sync with backend
      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        this.error = null
      } catch (error) {
        this.error = error.message
        console.error('Failed to sync cart:', error)
      } finally {
        this.loading = false
      }
    },

    async checkout() {
      // Replace with actual checkout API call
      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.clearCart()
        this.error = null
        return { success: true, message: 'Order placed successfully' }
      } catch (error) {
        this.error = error.message
        console.error('Checkout failed:', error)
        return { success: false, message: error.message }
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    resetStore() {
      this.cart = []
      this.loading = false
      this.error = null
    }
  }
})
