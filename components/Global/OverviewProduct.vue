<template>
  <!-- Product Detail Dialog -->
  <MazDialog v-model="showDialog" :title="productName" :height="'auto'">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[700px]">
      <!-- Product Images -->
      <div class="space-y-4">
        <swiper
          :slides-per-view="1"
          :space-between="20"
          :navigation="true"
          :pagination="true"
          :modules="[Navigation, Pagination]"
          class="product-images-swiper"
        >
          <swiper-slide>
            <div class="aspect-square rounded-lg overflow-hidden">
              <img
                :src="mainImage"
                :alt="productName"
                class="w-full h-full object-cover"
              />
            </div>
          </swiper-slide>

          <swiper-slide v-if="galleryImage">
            <div class="aspect-square rounded-lg overflow-hidden">
              <img
                :src="galleryImage"
                :alt="productName"
                class="w-full h-full object-cover"
              />
            </div>
          </swiper-slide>

          <!-- Add more gallery images if available -->
          <swiper-slide
            v-for="(image, index) in additionalGalleryImages"
            :key="index"
          >
            <div class="aspect-square rounded-lg overflow-hidden">
              <img
                :src="image"
                :alt="`${productName} - Image ${index + 3}`"
                class="w-full h-full object-cover"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Product Details -->
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <span
            v-if="price.has_discount"
            class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ price.discount_percentage }}% OFF
          </span>
          <span
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              stock > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            {{ stock > 0 ? `${stock} in Stock` : "Out of Stock" }}
          </span>
        </div>

        <!-- Description -->
        <div class="space-y-3">
          <p class="text-gray-600 leading-relaxed">
            {{
              productDescription || "No description available for this product."
            }}
          </p>
        </div>

        <!-- Price and Stock -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="text-3xl font-bold text-gray-900">
              {{ price.after_discount }} {{ price.currency.es }}
            </span>
            <span
              v-if="price.has_discount"
              class="text-xl text-gray-500 line-through"
            >
              {{ price.original }} {{ price.currency.es }}
            </span>
          </div>

          <!-- Category -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900">Category</h3>
            <span
              class="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {{ category.slug }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <!-- Add to Cart Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <!-- Quantity Controls -->
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button
                @click="decrementQuantity"
                class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                :disabled="
                  isInCart ? cartQuantity === 0 : selectedQuantity === 1
                "
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

              <!-- Quantity Display/Input -->
              <div
                v-if="isInCart"
                class="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center"
              >
                {{ hasQuantityChanged ? selectedQuantity : cartQuantity }}
              </div>
              <input
                v-else
                v-model="selectedQuantity"
                @input="handleQuantityChange"
                type="number"
                min="1"
                :max="stock"
                class="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center border-none focus:outline-none focus:ring-0"
              />

              <button
                @click="incrementQuantity"
                class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                :disabled="isInCart ? false : selectedQuantity >= stock"
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

            <!-- Add to Cart Button -->
            <button
              @click="addToCart"
              class="flex-1 bg-scimaGold text-white px-6 py-3 rounded-lg font-medium hover:bg-scimaGoldHover transition-colors flex items-center justify-center gap-2"
              :class="{
                'opacity-50 cursor-not-allowed':
                  isInCart && !hasQuantityChanged,
              }"
              :disabled="isInCart && !hasQuantityChanged"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                ></path>
              </svg>
              {{
                isInCart
                  ? hasQuantityChanged
                    ? "Update Cart"
                    : "No Changes"
                  : "Add to Cart"
              }}
            </button>
          </div>

          <!-- Favorite Button -->
          <button
            v-if="token"
            @click="toggleFavorite"
            class="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium transition-colors"
            :class="
              isFavorite
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            "
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
          </button>
        </div>
      </div>
    </div>
  </MazDialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useFavoritesStore } from "~/stores/module/favorites";
import { useCartStore } from "~/stores/module/cart";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import MazDialog from "maz-ui/components/MazDialog";

// @ts-ignore - useSnackbar is provided by nuxt-snackbar module
const snackbar = useSnackbar();

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Stores
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const token = useCookie("token");

// Local state
const selectedQuantity = ref(1);
const originalQuantity = ref(1);
const hasQuantityChanged = ref(false);

// Computed properties
const productName = computed(() => {
  return props.product.name?.es || props.product.name?.en || "Product Name";
});

const productDescription = computed(() => {
  return props.product.description?.[0] || "No description available";
});

const mainImage = computed(() => {
  return props.product.thumbnail || "/images/placeholder.jpg";
});

const galleryImage = computed(() => {
  return props.product.gallery?.[0] || null;
});

const additionalGalleryImages = computed(() => {
  return props.product.gallery?.slice(1) || [];
});

const price = computed(() => props.product.price);
const category = computed(() => props.product.category);
const stock = computed(() => props.product.stock);

const isFavorite = computed(() => {
  return favoritesStore.getFavoriteProducts.some(
    (product) => product.id === props.product.id
  );
});

const cartItem = computed(() => {
  return cartStore.getCartItem(props.product.id);
});

const cartQuantity = computed(() => {
  return cartItem.value?.quantity || 0;
});

const isInCart = computed(() => {
  return cartItem.value !== undefined;
});

const showDialog = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) {
      // Reset to original quantity when closing modal without updating
      resetToOriginalQuantity();
    }
    emit("update:modelValue", value);
  },
});

// Methods
const toggleFavorite = () => {
  favoritesStore
    .toggleFavorite(props.product)
    .then(() => {
      snackbar.add({
        type: "success",
        text: "Producto agregado a favoritos",
      });
    })
    .catch(() => {
      snackbar.add({
        type: "error",
        text: "Error al agregar producto a favoritos",
      });
    });
};

const addToCart = () => {
  if (isInCart.value) {
    // If already in cart, update quantity and sync to server
    cartStore.updateProductQuantity(props.product.id, selectedQuantity.value);
    snackbar.add({
      type: "success",
      text: "Carrito actualizado",
    });
    // Update original quantity to current value
    originalQuantity.value = selectedQuantity.value;
    hasQuantityChanged.value = false;
  } else {
    // If not in cart, add with selected quantity
    cartStore.addToCart([
      { ...props.product, quantity: selectedQuantity.value },
    ]);
    snackbar.add({
      type: "success",
      text: "Producto agregado al carrito",
    });
    // Update original quantity to current value
    originalQuantity.value = selectedQuantity.value;
    hasQuantityChanged.value = false;
  }
};

const incrementQuantity = () => {
  if (isInCart.value) {
    // Only update local quantity, don't sync to server yet
    selectedQuantity.value = Math.min(selectedQuantity.value + 1, stock.value);
    hasQuantityChanged.value = true;
  } else {
    selectedQuantity.value = Math.min(selectedQuantity.value + 1, stock.value);
  }
};

const decrementQuantity = () => {
  if (isInCart.value) {
    // Only update local quantity, don't sync to server yet
    selectedQuantity.value = Math.max(selectedQuantity.value - 1, 1);
    hasQuantityChanged.value = true;
  } else {
    selectedQuantity.value = Math.max(selectedQuantity.value - 1, 1);
  }
};

const handleQuantityChange = (event) => {
  const value = parseInt(event.target.value);
  if (!isNaN(value) && value >= 1 && value <= stock.value) {
    selectedQuantity.value = value;
    if (isInCart.value) {
      hasQuantityChanged.value = true;
    }
  }
};

const resetToOriginalQuantity = () => {
  selectedQuantity.value = originalQuantity.value;
  hasQuantityChanged.value = false;
};

// Watch for cart changes to reset selected quantity when product is removed
watch(cartItem, (newItem) => {
  if (!newItem && selectedQuantity.value !== 1) {
    selectedQuantity.value = 1;
    originalQuantity.value = 1;
    hasQuantityChanged.value = false;
  } else if (newItem) {
    // Update original quantity when cart item changes
    originalQuantity.value = newItem.quantity;
    selectedQuantity.value = newItem.quantity;
    hasQuantityChanged.value = false;
  }
});

// Watch for dialog opening to initialize quantities
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      if (isInCart.value) {
        originalQuantity.value = cartQuantity.value;
        selectedQuantity.value = cartQuantity.value;
      } else {
        originalQuantity.value = 1;
        selectedQuantity.value = 1;
      }
      hasQuantityChanged.value = false;
    }
  }
);
</script>

<style scoped>
/* Product images swiper styling */
.product-images-swiper {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.product-images-swiper .swiper-button-next),
:deep(.product-images-swiper .swiper-button-prev) {
  color: #065084;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

:deep(.product-images-swiper .swiper-button-next:hover),
:deep(.product-images-swiper .swiper-button-prev:hover) {
  transform: scale(1.1);
}

:deep(.product-images-swiper .swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
  width: 8px;
  height: 8px;
}

:deep(.product-images-swiper .swiper-pagination-bullet-active) {
  opacity: 1;
  background: #065084;
  transform: scale(1.2);
}

:deep(.product-images-swiper .swiper-slide) {
  transition: all 0.3s ease;
}

:deep(.product-images-swiper .swiper-slide img) {
  transition: transform 0.3s ease;
}

:deep(.product-images-swiper .swiper-slide:hover img) {
  transform: scale(1.05);
}
</style>
