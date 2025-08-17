<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t("home.featuredProducts.title") }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t("home.featuredProducts.subtitle") }}
        </p>
      </div>

      <div v-if="productsStore.isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">{{ $t("home.featuredProducts.loading") }}</p>
      </div>

      <div v-else-if="productsStore.hasError" class="text-center py-12">
        <p class="text-red-600">{{ productsStore.error }}</p>
        <button
          @click="productsStore.loadProducts()"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>

      <div v-else>
        <MazCarousel>
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </MazCarousel>
      </div>

      <div
        v-if="featuredProducts.length === 0 && !productsStore.isLoading"
        class="text-center py-12"
      >
        <p class="text-gray-600">{{ $t("home.featuredProducts.noProducts") }}</p>
      </div>

      <!-- View All Products Button -->
      <div v-if="featuredProducts.length > 0" class="text-center mt-8">
        <NuxtLink
          to="/shop"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ $t("home.featuredProducts.viewAll") }}
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useProductsStore } from "~/stores/module/products";

const productsStore = useProductsStore();

const featuredProducts = computed(() => {
  return productsStore.getFeaturedProducts;
});

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.loadProducts();
  }
});
</script>

<style scoped>
/* FeaturedProducts component specific styles */
</style>
