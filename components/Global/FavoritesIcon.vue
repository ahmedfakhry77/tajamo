<template>
  <div class="relative">
    <button
      @click="showDropdown = !showDropdown"
      class="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
      aria-label="Favorites"
    >
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        :class="hasFavorites ? 'text-red-500' : 'text-gray-400'"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>

      <!-- Favorites Count Badge -->
      <span
        v-if="favoritesCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      >
        {{ favoritesCount > 99 ? "99+" : favoritesCount }}
      </span>
    </button>

    <!-- Favorites Dropdown -->
    <div
      v-if="showDropdown"
      @mouseover="showDropdown = true"
      @mouseleave="showDropdown = false"
      class="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      @click.stop
    >
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ $t("favorites.header.title") }}
        </h3>
      </div>

      <!-- Favorites Items -->
      <div v-if="favoritesStore.hasFavorites" class="max-h-64 overflow-y-auto">
        <div
          v-for="product in favorites.slice(0, 3)"
          :key="product.id"
          class="p-4 border-b border-gray-100 flex items-center gap-3"
        >
          <!-- Product Image -->
          <div
            class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0"
          >
            <img
              :src="product.gallery[0]"
              alt="Product Image"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>

          <!-- Product Info -->
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-medium text-gray-900 truncate">
              {{ product.name?.es || product.name?.en || "Product" }}
            </h4>
            <p class="text-sm text-gray-500">
              {{ product.category?.slug || "Category" }}
            </p>
            <p class="text-sm font-medium text-gray-900">
              {{ product.price?.after_discount || "0" }}
              {{ product.price?.currency.es || "" }}
            </p>
          </div>

          <!-- Remove Button -->
          <button
            @click="favoritesStore.removeFromFavorites(productId)"
            class="text-red-500 hover:text-red-700 transition-colors p-1"
            :title="$t('favorites.product.removeFromFavorites')"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Show More Link -->
        <div v-if="favoritesStore.favorites.length > 3" class="p-4 text-center">
          <p class="text-sm text-gray-500">
            {{ $t("common.view") }} {{ favoritesStore.favorites.length - 3 }}
            {{ $t("common.more") }}...
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
        <p class="text-gray-500">No favorites yet</p>
      </div>

      <!-- Footer -->
      <div
        v-if="favoritesStore.hasFavorites"
        class="p-4 border-t border-gray-200"
      >
        <NuxtLink
          to="/favorites"
          class="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {{ $t("common.view") }} {{ $t("navigation.wishlist") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useFavoritesStore } from "~/stores/module/favorites";

const favoritesStore = useFavoritesStore();
const showDropdown = ref(false);
const router = useRouter();

// Computed properties
const favoritesCount = computed(() => favoritesStore.favoritesCount);
const hasFavorites = computed(() => favoritesStore.hasFavorites);
const favorites = computed(() => favoritesStore.getFavoriteProducts);
const loadFavorites = async () => {
  await favoritesStore.loadFavorites();
}


loadFavorites()
// Methods
const toggleFavorites = () => {
  showDropdown.value = !showDropdown.value;
};
const goToFavorites = () => {
  router.push("/favorites");
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showDropdown.value = false;
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
