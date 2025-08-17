export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client side
  if (process.server) return

  try {
    // Import and initialize all stores
    const { initializeAllStores } = await import('~/stores')
    
    // Initialize all stores
    const stores = await initializeAllStores()
    
    // Make stores available globally if needed
    nuxtApp.provide('stores', stores)
    
    console.log('All stores initialized successfully')
  } catch (error) {
    console.error('Failed to initialize stores:', error)
  }
})
