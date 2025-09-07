<template>
  <div class="relative">
    <button
      @click="showCartDropdown = !showCartDropdown"
      class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      aria-label="Shopping Cart"
    >
      <svg
        data-slot="icon"
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        ></path>
      </svg>
      <!-- Cart Count Badge -->
      <span
        v-if="cartStore?.uniqueItemsCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      >
        {{
          cartStore?.uniqueItemsCount > 99 ? "99+" : cartStore?.uniqueItemsCount
        }}
      </span>
    </button>

    <!-- Cart Dropdown (Simple) -->
    <div
      v-if="showCartDropdown"
      @mouseover="showCartDropdown = true"
      @mouseleave="showCartDropdown = false"
      class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      @click.stop
    >
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Shopping Cart</h3>
          <button
            @click="showCartDropdown = false"
            class="text-gray-400 hover:text-gray-600"
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div v-if="cartStore?.uniqueItemsCount === 0" class="text-center py-8">
          <p class="text-gray-500">Your cart is empty</p>
        </div>

        <div v-else class="space-y-3 max-h-64 overflow-y-auto">
          <div
            v-for="item in cartStore?.getCartItems"
            :key="item.id"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div
              class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"
            >
              <img
                :src="item.thumbnail"
                alt="Product Image"
                class="w-full h-full object-cover rounded"
              />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ item.name?.es || item.name?.en || "Product" }}
              </p>
              <p class="text-xs text-gray-500">
                {{ item.category?.slug || "Category" }}
              </p>
              <p class="text-xs text-gray-700 font-medium">
                {{ item.price?.after_discount || "0" }}
                {{ item.price?.currency.es || "" }}
              </p>
              <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <button
              @click="cartStore.removeFromCart(item.id)"
              class="text-red-500 hover:text-red-700"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          v-if="cartStore.uniqueItemsCount > 0"
          class="mt-4 pt-4 border-t border-gray-200"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-semibold text-gray-900">Total:</span>
            <span class="text-lg font-semibold text-gray-900"
              >{{ Number(cartTotal)?.toFixed(2) }}
              {{ cartStore.getCartItems[0].price?.currency.es }}</span
            >
          </div>
          <button
            @click="goToCart"
            class="w-full bg-scimaPrimary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            View Cart
          </button>
          <!-- <button
            @click="checkout"
            class="w-full mt-2 bg-scimaPrimary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Checkout
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCartStore } from "~/stores/module/cart";

const cartStore = useCartStore();
await cartStore.loadCart();
const showCartDropdown = ref(false);

// Computed properties
const cartTotal = computed(() => cartStore.cartTotal);

// Methods
const toggleCart = () => {
  showCartDropdown.value = !showCartDropdown.value;
};
const router = useRouter();
const goToCart = () => {
  router.push("/cart");
};

const checkout = async () => {
  const result = await cartStore.checkout();
  if (result.success) {
    showCartDropdown.value = false;
    // You can add a toast notification here
    alert(result.message);
  } else {
    alert(`Checkout failed: ${result.message}`);
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showCartDropdown.value = false;
  }
};

onMounted(async () => {
  // Load products if not already loaded

  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
