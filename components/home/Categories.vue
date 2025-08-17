<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t('home.categories.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t('home.categories.subtitle') }}
        </p>
      </div>

      <div v-if="categoriesStore.isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading categories...</p>
      </div>

      <div v-else-if="categoriesStore.hasError" class="text-center py-12">
        <p class="text-red-600">{{ categoriesStore.error }}</p>
        <button 
          @click="categoriesStore.loadCategories()"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Women's Fragrances -->
        <div class="text-center group bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-pink-100 hover:shadow-xl transition-all duration-300">
          <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg class="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('home.categories.womens.title') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('home.categories.womens.description') }}</p>
          <NuxtLink
            to="/shop?category=womens"
            class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            {{ $t('common.view') }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>

        <!-- Men's Fragrances -->
        <div class="text-center group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300">
          <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg class="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('home.categories.mens.title') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('home.categories.mens.description') }}</p>
          <NuxtLink
            to="/shop?category=mens"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {{ $t('common.view') }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>

        <!-- Unisex Fragrances -->
        <div class="text-center group bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300">
          <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('home.categories.unisex.title') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('home.categories.unisex.description') }}</p>
          <NuxtLink
            to="/shop?category=unisex"
            class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {{ $t('common.view') }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCategoriesStore } from '~/stores/module/categories'

const categoriesStore = useCategoriesStore()

onMounted(async () => {
  if (categoriesStore.categories.length === 0) {
    await categoriesStore.loadCategories()
  }
})
</script>

<style scoped>
.categories-swiper :deep(.swiper-button-next),
.categories-swiper :deep(.swiper-button-prev) {
  color: #065084;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.categories-swiper :deep(.swiper-button-next:hover),
.categories-swiper :deep(.swiper-button-prev:hover) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.categories-swiper :deep(.swiper-pagination-bullet) {
  background: #065084;
  opacity: 0.3;
}

.categories-swiper :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #065084;
  transform: scale(1.2);
}
</style>
