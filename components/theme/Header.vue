<template>
  <div class="relative">
    <header class="bg-white shadow-sm border-b border-secondary-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div class="w-8 h-8 bg-scimaPrimary rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">T</span>
              </div>
              <h1 class="text-2xl font-heading font-bold text-scimaPrimary">
                {{ $t('common.brand') }}
              </h1>
            </NuxtLink>
          </div>
          
          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {{ $t('navigation.home') }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {{ $t('navigation.about') }}
            </NuxtLink>
            <NuxtLink
              to="/shop"
              class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {{ $t('navigation.shop') }}
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {{ $t('navigation.contact') }}
            </NuxtLink>
          </nav>

          <!-- Right Side - Cart, Favorites, User -->
          <div class="flex items-center space-x-4">
            <!-- Cart Icon -->
            <CartIcon />
            
            <!-- Favorites Icon -->
            <FavoritesIcon />

            <!-- User Menu -->
            <div class="relative">
              <div v-if="token" class="flex items-center space-x-2">
                <button
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="hidden sm:block">{{ $t('navigation.profile') }}</span>
                </button>
                
                <!-- User Dropdown -->
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  @click.stop
                >
                  <div class="py-2">
                    <NuxtLink
                      to="/profile"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      @click="showUserMenu = false"
                    >
                      {{ $t('navigation.profile') }}
                    </NuxtLink>
                    <button
                      @click="logout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {{ $t('navigation.logout') }}
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-else class="flex items-center space-x-4">
                <NuxtLink
                  to="/login"
                  class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {{ $t('navigation.login') }}
                </NuxtLink>
                <NuxtLink
                  to="/register"
                  class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {{ $t('navigation.register') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div
          v-if="showMobileMenu"
          class="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
        >
          <div class="px-4 py-6 space-y-4">
            <NuxtLink
              to="/"
              class="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.home') }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.about') }}
            </NuxtLink>
            <NuxtLink
              to="/shop"
              class="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.shop') }}
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.contact') }}
            </NuxtLink>
            
            <!-- Mobile User Menu -->
            <div class="pt-4 border-t border-gray-200">
              <div v-if="token" class="space-y-2">
                <NuxtLink
                  to="/profile"
                  class="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                  @click="showMobileMenu = false"
                >
                  {{ $t('navigation.profile') }}
                </NuxtLink>
                <button
                  @click="logout"
                  class="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                >
                  {{ $t('navigation.logout') }}
                </button>
              </div>
              
              <div v-else class="space-y-2">
                <NuxtLink
                  to="/login"
                  class="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                  @click="showMobileMenu = false"
                >
                  {{ $t('navigation.login') }}
                </NuxtLink>
                <NuxtLink
                  to="/register"
                  class="block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                  @click="showMobileMenu = false"
                >
                  {{ $t('navigation.register') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import FavoritesIcon from '~/components/Global/FavoritesIcon.vue'
import CartIcon from '~/components/Global/CartIcon.vue'
const token = useCookie('token')
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
/* Header component specific styles */
</style>
