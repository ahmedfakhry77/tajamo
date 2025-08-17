<template>
  <div>
    <!-- Hero Section -->

    <HomeHero />

    <!-- Featured Categories -->
    <HomeCategories />
    <!-- Banners -->
    <HomeBanners />
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Featured Products -->
      <HomeFeaturedProducts />
    </div>

   
    <!-- Quiero Aesoria -->
    <HomeQuieroAesoria />
     <!-- Why Choose Us -->
     <HomeWhyChooseUs />
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
</script>

<style scoped>
/* Home page specific styles */
</style>
