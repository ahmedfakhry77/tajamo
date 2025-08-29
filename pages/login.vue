<template>
  <div>
    <h2
      class="text-2xl font-heading font-bold text-secondary-800 text-center mb-6"
    >
      {{ $t('auth.login.title') }}
    </h2>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Email Field -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
          {{ $t('auth.login.email') }}
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          :placeholder="$t('auth.login.emailPlaceholder')"
        />
      </div>

      <!-- Password Field -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
          {{ $t('auth.login.password') }}
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="w-full px-3 py-2 pr-10 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :placeholder="$t('auth.login.passwordPlaceholder')"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <svg
              v-if="showPassword"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
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
            {{ $t('auth.login.rememberMe') }}
          </label>
        </div>
        <a href="#" class="text-sm text-scimaPrimary hover:text-primary-500">
          {{ $t('auth.login.forgotPassword') }}
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
          {{ $t('auth.login.signingIn') }}
        </div>
        <span v-else>{{ $t('auth.login.signIn') }}</span>
      </button>
    </form>

    <!-- Sign Up Link -->
    <div class="text-center mt-6">
      <p class="text-secondary-600">
        {{ $t('auth.login.noAccount') }}
        <NuxtLink
          to="/register"
          class="text-scimaPrimary hover:text-primary-500 font-medium"
        >
          {{ $t('auth.login.signUp') }}
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
const showPassword = ref(false);

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
