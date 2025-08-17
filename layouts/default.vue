<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Header Component -->
    <ThemeHeader />
    
    <!-- Main Content -->
    <main >
      <slot />
    </main>
    
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
