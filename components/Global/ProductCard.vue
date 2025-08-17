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
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 016 0Z"
              />
            </svg>
          </span>

                     <!-- Favorite button -->
           <span
             @click="toggleFavorite"
             class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
             :class="{ 'text-red-500 bg-red-50': isFavorite }"
           >
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
              />
            </svg>
          </span>
        </div>

                   <!-- Bottom center add to cart button -->
           <div
             class="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-white h-10"
           >
             <button
               type="button"
               @click="addToCart"
               class="w-full flex items-center uppercase justify-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50"
             >
            <svg
              class="-ms-1 me-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
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
        class="text-lg font-semibold leading-tight text-gray-900 hover:underline cursor-pointer"
        >{{ productName }}</a
      >

      <div class="mt-4 flex items-center justify-between gap-1">
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-xl font-extrabold leading-tight text-gray-900">
              {{ price.after_discount }} {{ price.currency }}
            </span>
            <span v-if="price.has_discount" class="text-sm text-gray-500">
              -
            </span>
            <span
              v-if="price.has_discount"
              class="text-sm text-gray-500 line-through"
            >
              {{ price.original }} {{ price.currency }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Detail Dialog -->
    <teleport to="body">
      <div
        v-if="showProductDialog"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click="closeProductDialog"
      >
        <div
          class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
          @click.stop
        >
          <!-- Dialog Header -->
          <button
            @click="closeProductDialog"
            class="text-gray-400 hover:text-gray-600 transition-color absolute top-6 right-6"
          >
            <svg
              class="w-6 h-6"
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

          <!-- Dialog Content -->
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                <h2 class="text-2xl font-bold text-gray-900">
                  {{ productName }}
                </h2>
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
                      productDescription ||
                      "No description available for this product."
                    }}
                  </p>
                </div>

                                 <!-- Price and Stock -->
                 <div class="space-y-4">
                   <div class="flex items-center gap-4">
                     <span class="text-3xl font-bold text-gray-900">
                       {{ price.after_discount }} {{ price.currency }}
                     </span>
                     <span
                       v-if="price.has_discount"
                       class="text-xl text-gray-500 line-through"
                     >
                       {{ price.original }} {{ price.currency }}
                     </span>
                   </div>
                   
                   
                   
                   <!-- Category -->
                   <div class="space-y-3">
                     <h3 class="text-lg font-semibold text-gray-900">
                       Category
                     </h3>
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
                           :disabled="cartQuantity === 0"
                         >
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                           </svg>
                         </button>
                         <span class="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                           {{ cartQuantity }}
                         </span>
                         <button
                           @click="incrementQuantity"
                           class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                         >
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                           </svg>
                         </button>
                       </div>
                       
                       <!-- Add to Cart Button -->
                       <button
                         @click="addToCart"
                         class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                       >
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                         </svg>
                         {{ cartQuantity > 0 ? 'Update Cart' : 'Add to Cart' }}
                       </button>
                     </div>
                     
                     <!-- Favorite Button -->
                     <button
                       @click="toggleFavorite"
                       class="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium transition-colors"
                       :class="isFavorite ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white text-gray-700 hover:bg-gray-50'"
                     >
                       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" :class="isFavorite ? 'text-red-500' : 'text-gray-400'">
                         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                       </svg>
                       {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                     </button>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFavoritesStore } from '~/stores/module/favorites'
import { useCartStore } from '~/stores/module/cart'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && 
             typeof value.id === 'number' &&
             typeof value.name === 'object' &&
             typeof value.price === 'object' &&
             typeof value.category === 'object' &&
             typeof value.stock === 'number'
    }
  }
})

// Stores
const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

// Local state
const isHovered = ref(false)
const showProductDialog = ref(false)

// Computed properties
const productName = computed(() => {
  return props.product.name?.es || props.product.name?.en || 'Product Name'
})

const productDescription = computed(() => {
  return props.product.description?.[0] || 'No description available'
})

const mainImage = computed(() => {
  return props.product.thumbnail || '/images/placeholder.jpg'
})

const galleryImage = computed(() => {
  return props.product.gallery?.[0] || null
})

const additionalGalleryImages = computed(() => {
  return props.product.gallery?.slice(1) || []
})

const price = computed(() => props.product.price)
const category = computed(() => props.product.category)
const stock = computed(() => props.product.stock)

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.product.id)
})

const cartItem = computed(() => {
  return cartStore.getCartItem(props.product.id)
})

const cartQuantity = computed(() => {
  return cartItem.value?.quantity || 0
})

// Methods
const openProductDialog = () => {
  showProductDialog.value = true
  document.body.style.overflow = 'hidden'
}

const closeProductDialog = () => {
  showProductDialog.value = false
  document.body.style.overflow = 'auto'
}

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.product.id)
}

const addToCart = () => {
  cartStore.addToCart(props.product.id, 1)
}

const incrementQuantity = () => {
  cartStore.incrementQuantity(props.product.id)
}

const decrementQuantity = () => {
  cartStore.decrementQuantity(props.product.id)
}

// Close dialog when pressing Escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && showProductDialog.value) {
    closeProductDialog()
  }
}

// Add event listener for escape key
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  // Ensure body scroll is restored
  document.body.style.overflow = 'auto'
})
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
