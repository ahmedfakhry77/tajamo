<template>
  <div class="relative ">
    <header class="bg-white shadow-sm border-b border-secondary-200 ">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                v-if="logo && logo !== '/images/hero.jpg'" 
                :src="logo" 
                alt="Logo" 
                class="w-16  rounded-lg object-cover"
              />
              <div v-else class="w-8 h-8 bg-scimaPrimary rounded-lg flex items-center justify-center">
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
            <div class="h-full">
              <!-- <CartIcon class="h-full" /> -->
            </div>
            
            <!-- Favorites Icon -->
            <!-- <FavoritesIcon v-if="token" /> -->

            <!-- User Menu -->
            <div class="relative hidden lg:block user-menu">
              <div v-if="token" class="flex items-center space-x-2">
                <button
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <img 
                    v-if="user?.picture?.sm" 
                    :src="user.picture.sm" 
                    :alt="user.name"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="hidden sm:block">{{ user?.name || 'Profile' }}</span>
                </button>
                
                <!-- User Dropdown -->
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  @click.stop
                >
                  <div class="py-2">
                    <!-- User Info Header -->
                    <div v-if="user" class="px-4 py-3 border-b border-gray-100">
                      <div class="flex items-center space-x-3">
                        <img 
                          v-if="user.picture?.sm" 
                          :src="user.picture.sm" 
                          :alt="user.name"
                          class="w-10 h-10 rounded-full object-cover"
                        />
                        <div class="ml-3">
                          <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                          <p class="text-xs text-gray-500" :title="user.email">
                            {{ user.email && user.email.length > 20 ? user.email.substring(0, 16) + '...' : user.email }}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <NuxtLink
                      to="/profile"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      @click="showUserMenu = false"
                    >
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>Profile</span>
                      </div>
                    </NuxtLink>
                    <NuxtLink
                      to="/address"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      @click="showUserMenu = false"
                    >
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Address</span>
                      </div>
                    </NuxtLink>
                    <div class="border-t border-gray-100 my-1"></div>
                    <button
                      @click="logout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-else class="flex items-center space-x-4">
                <NuxtLink
                  to="/login"
                  class="text-gray-700 hover:text-blue-600 transition-colors font-medium border border-gray-200 px-4 py-2 rounded-lg"
                >
                  {{ $t('navigation.login') }}
                </NuxtLink>
                
              </div>
            </div>
            
            <!-- Mobile Menu Button -->
            <div class="lg:hidden">
              <button @click="isMobileDrawerOpen = !isMobileDrawerOpen" class="text-gray-700 hover:text-blue-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
     <ClientOnly>
    <MazDrawer 
      variant="left" 
     class=" dark:bg-white"
      v-model="isMobileDrawerOpen"
      size="280px"
      :hide-close-button="false"
      @close="handleDrawerClose"
    >
      <template #title>
        <div class="flex items-center space-x-2">
          <img 
            v-if="logo && logo !== '/images/hero.jpg'" 
            :src="logo" 
            alt="Logo" 
            class="w-8 h-8 rounded-lg object-cover"
          />
          <div v-else class="w-8 h-8 bg-scimaPrimary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">T</span>
          </div>
          <h2 class="text-xl font-heading font-bold text-scimaPrimary">
            {{ $t('common.brand') }}
          </h2>
        </div>
      </template>
      
      <template #default="{ close }">
        <div class="p-4 space-y-6">
          <!-- Navigation Links -->
          <nav class="space-y-2">
            <NuxtLink
              to="/"
              class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>{{ $t('navigation.home') }}</span>
            </NuxtLink>
            
            <NuxtLink
              to="/about"
              class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ $t('navigation.about') }}</span>
            </NuxtLink>
            
            <NuxtLink
              to="/shop"
              class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>{{ $t('navigation.shop') }}</span>
            </NuxtLink>
            
            <NuxtLink
              to="/contact"
              class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>{{ $t('navigation.contact') }}</span>
            </NuxtLink>
          </nav>
          
          <!-- Divider -->
          <div class="border-t border-gray-200"></div>
          
          <!-- User Menu Section -->
          <div class="space-y-2">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3">
              Account
            </h3>
            
            <div v-if="token" class="space-y-2">
              <!-- User Info Header -->
              <div v-if="user" class="px-3 py-3 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                  <img 
                    v-if="user.picture?.sm" 
                    :src="user.picture.sm" 
                    :alt="user.name"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-xs text-gray-500" :title="user.email">
                      {{ user.email && user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email }}
                    </p>
                  </div>
                </div>
              </div>
              
              <NuxtLink
                to="/profile"
                class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
              </NuxtLink>
              
              <NuxtLink
                to="/address"
                class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Address</span>
              </NuxtLink>
              
              <button
                @click="handleLogout(close)"
                class="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50 w-full text-left"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Logout</span>
              </button>
            </div>
            
            <div v-else class="space-y-3">
              <NuxtLink
                to="/login"
                class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                <span>{{ $t('navigation.login') }}</span>
              </NuxtLink>
              
              <NuxtLink
                to="/register"
                class="block bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                @click="close"
              >
                {{ $t('navigation.register') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </MazDrawer>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import FavoritesIcon from '~/components/Global/FavoritesIcon.vue'
import CartIcon from '~/components/Global/CartIcon.vue'

// Props
const props = defineProps({
  logo: {
    type: String,
    default: null
  },
  user: {
    type: Object,
    default: null
  }
})

const token = useCookie('token')
const isMobileDrawerOpen = ref(false)
const showUserMenu = ref(false)

const handleDrawerClose = () => {
  isMobileDrawerOpen.value = false
}

const handleLogout = (close) => {
  // Clear the token
  token.value = null
  // Close the drawer
  close()
  // Redirect to home page
  navigateTo('/')
}

const logout = () => {
  // Clear the token
  token.value = null
  // Close the user menu
  showUserMenu.value = false
  // Redirect to home page
  navigateTo('/')
}

// Close mobile drawer when route changes
// watch(() => useRoute().path, () => {
//   isMobileDrawerOpen.value = false
// })

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      showUserMenu.value = false
    }
  })
})
</script>

<style scoped>
/* Header component specific styles */
</style>
