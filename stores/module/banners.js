import { defineStore } from 'pinia'

export const useBannersStore = defineStore('banners', {
  state: () => ({
    banners: [],
    loading: false,
    error: null
  }),

  getters: {
    getBannerById: (state) => (id) => {
      return state.banners.find(banner => banner.id === id)
    },
    
    getBannerBySlug: (state) => (slug) => {
      return state.banners.find(banner => banner.slug === slug)
    },

    getActiveBanners: (state) => {
      return state.banners.filter(banner => banner.active !== false)
    },

    getBannersByPosition: (state) => (position) => {
      return state.banners.filter(banner => banner.position === position)
    },

    getBannersByType: (state) => (type) => {
      return state.banners.filter(banner => banner.type === type)
    },

    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async loadBanners() {
      this.loading = true
      try {
        this.banners = [
          {
            id: 1,
            slug: "luxury-fragrances",
            name: {
              ar: "عطور فاخرة",
              en: "Luxury Fragrances"
            },
            url: "http://www.negron.es/non-quia-dolor-nobis-et",
            image: "/images/baner-1.jpg",
            active: true,
            position: "hero",
            type: "collection"
          },
          {
            id: 2,
            slug: "premium-perfumes",
            name: {
              ar: "عطور مميزة",
              en: "Premium Perfumes"
            },
            url: "http://www.negron.es/non-quia-dolor-nobis-et",
            image: "/images/baner-2.jpg",
            active: true,
            position: "hero",
            type: "collection"
          },
          {
            id: 3,
            slug: "signature-scents",
            name: {
              ar: "روائح مميزة",
              en: "Signature Scents"
            },
            url: "http://www.negron.es/non-quia-dolor-nobis-et",
            image: "/images/baner-3.jpg",
            active: true,
            position: "hero",
            type: "collection"
          },
          {
            id: 4,
            slug: "artisan-collection",
            name: {
              ar: "مجموعة الحرفيين",
              en: "Artisan Collection"
            },
            url: "http://www.negron.es/non-quia-dolor-nobis-et",
            image: "/images/baner-4.jpg",
            active: true,
            position: "hero",
            type: "collection"
          }
        ]
        
        this.error = null
      } catch (error) {
        this.error = error.message
        console.error('Failed to load banners:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchBanners() {
      // Replace with actual API call
      await this.loadBanners()
    },

    async fetchBannerById(id) {
      // Replace with actual API call
      return this.getBannerById(id)
    },

    async fetchBannerBySlug(slug) {
      // Replace with actual API call
      return this.getBannerBySlug(slug)
    },

    async fetchActiveBanners() {
      // Replace with actual API call
      await this.loadBanners()
      return this.getActiveBanners
    },

    clearError() {
      this.error = null
    },

    resetStore() {
      this.banners = []
      this.loading = false
      this.error = null
    }
  }
})
