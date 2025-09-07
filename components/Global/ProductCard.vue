<template>
  <div
    class="rounded-sm border border-gray-200 bg-white p-4 shadow-sm min-w-[280px]"
  >
    <div
      class="h-[300px] w-full relative group"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Main Image -->
      <img
        class="mx-auto h-full w-full object-cover rounded-lg transition-all duration-500 ease-in-out"
        :src="mainImage"
        :alt="productName"
        :class="{ 'scale-95': isHovered }"
      />

      <!-- Gallery Image on Hover (if available) -->
      <img
        v-if="galleryImage"
        class="absolute inset-0 mx-auto h-full w-full object-cover rounded-lg transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        :src="galleryImage"
        :alt="productName"
        :class="{ 'scale-100': isHovered }"
      />

      <!-- Hover overlay with action buttons -->
      <div
        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-sm h-[300px]"
      >
        <!-- Right side vertical icons -->
        <div
          class="absolute right-3 top-3 transform flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <!-- Quick view button -->
          <span
            @click.prevent="openProductDialog"
            class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            <IconsEye />
          </span>

          <!-- Favorite button -->
          <span
            @click="toggleFavorite"
            v-if="token"
            class="w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
            :class="[
              isFavorite ? 'text-white bg-red-500' : 'text-gray-600 bg-white',
            ]"
          >
            <IconsHart />
          </span>

          <!-- Cart quantity indicator (if product is in cart) -->
          <div
            v-if="isInCart"
            class="w-10 h-10 rounded-full shadow-lg bg-blue-500 text-white flex items-center justify-center text-sm font-medium"
          >
            {{ cartQuantity }}
          </div>
        </div>

        <!-- Bottom center quantity selector and add to cart button -->
        <div
          class="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-white"
        >
          <!-- Add to Cart Button -->
          <button
            type="button"
            @click="addToCart"
            class="w-full flex items-center uppercase justify-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50"
          >
            <IconsCart />
            {{ "Add to cart" }}
          </button>
        </div>
      </div>
    </div>

    <div class="pt-6">
      <div class="mb-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span
            v-if="price.has_discount"
            class="rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
          >
            {{ price.discount_percentage }}% off
          </span>
          <span
            :class="[
              'rounded px-2.5 py-0.5 text-xs font-medium',
              stock > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            {{ stock > 0 ? "In Stock" : "Out of Stock" }}
          </span>
        </div>
      </div>

      <a
        href="#"
        class="text-lg font-semibold leading-tight text-gray-900 hover:underline cursor-pointer capitalize"
        >{{ productName }}</a
      >

      <div class="mt-4 flex items-center justify-between gap-1">
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-xl font-extrabold leading-tight text-gray-900">
              {{ price.after_discount }} {{ price.currency.es }}
            </span>
            <span v-if="price.has_discount" class="text-sm text-gray-500">
              -
            </span>
            <span
              v-if="price.has_discount"
              class="text-sm text-gray-500 line-through"
            >
              {{ price.original }} {{ price.currency.es }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Overview Dialog -->
    <OverviewProduct v-model="showProductDialog" :product="product" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useFavoritesStore } from "~/stores/module/favorites";
import { useCartStore } from "~/stores/module/cart";
import OverviewProduct from "~/components/global/OverviewProduct.vue";

const snackbar = useSnackbar();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const token = useCookie("token");

const isHovered = ref(false);
const showProductDialog = ref(false);

const productName = computed(() => {
  return props.product.name?.es || props.product.name?.en || "Product Name";
});

const mainImage = computed(() => {
  return props.product.thumbnail || "/images/placeholder.jpg";
});

const galleryImage = computed(() => {
  return props.product.gallery?.[0] || null;
});

const price = computed(() => props.product.price);
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

// Methods
const openProductDialog = () => {
  showProductDialog.value = true;
};

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
  if (cartQuantity.value + 1 <= stock.value) {
    cartStore.addToCart([props.product]);
    snackbar.add({
      type: "success",
      text: "Producto agregado al carrito",
    });
  } else {
    snackbar.add({
      type: "error",
      text: "No se puede agregar más de " + stock.value + " productos",
    });
  }
};
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
