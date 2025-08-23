<template>
  <div>
    <h2
      class="text-2xl font-heading font-bold text-secondary-800 text-center mb-6"
    >
      Sign in to your account
    </h2>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Email Field -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
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
        <label
          for="password"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
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
        :disabled="loading || !isFormValid"
        class="w-full bg-scimaPrimary hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        <div v-if="loading" class="flex items-center justify-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Signing in...
        </div>
        <span v-else>Sign in</span>
      </button>
    </form>

    <!-- Sign Up Link -->
    <div class="text-center mt-6">
      <p class="text-secondary-600">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="text-scimaPrimary hover:text-primary-500 font-medium"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  layout: "auth",
});

// Composables
import { useMyFetch, useAuthToken } from "~/composables/useMyFetch";
const snackbar = useSnackbar();
// Reactive data
const form = ref({
  email: "",
  password: "",
  remember: false,
});

const loading = ref(false);

// Computed properties
const isFormValid = computed(() => {
  return form.value.email.trim() !== "" && form.value.password.trim() !== "";
});

// Auth composable
const { setToken, clearToken, token } = useAuthToken();

// Form validation
const validateForm = () => {
  if (!form.value.email) {
    console.log("No email");
    snackbar.add({
      type: "error",
      text: "Please enter your email address.",
    });
    return false;
  }

  if (!form.value.password) {
    console.log("No password");
    snackbar.add({
      type: "error",
      text: "Please enter your password.",
    });
    return false;
  }

  return true;
};

// Login API call
const login = async () => {
  try {
    const { data, error, status } = await useMyFetch("/login", {
      method: "POST",
      body: form.value,
    });

    if (error.value) {

      // Show error message
      snackbar.add({
        type: "error",
        text: error.value?.data?.message || `Login failed (status: ${status.value})`,
      });

      return;
    }

    if (data.value?.token) {
      setToken(data.value.token);
      await navigateTo("/");
    } else {
      snackbar.add({
        type: "error",
        text: "No token returned from server.",
      });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    snackbar.add({
      type: "error",
      text: err.message || "Unexpected error occurred.",
    });
  }
};


// Form submission handler
const handleLogin = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    await login();
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Login page specific styles */
</style>
