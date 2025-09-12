<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <Breadcrumb
        :breadcrumbs="[
          { name: 'Shop', path: '/shop' },
          { name: 'Cart', path: '/cart' },
          { name: 'Checkout', path: '/checkout' },
        ]"
      />

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p class="text-gray-600">Complete your order and proceed to payment</p>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-8" v-if="cartItems.length > 0">
        <!-- Left Side - Cart Items & Address -->
        <div class="flex-1 space-y-6">
          <!-- Cart Items -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">
                Order Items ({{ cartItems.length }})
              </h2>
            </div>

            <div class="divide-y divide-gray-200">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="p-6 flex items-center gap-4"
              >
                <!-- Product Image -->
                <div
                  class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <img
                    :src="item.thumbnail"
                    alt="Product Image"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900 truncate">
                    {{ item.name?.es || item.name?.en || "Product" }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ item.category?.slug || "Category" }}
                  </p>
                  <p class="text-sm text-gray-600 mt-1">
                    Quantity: {{ item.quantity }}
                  </p>
                  <p class="text-lg font-semibold text-gray-900 mt-2">
                    {{ item.price?.after_discount || "0" }}
                    {{ item.price?.currency.es || "" }}
                  </p>
                </div>

                <!-- Total Price -->
                <div class="text-right">
                  <p class="text-lg font-semibold text-gray-900">
                    {{ formatPrice(getProductPrice(item) * item.quantity) }}
                    {{ item.price?.currency.es || "" }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Shipping Information
            </h2>

            <!-- Address Selection -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-700 mb-4">
                Select Delivery Address
              </h3>

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
                        <span class="font-medium text-gray-900">{{
                          address.name
                        }}</span>
                        <span
                          v-if="address.default"
                          class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          Default
                        </span>
                      </div>
                      <p class="text-gray-600 text-sm">{{ address.street }}</p>
                      <p class="text-gray-600 text-sm">
                        {{ address.city }}, {{ address.state }}
                        {{ address.zipCode }}
                      </p>
                      <p class="text-gray-600 text-sm">{{ address.country }}</p>
                      <p class="text-gray-600 text-sm">
                        Phone: {{ address.phone }}
                      </p>
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
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  No addresses found
                </h3>
                <p class="text-gray-600 mb-4">
                  Please add a delivery address to continue
                </p>
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
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add New Address
              </NuxtLink>
            </div>

            <!-- Order Notes -->
            <div class="mb-6">
              <label
                for="orderNotes"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
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

        <!-- Right Side - Order Summary -->
        <div class="lg:w-96">
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartSubtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span v-if="shippingCost"
                  >{{ formatPrice(shippingCost) }}
                  {{ cartItems[0].price?.currency.es }}</span
                >
                <span v-else>0 {{ cartItems[0].price?.currency.es }}</span>
              </div>

              <!-- tax -->
              <div class="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>{{ formatPrice(cartStore.cartSummary?.tax) }}
                {{ cartItems[0].price?.currency.es }}</span>
              </div>

               <div class="space-y-3">
                 <!-- Coupon Input -->
                 <div class="flex items-center gap-2">
                   <input 
                     type="text" 
                     v-model="couponCode" 
                     class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     placeholder="Enter coupon code" 
                   />
                   <button 
                     @click="applyCoupon" 
                     class="px-4 py-2 bg-scimaGold text-white font-medium rounded-lg hover:bg-scimaGold/90 transition-colors whitespace-nowrap"
                   >
                     Apply
                   </button>
                 </div>

                 <!-- Success/Error Messages -->
                 <div v-if="couponSuccess" class="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                   {{ couponSuccess }}
                 </div>
                 <div v-if="couponError" class="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                   {{ couponError }}
                 </div>

                 <!-- Applied Coupons List -->
                 <div v-if="appliedCoupons.length > 0" class="space-y-2">
                   <h4 class="text-sm font-medium text-gray-700">Applied Coupons:</h4>
                   <div v-for="coupon in appliedCoupons" :key="coupon.code" 
                        class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2">
                     <div class="flex items-center gap-2">
                       <span class="text-sm font-medium text-green-800">{{ coupon.code }}</span>
                       <span class="text-sm text-green-600">-{{ formatPrice(coupon.amount) }}</span>
                     </div>
                     <button 
                       @click="removeCoupon(coupon.code)"
                       class="text-red-500 hover:text-red-700 text-sm font-medium"
                     >
                       Remove
                     </button>
                   </div>
                 </div>
               </div>
              <div class="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span v-if="discountAmount > 0"
                  >-{{ formatPrice(discountAmount) }} {{ cartItems[0]?.price?.currency?.es || '' }}</span
                >
                <span v-else>0 {{ cartItems[0]?.price?.currency?.es || '' }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div
                  class="flex justify-between text-lg font-semibold text-gray-900"
                >
                  <span>Total</span>
                  <span
                    >{{ formatPrice(cartTotal) }}
                    {{ cartItems[0].price?.currency.es }}</span
                  >
                </div>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Payment Methods
            </h3>
            <div class="flex items-center justify-between gap-4 mb-4">
              <IconsStripe :class="paymentMethod === 'stripe' ? 'border-scimaGold border-2' : ''" @click="selectPaymentMethod('stripe')" />
              <IconsPayu :class="paymentMethod === 'payu' ? 'border-scimaGold border-2' : ''" @click="selectPaymentMethod('payu')" />
              <IconsBold :class="paymentMethod === 'bold' ? 'border-scimaGold border-2' : ''" @click="selectPaymentMethod('bold')" />
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToPayment"
              :disabled="!canProceedToPayment"
              class="w-full px-6 py-3 bg-scimaGold text-white font-medium rounded-lg hover:bg-scimaGold/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{
                canProceedToPayment
                  ? "Proceed to Payment"
                  : "Select Address to Continue"
              }}
            </button>

            <!-- Continue Shopping -->
            <div class="mt-4 text-center">
              <NuxtLink
                to="/shop"
                class="text-sm text-scimaGold hover:text-scimaGold/90 font-medium"
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
import { computed, onMounted, ref } from "vue";
import { useCartStore } from "~/stores/module/cart";
import { useAddressesStore } from "~/stores/module/addresses";
import Breadcrumb from "~/components/global/Breadcrumb.vue";

// Set page title
useHead({
  title: "Checkout - Tajamo",
});
definePageMeta({
  layout: "default",
  middleware: "auth",
});
// Stores
const cartStore = useCartStore();
const addressesStore = useAddressesStore();

// Reactive state
const selectedAddress = ref(null);
const orderNotes = ref("");
const couponCode = ref("");
const couponError = ref("");
const couponSuccess = ref("");

// Computed properties
const cartItems = computed(() => cartStore.getCartItems);
const addresses = computed(() => addressesStore.addresses);

const cartSubtotal = computed(() => {
  return cartStore.cartSummary?.subtotal;
});

const shippingCost = computed(() => {
  return 0;
});

const discountAmount = computed(() => {
  return cartStore.totalDiscount;
});

const appliedCoupons = computed(() => {
  return cartStore.appliedCouponsList;
});

const cartTotal = computed(() => {
  return cartStore.cartSummary?.total;
});

const canProceedToPayment = computed(() => {
  return selectedAddress.value !== null && cartItems.value.length > 0 && paymentMethod.value !== "";
});

// Methods
const selectAddress = (address) => {
  selectedAddress.value = address;
};

const getProductPrice = (item) => {
  return parseFloat(item.price?.after_discount?.replace(/[^\d.]/g, "") || "0");
};

const formatPrice = (price) => {
  return `${price.toFixed(3)}`;
};

const proceedToPayment = () => {
  if (!canProceedToPayment.value) return;
  
  // Format coupons array
  const coupons = appliedCoupons.value.map(coupon => ({
    code: coupon.code,
    amount: coupon.amount
  }));
  
  let payload = {
    address: selectedAddress.value.id,
    payment_method: paymentMethod.value,
    notes: orderNotes.value,
    coupons: coupons,
  };
  console.log(payload);
};

// Load data on mount
Promise.all([addressesStore.loadAddresses(), cartStore.loadCart()]);
selectedAddress.value = addresses.value.find((addr) => addr.default);
const paymentMethod = ref("");
const selectPaymentMethod = (method) => {
  paymentMethod.value = method;
};

// Coupon methods
const applyCoupon = async () => {
  if (!couponCode.value.trim()) {
    couponError.value = "Please enter a coupon code";
    return;
  }

  couponError.value = "";
  couponSuccess.value = "";

  const result = await cartStore.applyCoupon(couponCode.value);
  
  if (result.success) {
    couponSuccess.value = result.message?.es || result.message?.en || "Coupon applied successfully";
    couponCode.value = "";
  } else {
    couponError.value = result.message;
  }
};

const removeCoupon = (code) => {
  const result = cartStore.removeCoupon(code);
  if (result.success) {
    couponSuccess.value = "Coupon removed successfully";
  } else {
    couponError.value = result.message;
  }
};

</script>

<style scoped>
/* Checkout page specific styles */
</style>
