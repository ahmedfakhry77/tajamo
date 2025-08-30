<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Header Component -->
    <ThemeHeader
      class="sticky top-0 z-50"
      :logo="layoutData?.app_logo?.light_mode || '/images/hero.jpg'"
      :user="userStore?.profile"
    />

    <!-- Main Content -->
    <main>
      <slot />
      <NuxtSnackbar />
    </main>
    <!-- Footer Component -->
    <ThemeFooter
      :logo="layoutData?.app_logo?.dark_mode || '/images/hero.jpg'"
      :description="layoutData?.app_description?.es || 'Default description'"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/module/user";
// Default layout logic can be added here
const {
  data: layoutData,
  pending,
  error,
} = await useMyFetch("/general/layout");
const userStore = useUserStore();
if (layoutData.value.user) {
  userStore.profile = layoutData.value.user;
}
// Provide layout data to child components
provide("layoutData", layoutData);
</script>

<style scoped>
/* Custom styles for default layout */
</style>
