import { defineStore } from 'pinia'

export const useAddressesStore = defineStore('addresses', {
  state: () => ({
    addresses: [],
    loading: false,
    error: null
  }),

  getters: {
    // Get all addresses
    getAllAddresses: (state) => state.addresses,
    
    // Get default address
    getDefaultAddress: (state) => state.addresses.find(addr => addr.default) || null,
    
    // Get address by ID
    getAddressById: (state) => (id) => state.addresses.find(addr => addr.id === id),
    
    // Check if loading
    isLoading: (state) => state.loading,
    
    // Check if there's an error
    hasError: (state) => state.error !== null,
    
    // Get error message
    getError: (state) => state.error
  },

  actions: {
    // Set loading state
    setLoading(loading) {
      this.loading = loading
    },

    // Set error
    setError(error) {
      this.error = error
    },

    // Clear error
    clearError() {
      this.error = null
    },

    // Load all addresses
    async loadAddresses() {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call
        // const { data } = await useMyFetch('/addresses')
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockData = [
          {
            id: 1,
            name: 'Home',
            governorate: 'Cairo',
            city: 'Maadi',
            address: '123 Street 9, Maadi, Cairo',
            postal_code: '11431',
            phone: '+20 123 456 7890',
            default: true
          },
          {
            id: 2,
            name: 'Office',
            governorate: 'Giza',
            city: 'Dokki',
            address: '456 Tahrir Street, Dokki, Giza',
            postal_code: '12511',
            phone: '+20 123 456 7891',
            default: false
          }
        ]
        
        this.addresses = mockData
        return mockData
      } catch (error) {
        console.error('Failed to load addresses:', error)
        this.setError('Failed to load addresses. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Add new address
    async addAddress(addressData) {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call
        // const { data } = await useMyFetch('/addresses', { method: 'POST', body: addressData })
        
        // Mock success
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create new address with unique ID
        const newAddress = {
          id: Date.now(),
          ...addressData
        }
        
        // If this is set as default, unset others
        if (newAddress.default) {
          this.addresses.forEach(addr => addr.default = false)
        }
        
        // Add to state
        this.addresses.push(newAddress)
        
        return newAddress
      } catch (error) {
        console.error('Failed to add address:', error)
        this.setError('Failed to add address. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Update existing address
    async updateAddress(id, addressData) {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call
        // const { data } = await useMyFetch(`/addresses/${id}`, { method: 'PUT', body: addressData })
        
        // Mock success
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Find address index
        const index = this.addresses.findIndex(addr => addr.id === id)
        if (index === -1) {
          throw new Error('Address not found')
        }
        
        // If this is set as default, unset others
        if (addressData.default) {
          this.addresses.forEach(addr => addr.default = false)
        }
        
        // Update address
        this.addresses[index] = { ...this.addresses[index], ...addressData }
        
        return this.addresses[index]
      } catch (error) {
        console.error('Failed to update address:', error)
        this.setError('Failed to update address. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Delete address
    async deleteAddress(id) {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call
        // await useMyFetch(`/addresses/${id}`, { method: 'DELETE' })
        
        // Mock success
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Remove from state
        this.addresses = this.addresses.filter(addr => addr.id !== id)
        
        return true
      } catch (error) {
        console.error('Failed to delete address:', error)
        this.setError('Failed to delete address. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Set default address
    async setDefaultAddress(id) {
      try {
        // Update all addresses to set the specified one as default
        this.addresses.forEach(addr => {
          addr.default = addr.id === id
        })
        
        // TODO: Update on server if needed
        // await useMyFetch(`/addresses/${id}/default`, { method: 'PATCH' })
        
        return true
      } catch (error) {
        console.error('Failed to set default address:', error)
        this.setError('Failed to set default address. Please try again.')
        throw error
      }
    },

    // Clear all addresses (useful for logout)
    clearAddresses() {
      this.addresses = []
      this.error = null
    }
  }
})
