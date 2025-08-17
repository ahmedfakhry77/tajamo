<template>
  <nav class="mb-6" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li>
        <NuxtLink
          to="/"
          class="text-gray-500 hover:text-blue-600 transition-colors flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          {{ $t('breadcrumb.home') }}
        </NuxtLink>
      </li>
      
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <svg class="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="breadcrumb.path"
          class="text-gray-500 hover:text-blue-600 transition-colors"
        >
          {{ breadcrumb.name }}
        </NuxtLink>
        
        <span v-else class="text-gray-900 font-medium">
          {{ breadcrumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every(
        (item) => typeof item.name === "string" && typeof item.path === "string"
      );
    },
  },
});
</script>
