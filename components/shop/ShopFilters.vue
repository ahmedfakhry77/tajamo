<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
            :checked="selectedCategory === null"
            @change="$emit('update:selectedCategory', null)"
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
            :checked="selectedCategory === category.id"
            @change="$emit('update:selectedCategory', category.id)"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">{{
            category.name.es
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
            :value="priceRange.min"
            @input="$emit('update:priceRange', { ...priceRange, min: $event.target.value ? Number($event.target.value) : null })"
            type="number"
            :placeholder="$t('shop.filters.priceRange.min')"
            class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-gray-500">-</span>
          <input
            :value="priceRange.max"
            @input="$emit('update:priceRange', { ...priceRange, max: $event.target.value ? Number($event.target.value) : null })"
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
            @click="clearSearch"
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
            @click="clearCategory"
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
            @click="clearSort"
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
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory: {
    type: Number,
    default: null
  },
  priceRange: {
    type: Object,
    default: () => ({ min: null, max: null })
  },
  searchQuery: {
    type: String,
    default: ''
  },
  sortBy: {
    type: String,
    default: 'name-asc'
  },
  hasActiveFilters: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:selectedCategory',
  'update:priceRange',
  'update:searchQuery',
  'update:sortBy',
  'clearAll'
])

// Helper functions
const getCategoryNameById = (categoryId) => {
  const category = props.categories.find(cat => cat.id === categoryId)
  return category ? category.name.es : 'Category'
}

const getSortLabel = (sortValue) => {
  const labels = {
    "name-asc": "Name: A to Z",
    "name-desc": "Name: Z to A",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    newest: "Newest First",
    oldest: "Oldest First",
  }
  return labels[sortValue] || "Sort by"
}

const formatPrice = (price) => {
  if (price === "∞") return "∞"
  if (typeof price === "number") {
    return `$${(price / 1000).toFixed(2)}`
  }
  return "$0.00"
}

// Clear methods
const clearSearch = () => {
  emit('update:searchQuery', '')
}

const clearCategory = () => {
  emit('update:selectedCategory', null)
}

const clearPriceRange = () => {
  emit('update:priceRange', { min: null, max: null })
}

const clearSort = () => {
  emit('update:sortBy', 'name-asc')
}

const clearAllFilters = () => {
  emit('clearAll')
}
</script>
