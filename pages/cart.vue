<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <Breadcrumb
        :breadcrumbs="[{ name: $t('navigation.cart'), path: '/cart' }]"
      />

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t("cart.header.title") }}
        </h1>
        <p class="text-gray-600">{{ $t("cart.header.subtitle") }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="cartStore.isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">{{ $t("cart.loading") }}</p>
      </div>

      <!-- Empty Cart -->
      <template v-else>
        <div v-if="!cartStore.hasItems" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            {{ $t("cart.empty.title") }}
          </h2>
          <p class="text-gray-600 mb-6">{{ $t("cart.empty.subtitle") }}</p>
          <NuxtLink
            to="/"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            {{ $t("cart.empty.continueShopping") }}
          </NuxtLink>
        </div>
        <template v-else>
          <!-- Cart Items -->
          <div
            v-if="cartStore.hasItems"
            class="flex w-full flex-col md:flex-row gap-4 mb-2"
          >
            <!-- Cart Items List -->
            <div class="w-full md:w-2/3">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                  <h2 class="text-lg font-semibold text-gray-900">
                    {{
                      $t("cart.items.title", {
                        count: cartStore.uniqueItemsCount,
                      })
                    }}
                  </h2>
                </div>

                <div class="divide-y divide-gray-200">
                  <div
                    v-for="item in cartItems"
                    :key="item.productId"
                    class="p-6 flex items-center gap-4"
                  >
                    <!-- Product Image -->
                    <div
                      class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <!-- <svg
                        class="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        ></path>
                      </svg> -->
                      <img :src="getProductImage(item.productId)" alt="Product Image" class="w-full h-full object-cover rounded-lg">
                    </div>

                    <!-- Product Info -->
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-medium text-gray-900 truncate">
                        {{ getProductName(item.productId) }}
                      </h3>
                      <p class="text-sm text-gray-500 mt-1">
                        {{ getProductCategory(item.productId) }}
                      </p>
                      <p class="text-lg font-semibold text-gray-900 mt-2">
                        {{ getProductPrice(item.productId) }}
                        {{ getProductCurrency(item.productId) }}
                      </p>
                    </div>

                    <!-- Quantity Controls -->
                    <div
                      class="flex items-center border border-gray-300 rounded-lg"
                    >
                      <button
                        @click="cartStore.decrementQuantity(item.productId)"
                        class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                        :disabled="item.quantity === 1"
                        :title="$t('cart.items.decrement')"
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
                            d="M20 12H4"
                          ></path>
                        </svg>
                      </button>
                      <span
                        class="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center"
                      >
                        {{ item.quantity }}
                      </span>
                      <button
                        @click="cartStore.incrementQuantity(item.productId)"
                        class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                        :title="$t('cart.items.increment')"
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
                      </button>
                    </div>

                    <!-- Remove Button -->
                    <button
                      @click="cartStore.removeFromCart(item.productId)"
                      class="text-red-500 hover:text-red-700 transition-colors p-2"
                      :title="$t('cart.items.remove')"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="w-full md:w-1/3">
              <div
                class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 class="text-lg font-semibold text-gray-900 mb-4">
                  {{ $t("cart.summary.title") }}
                </h2>

                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm text-gray-600">
                    <span>{{
                      $t("cart.summary.subtotal", {
                        count: cartStore.cartItemsCount,
                      })
                    }}</span>
                    <span>{{ formatPrice(cartStore.cartTotal) }}</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-600">
                    <span>{{ $t("cart.summary.shipping") }}</span>
                    <span>{{ $t("cart.summary.free") }}</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-600">
                    <span>{{ $t("cart.summary.tax") }}</span>
                    <span>{{ $t("cart.summary.calculatedAtCheckout") }}</span>
                  </div>
                  <div class="border-t border-gray-200 pt-3">
                    <div
                      class="flex justify-between text-lg font-semibold text-gray-900"
                    >
                      <span>{{ $t("cart.summary.total") }}</span>
                      <span>{{ formatPrice(cartStore.cartTotal) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Checkout Button -->
                <NuxtLink
                  to="/checkout"
                  class="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  {{ $t("cart.actions.checkout") }}
                </NuxtLink>

                <!-- Continue Shopping -->
                <NuxtLink
                  to="/"
                  class="block w-full text-center text-blue-600 hover:text-blue-700 font-medium py-3 mt-3 transition-colors"
                >
                  {{ $t("cart.actions.continueShopping") }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCartStore } from "~/stores/module/cart";
import { useProductsStore } from "~/stores/module/products";
import Breadcrumb from "~/components/Global/Breadcrumb.vue";
const { t } = useI18n();
// Set page title
useHead({
  title: t("cart.title"),
});

const cartStore = useCartStore();
const productsStore = useProductsStore();

// Computed properties
const cartItems = computed(() => cartStore.getCartItems);
const getProductImage = (productId) => {
  const product = productsStore.getProductById(productId);
  return product ? product.gallery[0] || "" : "";
};
// Helper functions
const getProductName = (productId) => {
  const product = productsStore.getProductById(productId);
  return product
    ? product.name?.es || product.name?.en || "Product"
    : "Product";
};

const getProductCategory = (productId) => {
  const product = productsStore.getProductById(productId);
  return product ? product.category?.slug || "Category" : "Category";
};

const getProductPrice = (productId) => {
  const product = productsStore.getProductById(productId);
  return product ? product.price?.after_discount || "0" : "0";
};

const getProductCurrency = (productId) => {
  const product = productsStore.getProductById(productId);
  return product ? product.price?.currency || "" : "";
};

const formatPrice = (price) => {
  // This is a placeholder - in a real app you'd format based on currency
  return `$${(price / 1000).toFixed(2)}`;
};



onMounted(async () => {
  // Load products if not already loaded
  if (productsStore.products.length === 0) {
    await productsStore.loadProducts();
  }
});
</script>
