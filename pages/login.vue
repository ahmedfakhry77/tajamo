<template>
  <div>
    <h2 class="text-2xl font-heading font-bold text-secondary-800 text-center mb-6">
      Sign in to your account
    </h2>
    
    <form @submit.prevent="handleLogin" class="space-y-6">
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
      
      <!-- Password Field -->
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
          placeholder="Enter your password"
        />
      </div>
      
      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            class="h-4 w-4 text-scimaPrimary focus:ring-primary-500 border-secondary-300 rounded"
          />
          <label for="remember" class="ml-2 block text-sm text-secondary-700">
            Remember me
          </label>
        </div>
        <a href="#" class="text-sm text-scimaPrimary hover:text-primary-500">
          Forgot your password?
        </a>
      </div>
      
      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-scimaPrimary hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <span v-if="loading">Signing in...</span>
        <span v-else>Sign in</span>
      </button>
    </form>
    
   
    
   
    
    <!-- Sign Up Link -->
    <div class="text-center mt-6">
      <p class="text-secondary-600">
        Don't have an account?
        <NuxtLink to="/register" class="text-scimaPrimary hover:text-primary-500 font-medium">
          Sign up
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
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    // Add your login logic here
    console.log('Login attempt:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    // Redirect or handle success
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Login page specific styles */
</style>
