// Export all stores
export { useCategoriesStore } from './module/categories'
export { useProductsStore } from './module/products'
export { useBannersStore } from './module/banners'
export { useFavoritesStore } from './module/favorites'
export { useCartStore } from './module/cart'

// Initialize all stores
export const initializeAllStores = async () => {
  try {
    // Import stores directly (no dynamic imports)
    const { useProductsStore } = await import('./module/products')
    const { useCategoriesStore } = await import('./module/categories')
    const { useBannersStore } = await import('./module/banners')
    const { useFavoritesStore } = await import('./module/favorites')
    const { useCartStore } = await import('./module/cart')

    // Initialize store instances
    const productsStore = useProductsStore()
    const categoriesStore = useCategoriesStore()
    const bannersStore = useBannersStore()
    const favoritesStore = useFavoritesStore()
    const cartStore = useCartStore()

    // Load data in parallel
    await Promise.all([
      productsStore.loadProducts(),
      categoriesStore.loadCategories(),
      bannersStore.loadBanners(),
      favoritesStore.loadUserPreferences(),
      cartStore.loadUserPreferences()
    ])

    return {
      productsStore,
      categoriesStore,
      bannersStore,
      favoritesStore,
      cartStore
    }
  } catch (error) {
    console.error('Error initializing stores:', error)
    throw error
  }
}
