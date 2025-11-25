<template>
  <div
    @click="$emit('click')"
    class="category-card group"
  >
    <div class="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
      <font-awesome-icon :icon="category.icon" class="text-2xl text-primary-600 dark:text-primary-400" />
    </div>
    <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
      {{ category.name }}
    </h3>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
