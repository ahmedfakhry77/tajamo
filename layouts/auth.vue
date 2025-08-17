<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-heading font-bold text-scimaPrimary">Tajamo</h1>
        <p class="text-secondary-600 mt-2">Welcome back</p>
      </div>
      
      <!-- Auth Content -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-secondary-100">
        <slot />
      </div>
      
      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-secondary-500 text-sm">
          © 2024 Tajamo. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Auth layout logic can be added here
</script>

<style scoped>
/* Custom styles for auth layout */
</style>
