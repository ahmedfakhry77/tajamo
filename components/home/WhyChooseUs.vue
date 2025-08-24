<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-heading font-bold text-secondary-800 text-center mb-12">
        {{ $t('home.whyChooseUs.title') }}
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl text-scimaPrimary">🌿</span>
          </div>
          <h3 class="text-xl font-heading font-semibold text-secondary-800 mb-2">{{ $t('home.whyChooseUs.naturalIngredients.title') }}</h3>
          <p class="text-secondary-600">{{ $t('home.whyChooseUs.naturalIngredients.description') }}</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl text-success-600">🚚</span>
          </div>
          <h3 class="text-xl font-heading font-semibold text-secondary-800 mb-2">{{ $t('home.whyChooseUs.freeShipping.title') }}</h3>
          <p class="text-secondary-600">{{ $t('home.whyChooseUs.freeShipping.description') }}</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl text-accent-600">💎</span>
          </div>
          <h3 class="text-xl font-heading font-semibold text-secondary-800 mb-2">{{ $t('home.whyChooseUs.luxuryQuality.title') }}</h3>
          <p class="text-secondary-600">{{ $t('home.whyChooseUs.luxuryQuality.description') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// WhyChooseUs component logic
</script>

<style scoped>
/* WhyChooseUs component specific styles */
</style>
