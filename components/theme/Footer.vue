<template>
  <footer class="bg-white border-t border-secondary-200">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Description -->
        <div class="col-span-1 lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900">{{ $t('common.brand') }}</h3>
          </div>
          <p class="text-gray-600 mb-4 max-w-md">
            {{ $t('footer.companyDescription') }}
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

        <!-- Support -->
        <div class="col-span-1">
          <h4 class="text-sm font-semibold text-gray-900 mb-4">{{ $t('footer.support') }}</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('footer.helpCenter') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ $t('footer.documentation') }}
              </a>
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
          <div class="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              {{ $t('footer.privacy') }}
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              {{ $t('footer.terms') }}
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              {{ $t('footer.cookies') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t: $t } = useI18n()
const newsletterEmail = ref('')
const newsletterLoading = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const handleNewsletterSignup = async () => {
  if (!newsletterEmail.value) return
  
  newsletterLoading.value = true
  try {
    // Add your newsletter signup logic here
    console.log('Newsletter signup:', newsletterEmail.value)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    // Reset form after successful submission
    newsletterEmail.value = ''
    alert($t('footer.newsletter.success'))
  } catch (error) {
    console.error('Newsletter signup error:', error)
    alert($t('footer.newsletter.error'))
  } finally {
    newsletterLoading.value = false
  }
}
</script>

<style scoped>
/* Footer component specific styles */
</style>
