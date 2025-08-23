<template>
  <section class="relative  text-white py-20 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      <h1 class="text-5xl md:text-6xl font-heading font-bold mb-6">
        {{ $t("home.hero.title") }}
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
        {{ $t("home.hero.subtitle") }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          @click="goToCollection"
          class="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
        >
          {{ $t("home.hero.exploreCollection") }}
        </button>
      </div>
    </div>
     <div class="absolute bottom-0 right-0 w-full h-full opacity-80 z-0 bg-black"></div>
    <!-- Girl with Hair and Perfume SVG - Bottom Right -->
    <div class="absolute bottom-0 right-0 w-full h-full opacity-60 z-0">
     <NuxtImg class="w-full h-full object-cover" src="/images/hero.jpg" alt="Girl with Hair and Perfume" />
    </div>
  </section>
</template>

<script setup>
const router = useRouter();

const goToCollection = () => {
  router.push("/shop");
};
</script>

<style scoped>
/* Hero component specific styles */
</style>
