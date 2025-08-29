<template>
  <div>
    <h2
      class="text-2xl font-heading font-bold text-secondary-800 text-center mb-6"
    >
      {{ $t("auth.register.title") }}
    </h2>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Name Field -->
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
          {{ $t("auth.register.name") }}
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          :placeholder="$t('auth.register.name')"
        />
      </div>

      <!-- Email Field -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
          {{ $t("auth.register.email") }}
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          :placeholder="$t('auth.register.email')"
        />
      </div>

      <!-- Password Fields -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
          {{ $t("auth.register.password") }}
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="w-full px-3 py-2 pr-10 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :placeholder="$t('auth.register.password')"
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

      <div>
        <label
          for="passwordConfirmation"
          class="block text-sm font-medium text-secondary-700 mb-2"
        >
          {{ $t("auth.register.passwordConfirmation") }}
        </label>
        <div class="relative">
          <input
            id="passwordConfirmation"
            v-model="form.passwordConfirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            required
            class="w-full px-3 py-2 pr-10 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :placeholder="$t('auth.register.passwordConfirmation')"
          />
          <button
            type="button"
            @click="showPasswordConfirmation = !showPasswordConfirmation"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <svg
              v-if="showPasswordConfirmation"
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

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="w-full bg-scimaPrimary hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        <span v-if="loading">{{ $t("auth.register.creatingAccount") }}</span>
        <span v-else>{{ $t("auth.register.createAccount") }}</span>
      </button>
    </form>

    <!-- Sign In Link -->
    <div class="text-center mt-6">
      <p class="text-secondary-600">
        {{ $t("auth.register.haveAccount") }}
        <NuxtLink
          to="/login"
          class="text-scimaPrimary hover:text-primary-500 font-medium"
        >
          {{ $t("auth.register.signIn") }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

import { useMyFetch, useAuthToken } from "~/composables/useMyFetch";
const snackbar = useSnackbar();

const form = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const loading = ref(false);
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const isFormValid = computed(() => {
  return (
    form.value.name.trim() !== "" &&
    form.value.email.trim() !== "" &&
    form.value.password.trim() !== "" &&
    form.value.passwordConfirmation.trim() !== "" &&
    form.value.password === form.value.passwordConfirmation
  );
});

const { setToken, clearToken, token } = useAuthToken();

const validateForm = () => {
  if (!form.value.name.trim()) {
    snackbar.add({
      type: "error",
      text: "Please enter your full name.",
    });
    return false;
  }

  if (!form.value.email.trim()) {
    snackbar.add({
      type: "error",
      text: "Please enter your email address.",
    });
    return false;
  }

  if (!form.value.password.trim()) {
    snackbar.add({
      type: "error",
      text: "Please enter a password.",
    });
    return false;
  }

  if (form.value.password.length < 6) {
    snackbar.add({
      type: "error",
      text: "Password must be at least 6 characters long.",
    });
    return false;
  }

  if (form.value.password !== form.value.passwordConfirmation) {
    snackbar.add({
      type: "error",
      text: "Passwords do not match.",
    });
    return false;
  }

  return true;
};

const register = async () => {
  try {
    const { data, error, status } = await useMyFetch("/register", {
      method: "POST",
      body: {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.passwordConfirmation,
      },
    });

    if (error.value) {
      snackbar.add({
        type: "error",
        text:
          error.value?.data?.message?.es ||
          `Registration failed (status: ${status.value})`,
      });
      return;
    }

    if (data.value?.token) {
      setToken(data.value.token);
      
      snackbar.add({
        type: "success",
        text: "Registration successful! Welcome to Tajamo.",
      });
      
      
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


const handleRegister = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    await register();
  } finally {
    loading.value = false;
  }
};
</script>

