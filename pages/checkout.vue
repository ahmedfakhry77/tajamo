<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <Breadcrumb
        :breadcrumbs="[
          { name: 'Shop', path: '/shop' },
          { name: 'Cart', path: '/cart' },
          { name: 'Checkout', path: '/checkout' }
        ]"
      />

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p class="text-gray-600">Complete your order and proceed to payment</p>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Side - Checkout Form -->
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
            
            <!-- Address Selection -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-700 mb-4">Select Delivery Address</h3>
              
              <!-- Address List -->
              <div v-if="addresses.length > 0" class="space-y-3">
                <div
                  v-for="address in addresses"
                  :key="address.id"
                  @click="selectAddress(address)"
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-200"
                  :class="
                    selectedAddress?.id === address.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  "
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="font-medium text-gray-900">{{ address.name }}</span>
                        <span v-if="address.isDefault" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      </div>
                      <p class="text-gray-600 text-sm">{{ address.street }}</p>
                      <p class="text-gray-600 text-sm">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                      <p class="text-gray-600 text-sm">{{ address.country }}</p>
                      <p class="text-gray-600 text-sm">Phone: {{ address.phone }}</p>
                    </div>
                    <div class="ml-4">
                      <div
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        :class="
                          selectedAddress?.id === address.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        "
                      >
                        <div
                          v-if="selectedAddress?.id === address.id"
                          class="w-2.5 h-2.5 rounded-full bg-white"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- No Addresses -->
              <div v-else class="text-center py-8">
                <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No addresses found</h3>
                <p class="text-gray-600 mb-4">Please add a delivery address to continue</p>
                <NuxtLink
                  to="/address"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Address
                </NuxtLink>
              </div>
            </div>

            <!-- Add New Address Button -->
            <div v-if="addresses.length > 0" class="mb-6">
              <NuxtLink
                to="/address"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Add New Address
              </NuxtLink>
            </div>

            <!-- Order Notes -->
            <div class="mb-6">
              <label for="orderNotes" class="block text-sm font-medium text-gray-700 mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                id="orderNotes"
                v-model="orderNotes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special instructions for delivery..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Right Side - Cart Summary -->
        <div class="lg:w-96">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartItems"
                :key="item.productId"
                class="flex items-center gap-3"
              >
                <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                  <img
                    :src="getProductImage(item.productId)"
                    :alt="getProductName(item.productId)"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate">
                    {{ getProductName(item.productId) }}
                  </h4>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ formatPrice(getProductPrice(item.productId) * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="border-t border-gray-200 pt-4 space-y-3">
              <div class="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartSubtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{{ formatPrice(shippingCost) }}</span>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-{{ formatPrice(discountAmount) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{{ formatPrice(cartTotal) }}</span>
                </div>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToPayment"
              :disabled="!canProceedToPayment"
              class="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ canProceedToPayment ? 'Proceed to Payment' : 'Select Address to Continue' }}
            </button>

            <!-- Continue Shopping -->
            <div class="mt-4 text-center">
              <NuxtLink
                to="/shop"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue Shopping
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useCartStore } from '~/stores/module/cart';
import { useAddressesStore } from '~/stores/module/addresses';
import { useProductsStore } from '~/stores/module/products';
import Breadcrumb from '~/components/Global/Breadcrumb.vue';

// Set page title
useHead({
  title: "Checkout - Tajamo",
});

// Stores
const cartStore = useCartStore();
const addressesStore = useAddressesStore();
const productsStore = useProductsStore();

// Reactive state
const selectedAddress = ref(null);
const orderNotes = ref('');

// Computed properties
const cartItems = computed(() => cartStore.getCartItems);
const addresses = computed(() => addressesStore.addresses);

const cartSubtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const product = productsStore.getProductById(item.productId);
    if (product) {
      const price = parseFloat(product.price.after_discount.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }
    return total;
  }, 0);
});

const shippingCost = computed(() => {
  // Free shipping for orders over 5000, otherwise 500
  return cartSubtotal.value > 5000 ? 0 : 500;
});

const discountAmount = computed(() => {
  // Example discount logic - 10% off for orders over 3000
  if (cartSubtotal.value > 3000) {
    return cartSubtotal.value * 0.1;
  }
  return 0;
});

const cartTotal = computed(() => {
  return cartSubtotal.value + shippingCost.value - discountAmount.value;
});

const canProceedToPayment = computed(() => {
  return selectedAddress.value !== null && cartItems.value.length > 0;
});

// Methods
const selectAddress = (address) => {
  selectedAddress.value = address;
};

const getProductImage = (productId) => {
  const product = productsStore.getProductById(productId);
  return product?.thumbnail || '/images/placeholder.jpg';
};

const getProductName = (productId) => {
  const product = productsStore.getProductById(productId);
  return product?.name?.es || product?.name?.en || 'Product';
};

const getProductPrice = (productId) => {
  const product = productsStore.getProductById(productId);
  if (product) {
    return parseFloat(product.price.after_discount.replace(/[^\d.]/g, ''));
  }
  return 0;
};

const formatPrice = (price) => {
  return `$${(price / 1000).toFixed(2)}`;
};

const proceedToPayment = () => {
  if (!canProceedToPayment.value) return;
  
  // Here you would typically:
  // 1. Save the order details
  // 2. Redirect to payment gateway
  // 3. Or show payment form
  
  console.log('Proceeding to payment with:', {
    address: selectedAddress.value,
    items: cartItems.value,
    total: cartTotal.value,
    notes: orderNotes.value
  });
  
  // For now, just show an alert
  alert('Payment functionality would be implemented here. This is a demo checkout page.');
};

// Load data on mount
onMounted(async () => {
  // Load products if not already loaded
  if (productsStore.products.length === 0) {
    await productsStore.loadProducts();
  }
  
  // Load addresses if not already loaded
  if (addressesStore.addresses.length === 0) {
    await addressesStore.loadAddresses();
  }
  
  // Set default address if available
  if (addresses.value.length > 0 && !selectedAddress.value) {
    const defaultAddress = addresses.value.find(addr => addr.isDefault);
    selectedAddress.value = defaultAddress || addresses.value[0];
  }
});
</script>

<style scoped>
/* Checkout page specific styles */
</style>
