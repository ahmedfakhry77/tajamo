<template>
  <section class="relative text-white py-28 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      <h2 class="text-4xl md:text-5xl font-heading font-bold mb-6">
        {{ $t('home.quieroAesoria.title') }}
      </h2>
      <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
        {{ $t('home.quieroAesoria.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
      
        <button class="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            {{ $t('home.quieroAesoria.contactButton') }}
        </button>
      </div>
    </div>
    
    <!-- Background Image Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
    
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <NuxtImg 
        class="w-full h-full object-cover" 
        :src="backgroundImage" 
        :alt="$t('home.quieroAesoria.title')"
        loading="lazy"
      />
    </div>
    
    <!-- Decorative Elements -->
    <div class="absolute top-10 left-10 w-20 h-20 opacity-20">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#D4AF37" stroke-width="2" fill="none"/>
        <path d="M30 50L45 65L70 35" stroke="#D4AF37" stroke-width="3" fill="none"/>
      </svg>
    </div>
    
    <div class="absolute bottom-10 right-10 w-16 h-16 opacity-20">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 20C50 20 60 30 70 40C80 50 80 60 70 70C60 80 50 80 50 80C50 80 40 80 30 70C20 60 20 50 30 40C40 30 50 20 50 20Z" fill="#D4AF37"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
// QuieroAesoria component logic
// This component follows the same pattern as Hero with:
// - Background image support
// - Translation support via $t()
// - Responsive design
// - Decorative SVG elements

import { computed } from 'vue';

// Background image with fallback
const backgroundImage = computed(() => {
  // You can replace this with your actual image path
  return '/images/IWantAdvice.jpg' || '/images/hero.jpg';
});
</script>

<style scoped>
/* QuieroAesoria component specific styles */
</style>