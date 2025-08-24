<template>
  <div class="items-center gap-3 hidden md:flex">
    <span class="text-sm font-medium text-gray-700"
      >{{ $t("shop.filters.sortBy.title") }}:</span
    >
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in sortOptions"
        :key="option.value"
        @click="$emit('update:modelValue', option.value)"
        class="px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm"
        :class="
          modelValue === option.value
            ? 'bg-blue-500 text-white border-blue-500 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        "
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'name-asc'
  }
})

const emit = defineEmits(['update:modelValue'])

const sortOptions = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
]
</script>
