<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t("home.categories.title") }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t("home.categories.subtitle") }}
        </p>
      </div>


      <div  class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Women's Fragrances -->
        <NuxtLink :to="`/shop?category=${categories[0].slug}`" class="block">
          <div
            class="text-center group relative overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 h-80 cursor-pointer"
          >
            <div class="absolute inset-0">
              <img
                :src="categories[0].image"
                alt="Women's Fragrances"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              ></div>
            </div>
            <div
              class="relative z-10 flex flex-col justify-end h-full p-8 text-white"
            >
              <h3 class="text-xl font-semibold mb-2 text-center">
                {{ categories[0].name.es }}
              </h3>
              <p class="text-gray-200 mb-4 text-center">
                {{ categories[0].description?.es || '---' }}
              </p>
            </div>
          </div>
        </NuxtLink> 

        <!-- Men's Fragrances -->
        <NuxtLink :to="`/shop?category=${categories[1].slug}`" class="block">
          <div
            class="text-center group relative overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 h-80 cursor-pointer"
          >
            <div class="absolute inset-0">
              <img
                :src="categories[1].image"
                alt="Men's Fragrances"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              ></div>
            </div>
            <div
              class="relative z-10 flex flex-col justify-end h-full p-8 text-white"
            >
              <h3 class="text-xl font-semibold mb-2 text-center">
                {{ categories[1].name.es }}
              </h3>
              <p class="text-gray-200 mb-4 text-center">
                {{ categories[1].description?.es || '---' }}
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Unisex Fragrances -->
        <NuxtLink :to="`/shop?category=${categories[2].slug}`" class="block">
          <div
            class="text-center group relative overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 h-80 cursor-pointer"
          >
            <div class="absolute inset-0">
              <img
                :src="categories[2].image"
                alt="Unisex Fragrances"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              ></div>
            </div>
            <div
              class="relative z-10 flex flex-col justify-end h-full p-8 text-white"
            >
              <h3 class="text-xl font-semibold mb-2 text-center">
                  {{ categories[2].name.es }}
              </h3>
              <p class="text-gray-200 mb-4 text-center">
                {{ categories[2].description?.es || '---' }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.categories-swiper :deep(.swiper-button-next),
.categories-swiper :deep(.swiper-button-prev) {
  color: #065084;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.categories-swiper :deep(.swiper-button-next:hover),
.categories-swiper :deep(.swiper-button-prev:hover) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.categories-swiper :deep(.swiper-pagination-bullet) {
  background: #065084;
  opacity: 0.3;
}

.categories-swiper :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #065084;
  transform: scale(1.2);
}
</style>
