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
                <!-- Preview new selected image -->
                <img 
                  v-if="form.image" 
                  :src="URL.createObjectURL(form.image)" 
                  alt="Selected Image" 
                  class="w-24 h-24 rounded-full object-cover"
                />
                <!-- Show from store if no new image -->
                <img 
                  v-else-if="userStore.profile?.picture?.lg || userStore.profile?.image" 
                  :src="userStore.profile?.picture?.lg || userStore.profile?.image" 
                  alt="Profile" 
                  :key="userStore.profile?.picture?.lg || userStore.profile?.image"
                  class="w-24 h-24 rounded-full object-cover"
                />
                <!-- Fallback -->
                <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="space-y-3">
                <button
                  type="button"
                  @click="triggerFileUpload"
                  class="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ form.image ? 'Change Photo' : 'Change Photo' }}
                </button>
                <p v-if="form.image" class="text-xs text-green-600 font-medium">
                  ✓ New image selected! Click "Update Profile" to save.
                </p>
                <p v-else class="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
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
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
                placeholder="your.email@example.com"
              />
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4">
              <button
                type="submit"
                :disabled="userStore.loading"
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              >
                <span v-if="userStore.loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/module/user' 

const userStore = useUserStore()
const fileInput = ref(null)

// Form state
const form = ref({
  name: '',
  email: '',
  image: null
})

// Initialize form once profile is fetched
onMounted(async () => {
  await userStore.fetchProfile()
  if (userStore.profile) {
    form.value.name = userStore.profile.name || ''
    form.value.email = userStore.profile.email || ''
  }
})

// Watch for profile updates (optional if backend returns latest data)
watch(() => userStore.profile, (newVal) => {
  if (newVal) {
    form.value.name = newVal.name || ''
    form.value.email = newVal.email || ''
  }
})

// Update profile
const updateProfile = async () => {
  const success = await userStore.updateProfile({
    name: form.value.name,
    email: form.value.email,
    image: form.value.image
  })

  if (success) {
    $snackbar.add({
      type: "success",
      text: "Profile updated successfully!"
    })
  } else {
    $snackbar.add({
      type: "error",
      text: userStore.error || "Failed to update profile. Please try again."
    })
  }
}

// File upload handling
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    $snackbar.add({
      type: "success",
      text: "Image selected! Click 'Update Profile' to save changes."
    })
  }
}
</script>
