<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <Breadcrumb
        :breadcrumbs="[{ name: $t('navigation.shop'), path: '/shop' }]"
      />

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t("shop.header.title") }}
        </h1>
        <p class="text-gray-600">
          {{ $t("shop.header.subtitle") }}
        </p>
      </div>

      <!-- Main Content -->
      <div v-if="!isLoading" class="flex flex-col lg:flex-row gap-8">
        <!-- Left Sidebar - Filters (Desktop Only) -->
        <div class="hidden lg:block lg:w-80">
          <div class="sticky top-8">
            <ShopFilters
              :categories="categories"
              v-model:selected-category="selectedCategory"
              v-model:price-range="priceRange"
              v-model:search-query="searchQuery"
              v-model:sort-by="sortBy"
              :has-active-filters="hasActiveFilters"
              @clear-all="clearAllFilters"
            />
          </div>
        </div>

        <!-- Right Side - Products -->
        <div class="flex-1">
          <!-- Mobile Filter Button and Search Bar -->
          <div class="lg:hidden mb-6">
            <div class="flex items-center gap-3 mb-4">
              <!-- Mobile Filter Button -->
              <button
                @click="showMobileFilters = true"
                class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  ></path>
                </svg>
                {{ $t("shop.mobile.filterButton") }}
                <span
                  v-if="hasActiveFilters"
                  class="ml-1 bg-white text-blue-600 text-xs px-2 py-1 rounded-full"
                >
                  {{ getActiveFiltersCount() }}
                </span>
              </button>

              <!-- Active Filters Summary (Mobile) -->
              <div v-if="hasActiveFilters" class="flex-1">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>{{ $t("shop.mobile.activeFilters") }}</span>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-if="searchQuery.trim()"
                      class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                    >
                      {{
                        $t("shop.filters.activeFilters.search", {
                          query: "",
                        }).split(":")[0]
                      }}
                    </span>
                    <span
                      v-if="selectedCategory"
                      class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                    >
                      {{ $t("shop.filters.category.title") }}
                    </span>
                    <span
                      v-if="priceRange.min || priceRange.max"
                      class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                    >
                      {{ $t("shop.filters.priceRange.title").split(" ")[1] }}
                    </span>
                    <span
                      v-if="sortBy !== 'name-asc'"
                      class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                    >
                      {{ $t("shop.filters.sortBy.title").split(" ")[1] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Search Bar -->
          <ShopSearch v-model="searchQuery" />

          <!-- Loadig State -->
          <div v-if="isLoading" class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            ></div>
            <p class="mt-2 text-gray-600">{{ $t("common.loading") }}</p>
          </div>

          <!-- Products Grid -->
          <div v-show="!isLoading">
            <!-- Results Count and Sort Options -->
            <div
              class="mb-6 flex flex-row sm:items-center sm:justify-between gap-4"
            >
              <p class="text-gray-600">
                {{
                  $t("shop.results.showing", {
                    count: filteredAndSortedProducts.length,
                    total: products.length,
                  })
                }}
              </p>

              <!-- Sort Options -->
              <ShopSort v-model="sortBy" />
            </div>

            <!-- No Results -->
            <div
              v-if="filteredAndSortedProducts.length === 0"
              class="text-center py-12"
            >
              <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 mb-2">
                {{ $t("shop.results.noResults.title") }}
              </h2>
              <p class="text-gray-600 mb-6">
                {{ $t("shop.results.noResults.subtitle") }}
              </p>
              <button
                @click="clearAllFilters"
                class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ $t("shop.results.noResults.clearFilters") }}
              </button>
            </div>

            <!-- Products Grid -->
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <ProductCard
                v-for="product in filteredAndSortedProducts"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Load More Button (if needed) -->
            <div v-if="hasMoreProducts" class="text-center mt-8">
              <button
                @click="loadMoreProducts"
                class="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                {{ $t("shop.loadMore") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filters Popup -->
    <MobileFilters
      v-if="!isLoading"
      v-model="showMobileFilters"
      :categories="categories"
      v-model:selected-category="selectedCategory"
      v-model:price-range="priceRange"
      v-model:search-query="searchQuery"
      v-model:sort-by="sortBy"
      :has-active-filters="hasActiveFilters"
      @clear-all="clearAllFilters"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useShop } from "~/composables/useShop";

// Set page title
useHead({
  title: "Shop - Tajamo",
});

// Import components
import ProductCard from "~/components/global/ProductCard.vue";
import Breadcrumb from "~/components/global/Breadcrumb.vue";
import ShopFilters from "~/components/shop/ShopFilters.vue";
import ShopSearch from "~/components/shop/ShopSearch.vue";
import ShopSort from "~/components/shop/ShopSort.vue";
import MobileFilters from "~/components/shop/MobileFilters.vue";
import { useMyFetch } from '~/composables/useMyFetch' 

// Use shop composable
const {
  selectedCategory,
  sortBy,
  searchQuery,
  priceRange,
  productsPerPage,
  currentPage,
  showMobileFilters,
  categories,
  products,
  hasActiveFilters,
  filteredProducts,
  filteredAndSortedProducts,
  hasMoreProducts,
  getCategoryName,
  getCategoryNameById,
  getSortLabel,
  formatPrice,
  getActiveFiltersCount,
  clearAllFilters,
  clearPriceRange,
  loadMoreProducts,
  updateURL,
  loadFromURL,
} = useShop();

// Loading state
const isLoading = ref(false);

// Fetch data
const fetchCategories = async () => {
  try {
    const { data } = await useMyFetch("/categories/get-parents");
    if (data.value) {
      categories.value = categories.value.concat(data.value?.data);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
const fetchChildCategories = async () => {
  try {
    const { data } = await useMyFetch("/categories/get-children");
    if (data.value) {
      categories.value = categories.value.concat(data.value?.data);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
const fetchProducts = async () => {
  try {
    const { data } = await useMyFetch("/products/list");
    if (data?.value) {
      products.value = data.value?.data;
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
  }
};

isLoading.value = true;

try {
  await Promise.all([
    fetchCategories(),
    fetchChildCategories(),
    fetchProducts(),
  ]);
} catch (error) {
  console.error(error);
} finally {
  isLoading.value = false;
}
</script>
