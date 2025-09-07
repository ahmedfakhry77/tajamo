<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <Breadcrumb
        :breadcrumbs="[{ name: $t('navigation.cart'), path: '/cart' }]"
      />

      <!-- Page Header -->
      <CartHeader />

      <!-- Loading State -->
      <CartLoader v-if="cartStore.isLoading" />

      <!-- Empty Cart -->
      <template v-else>
        <CartEmpty v-if="!cartStore.hasItems" />
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
                  <div class="flex items-center justify-between gap-2 mb-4">
                    <h2 class="text-lg font-semibold text-gray-900">
                      {{
                        $t("cart.items.title", {
                          count: cartStore.uniqueItemsCount,
                        })
                      }}
                    </h2>
                    <span
                      class="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                      @click="cartStore.clearCart"
                    >
                      {{ $t("cart.actions.clearCart") }}
                    </span>
                  </div>
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
                      <p class="text-lg font-semibold text-gray-900 mt-2">
                        {{ item.price?.after_discount || "0" }}
                        {{ item.price?.currency.es || "" }}
                      </p>
                    </div>

                    <!-- Quantity Controls -->
                    <div
                      class="flex items-center border border-gray-300 rounded-lg"
                    >
                      <button
                        @click="item.quantity--"
                        class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                        :disabled="item.quantity == 1"
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
                        @click="item.quantity++"
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
                      @click="cartStore.removeFromCart(item.id)"
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
                  <!-- Update -->
                  <div class="flex items-center justify-end p-6 gap-3">
                    <button
                      @click="updateCart"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        ></path>
                      </svg>
                      {{ $t("cart.actions.updateCart") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <CartSummary />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import Breadcrumb from "~/components/global/Breadcrumb.vue";
import { useCartStore } from "~/stores/module/cart";
import { useI18n } from "vue-i18n";

const cartStore = useCartStore();
await cartStore.loadCart();
const { t } = useI18n();

// Set page title
useHead({
  title: t("cart.title"),
});


// Computed properties
const cartItems = computed(() => cartStore.getCartItems);




const updateCart = async () => {
  try {
    await cartStore.updateCart();
  } catch (error) {
    console.error("Failed to update cart:", error);
  }
};


</script>
