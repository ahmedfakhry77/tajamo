import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
    loading: false,
    error: null
  }),

  getters: {
    isFavorite: (state) => (productId) => {
      return state.favorites.includes(productId)
    },
    
    favoritesCount: (state) => {
      return state.favorites.length
    },

    getFavoriteProducts: (state) => {
      // This would need to be connected with products store
      return state.favorites
    },

    hasFavorites: (state) => {
      return state.favorites.length > 0
    },
    getProductName: (state) => (productId) => {
      return state.favorites.find(product => product.id === productId)?.name
    },
    getProductCategory: (state) => (productId) => {
      return state.favorites.find(product => product.id === productId)?.category
    },
    getProductPrice: (state) => (productId) => {
      return state.favorites.find(product => product.id === productId)?.price
    },
    getProductCurrency: (state) => (productId) => {
      return state.favorites.find(product => product.id === productId)?.currency
    },

    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    toggleFavorite(productId) {
      const index = this.favorites.indexOf(productId)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(productId)
      }
      this.saveUserPreferences()
    },

    addToFavorites(productId) {
      if (!this.favorites.includes(productId)) {
        this.favorites.push(productId)
        this.saveUserPreferences()
      }
    },

    removeFromFavorites(productId) {
      const index = this.favorites.indexOf(productId)
      if (index > -1) {
        this.favorites.splice(index, 1)
        this.saveUserPreferences()
      }
    },

    clearFavorites() {
      this.favorites = []
      this.saveUserPreferences()
    },

    // User preferences persistence
    saveUserPreferences() {
      try {
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } catch (error) {
        console.error('Failed to save favorites:', error)
        this.error = 'Failed to save favorites'
      }
    },

    loadUserPreferences() {
      try {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
          this.favorites = JSON.parse(favorites)
        }
        this.error = null
      } catch (error) {
        console.error('Failed to load favorites:', error)
        this.error = 'Failed to load favorites'
      }
    },

    async syncFavorites() {
      // Replace with actual API call to sync with backend
      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        this.error = null
      } catch (error) {
        this.error = error.message
        console.error('Failed to sync favorites:', error)
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    resetStore() {
      this.favorites = []
      this.loading = false
      this.error = null
    }
  }
})
