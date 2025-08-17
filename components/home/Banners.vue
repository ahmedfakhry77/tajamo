<template>
  <section class="relative">
    <div v-if="bannersStore.isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">{{ $t("home.banners.loading") }}</p>
    </div>

    <div v-else-if="bannersStore.hasError" class="text-center py-12">
      <p class="text-red-600">{{ bannersStore.error }}</p>
      <button 
        @click="bannersStore.loadBanners()"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ $t("home.banners.retry") }}
      </button>
    </div>

    <div v-else-if="activeBanners.length > 0" class="relative">
      <swiper
        :slides-per-view="1"
        :effect="'fade'"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :loop="true"
        :navigation="true"
        :pagination="true"
        :modules="[Autoplay, Navigation, Pagination]"
        class="banner-swiper"
      >
        <swiper-slide v-for="banner in activeBanners" :key="banner.id">
          <div class="relative">
            <NuxtImg
              :src="banner.image"
              :alt="getBannerTitle(banner)"
              class="w-full h-[500px] object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center text-white max-w-4xl mx-auto px-4">
                <h2 class="text-4xl md:text-6xl font-bold mb-4">
                  {{ getBannerTitle(banner) }}
                </h2>
                <p class="text-xl md:text-2xl mb-8 opacity-90">
                  {{ getBannerSubtitle(banner) }}
                </p>
                <NuxtLink
                  :to="banner.url"
                  class="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  {{ $t('home.banners.shopNow') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600">{{ $t("home.banners.noBanners") }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBannersStore } from '~/stores/module/banners'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const bannersStore = useBannersStore()

const activeBanners = computed(() => {
  return bannersStore.getActiveBanners
})

// Helper functions
const getBannerTitle = (banner) => {
  return banner.name?.en || banner.name?.ar || 'Banner Title'
}

const getBannerSubtitle = (banner) => {
  // You can customize this based on banner type or add subtitle field to banner data
  return 'Discover our exclusive collection'
}

onMounted(async () => {
  if (bannersStore.banners.length === 0) {
    await bannersStore.loadBanners()
  }
})
</script>

<style scoped>
.banner-swiper :deep(.swiper-button-next),
.banner-swiper :deep(.swiper-button-prev) {
  color: white;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.banner-swiper :deep(.swiper-button-next:hover),
.banner-swiper :deep(.swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.banner-swiper :deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
}

.banner-swiper :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: white;
  transform: scale(1.2);
}
</style>
