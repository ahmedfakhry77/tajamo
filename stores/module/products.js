import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    featuredProducts: [],
    loading: false,
    error: null
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    
    getProductsByCategory: (state) => (categoryId) => {
      return state.products.filter(product => product.category.id === categoryId)
    },
    
    getFeaturedProducts: (state) => {
      return state.featuredProducts.length > 0 ? state.featuredProducts : state.products.slice(0, 5)
    },

    getProductsBySlug: (state) => (slug) => {
      return state.products.filter(product => product.slug.includes(slug))
    },

    getProductsInStock: (state) => {
      return state.products.filter(product => product.stock > 0)
    },

    getDiscountedProducts: (state) => {
      return state.products.filter(product => product.price.has_discount)
    },

    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async loadProducts() {
      this.loading = true
      try {
        // For now, using mock data - replace with actual API call
        this.products = [
          {
            id: 1,
            slug: "bharara-enchanted",
            name: {
              es: "Bharara Enchanted",
              en: "Bharara Enchanted"
            },
            description: ["A luxurious blend of rose and jasmine with oriental notes"],
            stock: 29,
            price: {
              original: "1,199.000",
              has_discount: true,
              after_discount: "1,019.000",
              discount_percentage: 15,
              currency: "ج.م"
            },
            category: {
              id: 1,
              slug: "oriental-fragrances"
            },
            thumbnail: "/images/Bharara-Echanted.webp",
            gallery: ["/images/Game-Of-Spades-Emeral.webp"]
          },
          {
            id: 2,
            slug: "game-of-spades-emerald",
            name: {
              es: "Game of Spades Emerald",
              en: "Game of Spades Emerald"
            },
            description: ["Fresh aquatic fragrance with green tea and citrus"],
            stock: 29,
            price: {
              original: "1,499.000",
              has_discount: true,
              after_discount: "1,199.000",
              discount_percentage: 20,
              currency: "ج.م"
            },
            category: {
              id: 2,
              slug: "aquatic-fragrances"
            },
            thumbnail: "/images/Game-Of-Spades-Emeral.webp",
            gallery: ["/images/Game-Of-Spades-Opal.webp"]
          },
          {
            id: 3,
            slug: "game-of-spades-opal",
            name: {
              es: "Game of Spades Opal",
              en: "Game of Spades Opal"
            },
            description: ["Elegant white floral with vanilla and musk"],
            stock: 29,
            price: {
              original: "1,399.000",
              has_discount: true,
              after_discount: "1,259.000",
              discount_percentage: 10,
              currency: "ج.م"
            },
            category: {
              id: 3,
              slug: "floral-fragrances"
            },
            thumbnail: "/images/Game-Of-Spades-Opal.webp",
            gallery: ["/images/Lattafa-Art-Of-Universe.webp"]
          },
          {
            id: 4,
            slug: "lattafa-art-of-universe",
            name: {
              es: "Lattafa Art of Universe",
              en: "Lattafa Art of Universe"
            },
            description: ["Mystical blend of oud, amber and exotic spices"],
            stock: 29,
            price: {
              original: "999.000",
              has_discount: true,
              after_discount: "749.000",
              discount_percentage: 25,
              currency: "ج.م"
            },
            category: {
              id: 4,
              slug: "oud-fragrances"
            },
            thumbnail: "/images/Lattafa-Art-Of-Universe.webp",
            gallery: ["/images/Mast-Perfume-Gorgeus.webp"]
          },
          {
            id: 5,
            slug: "mast-perfume-gorgeous",
            name: {
              es: "Mast Perfume Gorgeous",
              en: "Mast Perfume Gorgeous"
            },
            description: ["Sophisticated woody oriental with patchouli"],
            stock: 29,
            price: {
              original: "1,099.000",
              has_discount: true,
              after_discount: "901.000",
              discount_percentage: 25,
              currency: "ج.م"
            },
            category: {
              id: 5,
              slug: "woody-fragrances"
            },
            thumbnail: "/images/Mast-Perfume-Gorgeus.webp",
            gallery: ["/images/Bharara-Echanted.webp"]
          }
        ]
        
        // Set featured products (first 5 for now)
        this.featuredProducts = this.products.slice(0, 5)
        this.error = null
      } catch (error) {
        this.error = error.message
        console.error('Failed to load products:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProducts() {
      // Replace with actual API call
      await this.loadProducts()
    },

    async fetchProductById(id) {
      // Replace with actual API call
      return this.getProductById(id)
    },

    async searchProducts(query) {
      // Replace with actual API call
      return this.products.filter(product => 
        product.name.es.toLowerCase().includes(query.toLowerCase()) ||
        product.name.en.toLowerCase().includes(query.toLowerCase()) ||
        product.slug.toLowerCase().includes(query.toLowerCase())
      )
    },

    clearError() {
      this.error = null
    },

    resetStore() {
      this.products = []
      this.featuredProducts = []
      this.loading = false
      this.error = null
    }
  }
})
