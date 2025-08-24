import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useShop() {
  const route = useRoute()
  const router = useRouter()

  // Reactive state
  const selectedCategory = ref(null)
  const sortBy = ref("name-asc")
  const searchQuery = ref("")
  const priceRange = ref({ min: null, max: null })
  const productsPerPage = ref(12)
  const currentPage = ref(1)
  const showMobileFilters = ref(false)
  const categories = ref([])
  const products = ref([])

  // Computed properties
  const hasActiveFilters = computed(() => {
    return (
      selectedCategory.value ||
      sortBy.value !== "name-asc" ||
      searchQuery.value.trim() ||
      priceRange.value.min ||
      priceRange.value.max
    )
  })

  const filteredProducts = computed(() => {
    // Ensure products.value is always an array
    if (!Array.isArray(products.value)) {
      return []
    }
    
    let filtered = [...products.value]

    // Filter by category
    if (selectedCategory.value) {
      filtered = filtered.filter(
        (product) => product?.category?.id === selectedCategory.value
      )
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      filtered = filtered.filter((product) => {
        if (!product) return false
        
        const name = (product.name?.es || product.name?.en || "").toLowerCase()
        const description = (product.description?.[0] || "").toLowerCase()
        const category = (product.category?.slug || "").toLowerCase()

        return (
          name.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        )
      })
    }

    // Filter by price range
    if (priceRange.value.min || priceRange.value.max) {
      filtered = filtered.filter((product) => {
        if (!product?.price?.after_discount) return false
        
        const price = parseFloat(
          product.price.after_discount.replace(/[^\d.]/g, "")
        )
        if (isNaN(price)) return false
        
        const min = priceRange.value.min || 0
        const max = priceRange.value.max || Infinity
        return price >= min && price <= max
      })
    }

    return filtered
  })

  const filteredAndSortedProducts = computed(() => {
    // Ensure filteredProducts.value is always an array
    if (!Array.isArray(filteredProducts.value)) {
      return []
    }
    
    const filtered = [...filteredProducts.value]

    switch (sortBy.value) {
      case "name-asc":
        return filtered.sort((a, b) => {
          if (!a || !b) return 0
          const nameA = (a.name?.es || a.name?.en || "").toLowerCase()
          const nameB = (b.name?.es || b.name?.en || "").toLowerCase()
          return nameA.localeCompare(nameB)
        })

      case "name-desc":
        return filtered.sort((a, b) => {
          if (!a || !b) return 0
          const nameA = (a.name?.es || a.name?.en || "").toLowerCase()
          const nameB = (b.name?.es || b.name?.en || "").toLowerCase()
          return nameB.localeCompare(nameA)
        })

      case "price-asc":
        return filtered.sort((a, b) => {
          if (!a?.price?.after_discount || !b?.price?.after_discount) return 0
          const priceA = parseFloat(
            a.price.after_discount.replace(/[^\d.]/g, "")
          )
          const priceB = parseFloat(
            b.price.after_discount.replace(/[^\d.]/g, "")
          )
          if (isNaN(priceA) || isNaN(priceB)) return 0
          return priceA - priceB
        })

      case "price-desc":
        return filtered.sort((a, b) => {
          if (!a?.price?.after_discount || !b?.price?.after_discount) return 0
          const priceA = parseFloat(
            a.price.after_discount.replace(/[^\d.]/g, "")
          )
          const priceB = parseFloat(
            b.price.after_discount.replace(/[^\d.]/g, "")
          )
          if (isNaN(priceA) || isNaN(priceB)) return 0
          return priceB - priceA
        })

      case "newest":
        return filtered.sort((a, b) => {
          if (!a?.id || !b?.id) return 0
          return b.id - a.id
        })

      case "oldest":
        return filtered.sort((a, b) => {
          if (!a?.id || !b?.id) return 0
          return a.id - b.id
        })

      default:
        return filtered
    }
  })

  const hasMoreProducts = computed(() => {
    return (
      filteredAndSortedProducts.value.length >
      productsPerPage.value * currentPage.value
    )
  })

  // Helper functions
  const getCategoryName = (category) => {
    return category.name?.es || category.name?.en || "Category"
  }

  const getCategoryNameById = (categoryId) => {
    const category = categories.value.find(cat => cat.id === categoryId)
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

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchQuery.value.trim()) count++
    if (selectedCategory.value) count++
    if (priceRange.value.min || priceRange.value.max) count++
    if (sortBy.value !== "name-asc") count++
    return count
  }

  // Methods
  const clearAllFilters = () => {
    selectedCategory.value = null
    sortBy.value = "name-asc"
    searchQuery.value = ""
    priceRange.value = { min: null, max: null }
    currentPage.value = 1
    updateURL()
  }

  const clearPriceRange = () => {
    priceRange.value = { min: null, max: null }
    updateURL()
  }

  const loadMoreProducts = () => {
    currentPage.value++
  }

  const updateURL = () => {
    const query = {}

    if (selectedCategory.value) query.category = selectedCategory.value
    if (sortBy.value !== "name-asc") query.sort = sortBy.value
    if (searchQuery.value.trim()) query.search = searchQuery.value.trim()
    if (priceRange.value.min) query.minPrice = priceRange.value.min
    if (priceRange.value.max) query.maxPrice = priceRange.value.max

    router.push({ query })
  }

  const loadFromURL = () => {
    const { category, sort, search, minPrice, maxPrice } = route.query

    if (category) selectedCategory.value = parseInt(category)
    if (sort) sortBy.value = sort
    if (search) searchQuery.value = search
    if (minPrice) priceRange.value.min = parseInt(minPrice)
    if (maxPrice) priceRange.value.max = parseInt(maxPrice)
  }

  // Watch for filter changes to update URL and reset pagination
  watch(
    [selectedCategory, sortBy, searchQuery, priceRange],
    () => {
      currentPage.value = 1
      updateURL()
    },
    { deep: true }
  )

  // Watch for route changes to load filters from URL
  watch(
    () => route.query,
    () => {
      loadFromURL()
    },
    { immediate: true }
  )

  return {
    // State
    selectedCategory,
    sortBy,
    searchQuery,
    priceRange,
    productsPerPage,
    currentPage,
    showMobileFilters,
    categories,
    products,
    
    // Computed
    hasActiveFilters,
    filteredProducts,
    filteredAndSortedProducts,
    hasMoreProducts,
    
    // Methods
    getCategoryName,
    getCategoryNameById,
    getSortLabel,
    formatPrice,
    getActiveFiltersCount,
    clearAllFilters,
    clearPriceRange,
    loadMoreProducts,
    updateURL,
    loadFromURL
  }
}
