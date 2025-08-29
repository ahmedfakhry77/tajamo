<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block hover:opacity-80 transition-opacity">
          <h1 class="text-3xl font-heading font-bold text-scimaPrimary cursor-pointer">
            {{ $t('common.brand') }}
          </h1>
        </NuxtLink>
        <p class="text-secondary-600 mt-2">{{ $t('auth.welcome') }}</p>
      </div>
      
      <!-- Auth Content -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-secondary-100">
        <slot />
        <NuxtSnackbar />
      </div>
      
      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-secondary-500 text-sm">
          {{ $t('auth.footer.copyright') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Custom styles for auth layout */
</style>
