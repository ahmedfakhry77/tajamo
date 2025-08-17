import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    getCategoryById: (state) => (id) => {
      return state.categories.find(category => category.id === id)
    },
    
    getCategoryBySlug: (state) => (slug) => {
      return state.categories.find(category => category.slug === slug)
    },

    getActiveCategories: (state) => {
      return state.categories.filter(category => category.active !== false)
    },

    getCategoriesWithProducts: (state) => {
      // This would need to be connected with products store
      return state.categories
    },

    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async loadCategories() {
      this.loading = true
      try {
        this.categories = [
          {
            id: 1,
            slug: "womens-fragrances",
            name: {
              es: "Fragancias Femeninas",
              en: "Women's Fragrances"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 2,
            slug: "mens-fragrances",
            name: {
              es: "Fragancias Masculinas",
              en: "Men's Fragrances"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 3,
            slug: "unisex-scents",
            name: {
              es: "Fragancias Unisex",
              en: "Unisex Scents"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 4,
            slug: "oriental-fragrances",
            name: {
              es: "Fragancias Orientales",
              en: "Oriental Fragrances"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 5,
            slug: "floral-scents",
            name: {
              es: "Fragancias Florales",
              en: "Floral Scents"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 6,
            slug: "woody-fragrances",
            name: {
              es: "Fragancias Amaderadas",
              en: "Woody Fragrances"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 7,
            slug: "aquatic-fragrances",
            name: {
              es: "Fragancias Acuáticas",
              en: "Aquatic Fragrances"
            },
            description: [],
            image: null,
            active: true
          },
          {
            id: 8,
            slug: "gourmand-scents",
            name: {
              es: "Fragancias Gourmand",
              en: "Gourmand Scents"
            },
            description: [],
            image: null,
            active: true
          }
        ]
        
        this.error = null
      } catch (error) {
        this.error = error.message
        console.error('Failed to load categories:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      // Replace with actual API call
      await this.loadCategories()
    },

    async fetchCategoryById(id) {
      // Replace with actual API call
      return this.getCategoryById(id)
    },

    async fetchCategoryBySlug(slug) {
      // Replace with actual API call
      return this.getCategoryBySlug(slug)
    },

    clearError() {
      this.error = null
    },

    resetStore() {
      this.categories = []
      this.loading = false
      this.error = null
    }
  }
})
