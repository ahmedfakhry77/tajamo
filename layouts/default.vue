<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Header Component -->
    <ThemeHeader class="sticky top-0 z-50" />
    
    <!-- Main Content -->
    <main >
      <slot />
      <NuxtSnackbar />
    </main>
    <Snackbar />
    <!-- Footer Component -->
    <ThemeFooter />
  </div>
</template>

<script setup>
// Default layout logic can be added here
</script>

<style scoped>
/* Custom styles for default layout */
</style>
