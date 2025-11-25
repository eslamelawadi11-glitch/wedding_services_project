<template>
  <div class="max-w-2xl mx-auto">
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('search_placeholder')"
        class="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none"
      />
      <button type="submit" class="btn-primary px-8">
        {{ $t('search') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'services',
      query: { search: searchQuery.value }
    })
  }
}
</script>

