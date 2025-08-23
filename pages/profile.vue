<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
        <p class="mt-2 text-gray-600">Manage your account information</p>
      </div>

      <!-- Profile Content -->
      <div class="bg-white shadow rounded-lg">
        <!-- Profile Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
        </div>

        <!-- Profile Form -->
        <div class="px-6 py-6">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Profile Picture -->
            <div class="flex items-center space-x-6">
              <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  v-if="profile.image" 
                  :src="profile.image" 
                  alt="Profile" 
                  class="w-24 h-24 rounded-full object-cover"
                />
                <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="space-y-3">
                <button
                  type="button"
                  @click="triggerFileUpload"
                  class="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Change Photo
                </button>
                <p class="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
              </div>
            </div>

            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
                placeholder="Enter your full name"
              />
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                disabled
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                placeholder="your.email@example.com"
              />
              <p class="mt-1 text-sm text-gray-500">Email cannot be changed</p>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
                <span v-else>Update Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  // middleware: "auth"
})

// Import the profile store
import { useProfileStore } from '~/stores/module/profile'

// Get store instance
const profileStore = useProfileStore()

// Local form state
const form = ref({
  name: '',
  email: ''
})

// Local refs
const fileInput = ref(null)

// Computed properties from store
const profile = computed(() => profileStore.getProfile)
const loading = computed(() => profileStore.isLoading)
const error = computed(() => profileStore.getError)

// Update profile
const updateProfile = async () => {
  try {
    await profileStore.updateProfile({
      name: form.value.name,
      email: form.value.email
    })
    
    $snackbar.add({
      type: "success",
      text: "Profile updated successfully!"
    })
  } catch (error) {
    $snackbar.add({
      type: "error",
      text: profileStore.getError || "Failed to update profile. Please try again."
    })
  }
}

// File upload handling
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      await profileStore.updateProfileImage(file)
      
      $snackbar.add({
        type: "success",
        text: "Profile image updated successfully!"
      })
    } catch (error) {
      $snackbar.add({
        type: "error",
        text: profileStore.getError || "Failed to update profile image. Please try again."
      })
    }
  }
}

// Watch for profile changes and update form
watch(profile, (newProfile) => {
  if (newProfile) {
    form.value.name = newProfile.name || ''
    form.value.email = newProfile.email || ''
  }
}, { immediate: true })

// Load profile on mount
onMounted(async () => {
  // const token = useCookie('token')
  // if (!token.value) {
  //   navigateTo('/login')
  //   return
  // }
  
  try {
    await profileStore.loadProfile()
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
})
</script>

<style scoped>
/* Profile page specific styles */
</style>

