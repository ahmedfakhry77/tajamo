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
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Sidebar - Filters (Desktop Only) -->
        <div class="hidden lg:block lg:w-80">
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8"
          >
            <h2 class="text-lg font-semibold text-gray-900 mb-6">
              {{ $t("shop.filters.title") }}
            </h2>

            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.category.title") }}
              </h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    :value="null"
                    v-model="selectedCategory"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    $t("shop.filters.category.allCategories")
                  }}</span>
                </label>
                <label
                  v-for="category in categories"
                  :key="category.id"
                  class="flex items-center"
                >
                  <input
                    type="radio"
                    :value="category.id"
                    v-model="selectedCategory"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    getCategoryName(category)
                  }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.priceRange.title") }}
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="priceRange.min"
                    type="number"
                    :placeholder="$t('shop.filters.priceRange.min')"
                    class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span class="text-gray-500">-</span>
                  <input
                    v-model.number="priceRange.max"
                    type="number"
                    :placeholder="$t('shop.filters.priceRange.max')"
                    class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div class="text-xs text-gray-500">
                  {{
                    $t("shop.filters.priceRange.currentRange", {
                      min: formatPrice(priceRange.min || 0),
                      max: formatPrice(priceRange.max || "∞"),
                    })
                  }}
                </div>
              </div>
            </div>

          

            <!-- Active Filters Summary -->
            <div v-if="hasActiveFilters" class="pt-4 border-t border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.activeFilters.title") }}
              </h3>
              <div class="space-y-2">
                <div
                  v-if="searchQuery.trim()"
                  class="flex items-center justify-between text-sm bg-green-50 text-green-800 px-2 py-1 rounded"
                >
                  <span>{{
                    $t("shop.filters.activeFilters.search", {
                      query: searchQuery,
                    })
                  }}</span>
                  <button
                    @click="searchQuery = ''"
                    class="text-green-600 hover:text-green-800"
                  >
                    <svg
                      class="w-3 h-3"
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
                <div
                  v-if="selectedCategory"
                  class="flex items-center justify-between text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded"
                >
                  <span>{{ getCategoryNameById(selectedCategory) }}</span>
                  <button
                    @click="selectedCategory = null"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      class="w-3 h-3"
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
                <div
                  v-if="priceRange.min || priceRange.max"
                  class="flex items-center justify-between text-sm bg-purple-50 text-purple-800 px-2 py-1 rounded"
                >
                  <span>{{
                    $t("shop.filters.activeFilters.price", {
                      min: formatPrice(priceRange.min || 0),
                      max: formatPrice(priceRange.max || "∞"),
                    })
                  }}</span>
                  <button
                    @click="clearPriceRange"
                    class="text-purple-600 hover:text-purple-800"
                  >
                    <svg
                      class="w-3 h-3"
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
                <div
                  v-if="sortBy !== 'name-asc'"
                  class="flex items-center justify-between text-sm bg-gray-50 text-gray-800 px-2 py-1 rounded"
                >
                  <span>{{ getSortLabel(sortBy) }}</span>
                  <button
                    @click="sortBy = 'name-asc'"
                    class="text-gray-600 hover:text-gray-800"
                  >
                    <svg
                      class="w-3 h-3"
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
              </div>

              <button
                @click="clearAllFilters"
                class="w-full mt-3 px-3 py-2 text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 hover:border-red-300 rounded transition-colors"
              >
                {{ $t("shop.filters.activeFilters.clearAll") }}
              </button>
            </div>
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

          <div
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("shop.search.title")
              }}</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('shop.search.placeholder')"
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="productsStore.isLoading" class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            ></div>
            <p class="mt-2 text-gray-600">{{ $t("common.loading") }}</p>
          </div>

          <!-- Error State -->
          <div v-else-if="productsStore.hasError" class="text-center py-12">
            <p class="text-red-600">{{ productsStore.error }}</p>
            <button
              @click="productsStore.loadProducts()"
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {{ $t("common.retry") }}
            </button>
          </div>

          <!-- Products Grid -->
          <div v-show="!productsStore.isLoading && !productsStore.hasError">
            <!-- Results Count and Sort Options -->
            <div class="mb-6 flex flex-row sm:items-center sm:justify-between gap-4">
              <p class="text-gray-600">
                {{
                  $t("shop.results.showing", {
                    count: filteredAndSortedProducts.length,
                    total: productsStore.products.length,
                  })
                }}
              </p>
              
              <!-- Sort Options as Tags -->
              <div class="  items-center gap-3 hidden md:flex">
                <span class="text-sm font-medium text-gray-700">{{ $t("shop.filters.sortBy.title") }}:</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in sortOptions"
                    :key="option.value"
                    @click="sortBy = option.value"
                    class="px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm"
                    :class="
                      sortBy === option.value
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    "
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
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
    <div
      v-if="showMobileFilters"
      class="fixed inset-0 z-50 lg:hidden"
      @click="showMobileFilters = false"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Popup Content -->
      <div
        class="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
        @click.stop
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div
            class="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <h2 class="text-lg font-semibold text-gray-900">
              {{ $t("shop.filters.title") }}
            </h2>
            <button
              @click="showMobileFilters = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg
                class="w-6 h-6"
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

          <!-- Filters Content -->
          <div class="flex-1 overflow-y-auto p-4">
            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.category.title") }}
              </h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    :value="null"
                    v-model="selectedCategory"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    $t("shop.filters.category.allCategories")
                  }}</span>
                </label>
                <label
                  v-for="category in categories"
                  :key="category.id"
                  class="flex items-center"
                >
                  <input
                    type="radio"
                    :value="category.id"
                    v-model="selectedCategory"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    getCategoryName(category)
                  }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.priceRange.title") }}
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="priceRange.min"
                    type="number"
                    :placeholder="$t('shop.filters.priceRange.min')"
                    class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span class="text-gray-500">-</span>
                  <input
                    v-model.number="priceRange.max"
                    type="number"
                    :placeholder="$t('shop.filters.priceRange.max')"
                    class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div class="text-xs text-gray-500">
                  {{
                    $t("shop.filters.priceRange.currentRange", {
                      min: formatPrice(priceRange.min || 0),
                      max: formatPrice(priceRange.max || "∞"),
                    })
                  }}
                </div>
              </div>
            </div>

            <!-- Sort Options -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.sortBy.title") }}
              </h3>
              <div class="flex flex-col gap-2">
                <label
                  v-for="option in sortOptions"
                  :key="option.value"
                  class="px-3 py-2 border rounded-lg cursor-pointer text-sm transition"
                  :class="
                    sortBy === option.value
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  "
                >
                  <input
                    type="radio"
                    v-model="sortBy"
                    :value="option.value"
                    class="hidden"
                  />
                  {{ option.label }}
                </label>
              </div>
            </div>

            <!-- Active Filters Summary -->
            <div v-if="hasActiveFilters" class="pt-4 border-t border-gray-200">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ $t("shop.filters.activeFilters.title") }}
              </h3>
              <div class="space-y-2">
                <div
                  v-if="searchQuery.trim()"
                  class="flex items-center justify-between text-sm bg-green-50 text-green-800 px-2 py-1 rounded"
                >
                  <span>{{
                    $t("shop.filters.activeFilters.search", {
                      query: searchQuery,
                    })
                  }}</span>
                  <button
                    @click="searchQuery = ''"
                    class="text-green-600 hover:text-green-800"
                  >
                    <svg
                      class="w-3 h-3"
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
                <div
                  v-if="selectedCategory"
                  class="flex items-center justify-between text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded"
                >
                  <span>{{ getCategoryNameById(selectedCategory) }}</span>
                  <button
                    @click="selectedCategory = null"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      class="w-3 h-3"
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
                <div
                  v-if="priceRange.min || priceRange.max"
                  class="flex items-center justify-between text-sm bg-purple-50 text-purple-800 px-2 py-1 rounded"
                >
                  <span>{{
                    $t("shop.filters.activeFilters.price", {
                      min: formatPrice(priceRange.min || 0),
                      max: formatPrice(priceRange.max || "∞"),
                    })
                  }}</span>
                  <button
                    @click="clearPriceRange"
                    class="text-purple-600 hover:text-purple-800"
                  >
                    <svg
                      class="w-3 h-3"
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
                <div
                  v-if="sortBy !== 'name-asc'"
                  class="flex items-center justify-between text-sm bg-gray-50 text-gray-800 px-2 py-1 rounded"
                >
                  <span>{{ getSortLabel(sortBy) }}</span>
                  <button
                    @click="sortBy = 'name-asc'"
                    class="text-gray-600 hover:text-gray-800"
                  >
                    <svg
                      class="w-3 h-3"
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
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="p-4 border-t border-gray-200 space-y-3">
            <button
              @click="clearAllFilters"
              class="w-full px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 hover:border-red-300 rounded transition-colors"
            >
              {{ $t("shop.filters.activeFilters.clearAll") }}
            </button>
            <button
              @click="showMobileFilters = false"
              class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {{ $t("shop.mobile.applyFilters") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useProductsStore } from "~/stores/module/products";
import { useCategoriesStore } from "~/stores/module/categories";
import ProductCard from "~/components/Global/ProductCard.vue";
import Breadcrumb from "~/components/Global/Breadcrumb.vue";

// Set page title
useHead({
  title: "Shop - Tajamo",
});

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const route = useRoute();
const router = useRouter();

// Reactive state
const selectedCategory = ref(null);
const sortBy = ref("name-asc");
const searchQuery = ref("");
const priceRange = ref({ min: null, max: null });
const productsPerPage = ref(12);
const currentPage = ref(1);
const showMobileFilters = ref(false);

// Computed properties
const categories = computed(() => categoriesStore.categories);

const hasActiveFilters = computed(() => {
  return (
    selectedCategory.value ||
    sortBy.value !== "name-asc" ||
    searchQuery.value.trim() ||
    priceRange.value.min ||
    priceRange.value.max
  );
});
const sortOptions = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];
const filteredProducts = computed(() => {
  let products = productsStore.products;

  // Filter by category
  if (selectedCategory.value) {
    products = products.filter(
      (product) => product.category.id === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    products = products.filter((product) => {
      const name = (product.name?.es || product.name?.en || "").toLowerCase();
      const description = (product.description?.[0] || "").toLowerCase();
      const category = (product.category?.slug || "").toLowerCase();

      return (
        name.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });
  }

  // Filter by price range
  if (priceRange.value.min || priceRange.value.max) {
    products = products.filter((product) => {
      const price = parseFloat(
        product.price.after_discount.replace(/[^\d.]/g, "")
      );
      const min = priceRange.value.min || 0;
      const max = priceRange.value.max || Infinity;
      return price >= min && price <= max;
    });
  }

  return products;
});

const filteredAndSortedProducts = computed(() => {
  const products = [...filteredProducts.value];

  switch (sortBy.value) {
    case "name-asc":
      return products.sort((a, b) => {
        const nameA = (a.name?.es || a.name?.en || "").toLowerCase();
        const nameB = (b.name?.es || b.name?.en || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });

    case "name-desc":
      return products.sort((a, b) => {
        const nameA = (a.name?.es || a.name?.en || "").toLowerCase();
        const nameB = (b.name?.es || b.name?.en || "").toLowerCase();
        return nameB.localeCompare(nameA);
      });

    case "price-asc":
      return products.sort((a, b) => {
        const priceA = parseFloat(
          a.price.after_discount.replace(/[^\d.]/g, "")
        );
        const priceB = parseFloat(
          b.price.after_discount.replace(/[^\d.]/g, "")
        );
        return priceA - priceB;
      });

    case "price-desc":
      return products.sort((a, b) => {
        const priceA = parseFloat(
          a.price.after_discount.replace(/[^\d.]/g, "")
        );
        const priceB = parseFloat(
          b.price.after_discount.replace(/[^\d.]/g, "")
        );
        return priceB - priceA;
      });

    case "newest":
      return products.sort((a, b) => b.id - a.id);

    case "oldest":
      return products.sort((a, b) => a.id - b.id);

    default:
      return products;
  }
});

const hasMoreProducts = computed(() => {
  return (
    filteredAndSortedProducts.value.length >
    productsPerPage.value * currentPage.value
  );
});

// Helper functions
const getCategoryName = (category) => {
  return category.name?.es || category.name?.en || "Category";
};

const getCategoryNameById = (categoryId) => {
  const category = categoriesStore.getCategoryById(categoryId);
  return category ? getCategoryName(category) : "Category";
};

const getSortLabel = (sortValue) => {
  const labels = {
    "name-asc": "Name: A to Z",
    "name-desc": "Name: Z to A",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    newest: "Newest First",
    oldest: "Oldest First",
  };
  return labels[sortValue] || "Sort by";
};

const formatPrice = (price) => {
  if (price === "∞") return "∞";
  if (typeof price === "number") {
    return `$${(price / 1000).toFixed(2)}`;
  }
  return "$0.00";
};

const getActiveFiltersCount = () => {
  let count = 0;
  if (searchQuery.value.trim()) count++;
  if (selectedCategory.value) count++;
  if (priceRange.value.min || priceRange.value.max) count++;
  if (sortBy.value !== "name-asc") count++;
  return count;
};

// Methods
const clearAllFilters = () => {
  selectedCategory.value = null;
  sortBy.value = "name-asc";
  searchQuery.value = "";
  priceRange.value = { min: null, max: null };
  currentPage.value = 1;
  updateURL();
};

const clearPriceRange = () => {
  priceRange.value = { min: null, max: null };
  updateURL();
};

const loadMoreProducts = () => {
  currentPage.value++;
};

const updateURL = () => {
  const query = {};

  if (selectedCategory.value) query.category = selectedCategory.value;
  if (sortBy.value !== "name-asc") query.sort = sortBy.value;
  if (searchQuery.value.trim()) query.search = searchQuery.value.trim();
  if (priceRange.value.min) query.minPrice = priceRange.value.min;
  if (priceRange.value.max) query.maxPrice = priceRange.value.max;

  router.push({ query });
};

const loadFromURL = () => {
  const { category, sort, search, minPrice, maxPrice } = route.query;

  if (category) selectedCategory.value = parseInt(category);
  if (sort) sortBy.value = sort;
  if (search) searchQuery.value = search;
  if (minPrice) priceRange.value.min = parseInt(minPrice);
  if (maxPrice) priceRange.value.max = parseInt(maxPrice);
};

// Watch for filter changes to update URL and reset pagination
watch(
  [selectedCategory, sortBy, searchQuery, priceRange],
  () => {
    currentPage.value = 1;
    updateURL();
  },
  { deep: true }
);

// Watch for route changes to load filters from URL
watch(
  () => route.query,
  () => {
    loadFromURL();
  },
  { immediate: true }
);

onMounted(async () => {
  // Load products if not already loaded
  if (productsStore.products.length === 0) {
    await productsStore.loadProducts();
  }

  // Load categories if not already loaded
  if (categoriesStore.categories.length === 0) {
    await categoriesStore.loadCategories();
  }

  // Load filters from URL
  loadFromURL();
});
</script>
