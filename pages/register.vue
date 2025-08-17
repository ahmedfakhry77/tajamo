<template>
  <div>
    <h2 class="text-2xl font-heading font-bold text-secondary-800 text-center mb-6">
      Create your account
    </h2>
    
    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Name Fields -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-secondary-700 mb-2">
            First name
          </label>
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            required
            class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="First name"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-secondary-700 mb-2">
            Last name
          </label>
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            required
            class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="Last name"
          />
        </div>
      </div>
      
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-secondary-700 mb-2">
          Email address
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          placeholder="Enter your email"
        />
      </div>
      
      <!-- Password Fields -->
      <div>
        <label for="password" class="block text-sm font-medium text-secondary-700 mb-2">
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          placeholder="Create a password"
        />
      </div>
      
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-secondary-700 mb-2">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          required
          class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          placeholder="Confirm your password"
        />
      </div>
      
      <!-- Terms and Conditions -->
      <div class="flex items-center">
        <input
          id="terms"
          v-model="form.terms"
          type="checkbox"
          required
          class="h-4 w-4 text-scimaPrimary focus:ring-primary-500 border-secondary-300 rounded"
        />
        <label for="terms" class="ml-2 block text-sm text-secondary-700">
          I agree to the
          <a href="#" class="text-scimaPrimary hover:text-primary-500">Terms of Service</a>
          and
          <a href="#" class="text-scimaPrimary hover:text-primary-500">Privacy Policy</a>
        </label>
      </div>
      
      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading || !form.terms"
        class="w-full bg-scimaPrimary hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <span v-if="loading">Creating account...</span>
        <span v-else>Create account</span>
      </button>
    </form>
    
    
    
    <!-- Sign In Link -->
    <div class="text-center mt-6">
      <p class="text-secondary-600">
        Already have an account?
        <NuxtLink to="/login" class="text-scimaPrimary hover:text-primary-500 font-medium">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const loading = ref(false)

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  
  loading.value = true
  try {
    // Add your registration logic here
    console.log('Registration attempt:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    // Redirect or handle success
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Register page specific styles */
</style>
