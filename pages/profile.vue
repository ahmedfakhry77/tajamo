<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ $t("profile.title") }}
        </h1>
        <p class="mt-2 text-gray-600">{{ $t("profile.subtitle") }}</p>
      </div>

      <!-- Profile Content -->
      <div v-if="!isLoading" class="bg-white shadow rounded-lg">
        <!-- Profile Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">
            {{ $t("profile.personalInfo") }}
          </h2>
        </div>

        <!-- Profile Form -->
        <div class="px-6 py-6">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Profile Picture -->
            <GlobalProfilePictureUpload @update-image="handleImageUpdate" />

            <!-- Name Field -->
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
                >{{ $t("auth.register.name") }}</label
              >
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
                :placeholder="$t('auth.register.name')"
              />
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
                >{{ $t("auth.login.email") }}</label
              >
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
                :placeholder="$t('auth.login.email')"
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
                  <svg
                    class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ $t("profile.updating") }}
                </span>
                <span v-else>{{ $t("profile.updateProfile") }}</span>
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
});

import { ref, onMounted, watch, inject } from "vue";
import { useUserStore } from "@/stores/module/user";

const userStore = useUserStore();
const isLoading = ref(false);

// Form state
const form = ref({
  name: "",
  email: "",
  image: null,
});

// Initialize form with user data from store

isLoading.value = true;
await userStore
  .fetchProfile()
  .then(() => {
    if (userStore.profile) {
      form.value.name = userStore.profile.name || "";
      form.value.email = userStore.profile.email || "";
    }
  })
  .finally(() => {
    isLoading.value = false;
  });

// Watch for profile updates from store
watch(
  () => userStore.profile,
  (newProfile) => {
    if (newProfile) {
      form.value.name = newProfile.name || "";
      form.value.email = newProfile.email || "";
    }
  },
  { immediate: true }
);

// Update profile
const updateProfile = async () => {
  const success = await userStore.updateProfile({
    name: form.value.name,
    email: form.value.email,
    image: form.value.image,
  });

  if (success) {
    $snackbar.add({
      type: "success",
      text: "Profile updated successfully!",
    });
  } else {
    $snackbar.add({
      type: "error",
      text: userStore.error || "Failed to update profile. Please try again.",
    });
  }
};

const handleImageUpdate = async (file) => {
  // Store the file in form for the update
  form.value.image = file;
};
</script>
