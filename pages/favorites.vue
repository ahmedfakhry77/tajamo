<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <Breadcrumb :breadcrumbs="[{ name: $t('navigation.wishlist'), path: '/favorites' }]" />
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('favorites.header.title') }}</h1>
        <p class="text-gray-600">{{ $t('favorites.header.subtitle') }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="favoritesStore.isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">{{ $t('favorites.loading') }}</p>
      </div>

      <!-- Empty Favorites -->
      <div v-else-if="!favoritesStore.hasFavorites" class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('favorites.empty.title') }}</h2>
        <p class="text-gray-600 mb-6">{{ $t('favorites.empty.subtitle') }}</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
          </svg>
          {{ $t('favorites.empty.startShopping') }}
        </NuxtLink>
      </div>

      <!-- Favorites Grid -->
      <div v-else>
        <!-- Header Actions -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <span class="text-lg text-gray-600">
              {{ favoritesStore.favoritesCount }} {{ favoritesStore.favoritesCount === 1 ? 'item' : 'items' }}
            </span>
            <button
              @click="clearAllFavorites"
              class="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              {{ $t('favorites.actions.clearAll') }}
            </button>
          </div>
          
          <NuxtLink
            to="/"
            class="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {{ $t('favorites.actions.addMore') }}
          </NuxtLink>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="productId in favoritesStore.favorites"
            :key="productId"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <!-- Product Image -->
            <div class="aspect-square bg-gray-100 relative group">
              <img
                :src="getProductThumbnail(productId)"
                :alt="getProductName(productId)"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <!-- Quick Actions Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <!-- Add to Cart Button -->
                  <button
                    @click="addToCart(productId)"
                    class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                    :title="$t('favorites.product.addToCart')"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>
                  </button>
                  
                  <!-- Remove from Favorites Button -->
                  <button
                    @click="removeFromFavorites(productId)"
                    class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                    :title="$t('favorites.product.removeFromFavorites')"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                {{ getProductName(productId) }}
              </h3>
              
              <p class="text-sm text-gray-500 mb-3 line-clamp-2">
                {{ getProductDescription(productId) }}
              </p>

              <!-- Price and Stock -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-lg font-semibold text-gray-900">
                    {{ getProductPrice(productId) }}
                  </span>
                  <span class="text-sm text-gray-500">
                    {{ getProductCurrency(productId) }}
                  </span>
                </div>
                
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getProductStock(productId) > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ getProductStock(productId) > 0 ? $t('favorites.product.inStock') : $t('favorites.product.outOfStock') }}
                </span>
              </div>

              <!-- Category -->
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {{ getProductCategory(productId) }}
                </span>
                
                <!-- Add to Cart Button -->
                <button
                  @click="addToCart(productId)"
                  :disabled="getProductStock(productId) === 0"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {{ $t('favorites.product.addToCart') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div class="mt-8 text-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            {{ $t('favorites.actions.continueShopping') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFavoritesStore } from '~/stores/module/favorites'
import { useProductsStore } from '~/stores/module/products'
import { useCartStore } from '~/stores/module/cart'
import Breadcrumb from '~/components/Global/Breadcrumb.vue'
const { t } = useI18n()
// Set page title
useHead({
  title: t('favorites.title'),
});

const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

// Helper functions
const getProductName = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? (product.name?.es || product.name?.en || 'Product') : 'Product'
}

const getProductDescription = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? (product.description?.[0] || 'No description available') : 'No description available'
}

const getProductThumbnail = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? product.thumbnail || '/images/placeholder.jpg' : '/images/placeholder.jpg'
}

const getProductPrice = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? product.price?.after_discount || '0' : '0'
}

const getProductCurrency = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? product.price?.currency || '' : ''
}

const getProductStock = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? product.stock || 0 : 0
}

const getProductCategory = (productId) => {
  const product = productsStore.getProductById(productId)
  return product ? product.category?.slug || 'Category' : 'Category'
}

// Methods
const addToCart = (productId) => {
  cartStore.addToCart(productId, 1)
  // You can add a toast notification here
}

const removeFromFavorites = (productId) => {
  favoritesStore.removeFromFavorites(productId)
  // You can add a toast notification here
}

const clearAllFavorites = () => {
  if (confirm('Are you sure you want to clear all favorites?')) {
    favoritesStore.clearFavorites()
  }
}

onMounted(async () => {
  // Load products if not already loaded
  if (productsStore.products.length === 0) {
    await productsStore.loadProducts()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
