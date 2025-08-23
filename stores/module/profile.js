import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {
      name: '',
      email: '',
      image: null
    },
    loading: false,
    error: null
  }),

  getters: {
    // Get profile data
    getProfile: (state) => state.profile,
    
    // Get profile name
    getName: (state) => state.profile.name,
    
    // Get profile email
    getEmail: (state) => state.profile.email,
    
    // Get profile image
    getImage: (state) => state.profile.image,
    
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

    // Load profile data
    async loadProfile() {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call
        // const { data } = await useMyFetch('/profile')
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          image: null
        }
        
        this.profile = mockData
        return mockData
      } catch (error) {
        console.error('Failed to load profile:', error)
        this.setError('Failed to load profile. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Update profile
    async updateProfile(profileData) {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call
        // const { data } = await useMyFetch('/profile', { method: 'PUT', body: profileData })
        
        // Mock success
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update profile in state
        this.profile = { ...this.profile, ...profileData }
        
        return this.profile
      } catch (error) {
        console.error('Failed to update profile:', error)
        this.setError('Failed to update profile. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Update profile image
    async updateProfileImage(imageFile) {
      this.setLoading(true)
      this.clearError()
      
      try {
        // TODO: Replace with actual API call for image upload
        // const formData = new FormData()
        // formData.append('image', imageFile)
        // const { data } = await useMyFetch('/profile/image', { method: 'POST', body: formData })
        
        // Mock success - convert file to data URL for preview
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
          reader.onload = (e) => {
            this.profile.image = e.target.result
            resolve(e.target.result)
          }
          reader.onerror = reject
          reader.readAsDataURL(imageFile)
        })
      } catch (error) {
        console.error('Failed to update profile image:', error)
        this.setError('Failed to update profile image. Please try again.')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Clear profile data (useful for logout)
    clearProfile() {
      this.profile = {
        name: '',
        email: '',
        image: null
      }
      this.error = null
    }
  }
})
