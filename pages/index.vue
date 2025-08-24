<template>
  <div>
    <!-- Hero Section -->
    <div class="loading-container" v-if="pending">
      <div class="loading-content">
        <div class="loading-text">
          <span>Loading...</span>
        </div>
      </div>
    </div>
    <template v-else>
      <HomeHero />

      <!-- Featured Categories -->
      <HomeCategories :categories="homeData?.categories" />
      <!-- Banners -->
      <HomeBanners :banners="homeData?.banners" />
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Featured Products -->
        <HomeFeaturedProducts :products="homeData?.products" />
      </div>

      <!-- Quiero Aesoria -->
      <HomeQuieroAesoria />
      <!-- Why Choose Us -->
      <HomeWhyChooseUs />
    </template>
  </div>
</template>

<script setup>
useHead({
  title: "Inicio",
  meta: [
    {
      name: "description",
      content:
        "Perfumes de lujo en España: compra fragancias únicas y exclusivas online con envío rápido.",
    },
  ],
});
const {
  data: homeData,
  pending,
  error,
} = await useMyFetch("/general/home-page");
</script>

<style scoped>
/* Home page specific styles */
</style>
