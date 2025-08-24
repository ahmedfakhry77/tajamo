<template>
  <footer class="bg-white border-t border-secondary-200">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Description -->
        <div class="col-span-1 lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <img 
              v-if="logo && logo !== '/images/hero.jpg'" 
              :src="logo" 
              alt="Logo" 
              class="w-8 h-8 rounded-lg object-cover"
            />
            <div v-else class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900">{{ $t('common.brand') }}</h3>
          </div>
          <p class="text-gray-600 mb-4 max-w-md">
            {{ description }}
          </p>
        </div>

        <!-- Quick Links -->
        <div class="col-span-1">
          <h4 class="text-sm font-semibold text-gray-900 mb-4">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('navigation.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('navigation.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('navigation.shop') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('navigation.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        


       
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 pt-6 mt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 text-sm">
            © {{ new Date().getFullYear() }} {{ $t('common.brand') }}. {{ $t('footer.copyright') }}
          </p>
          
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t: $t } = useI18n()

// Props
const props = defineProps({
  logo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: 'Default company description'
  }
})

const newsletterEmail = ref('')
const newsletterLoading = ref(false)

const currentYear = computed(() => new Date().getFullYear())


</script>

<style scoped>
/* Footer component specific styles */
</style>
