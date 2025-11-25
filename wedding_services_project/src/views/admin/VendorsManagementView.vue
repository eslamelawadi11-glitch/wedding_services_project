<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('manage_vendors') }}</h1>

    <div class="card">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('business_name') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('email') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('city') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('rating') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="vendor in vendors"
              :key="vendor.id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-3 px-4">{{ vendor.business_name }}</td>
              <td class="py-3 px-4">{{ vendor.user?.email }}</td>
              <td class="py-3 px-4">{{ vendor.city }}</td>
              <td class="py-3 px-4">
                <span class="flex items-center gap-1">
                  <font-awesome-icon icon="star" class="text-yellow-500 text-sm" />
                  <span>{{ vendor.rating || '0.0' }}</span>
                </span>
              </td>
              <td class="py-3 px-4">
                <button
                  @click="deleteVendor(vendor.id)"
                  class="text-red-600 hover:text-red-700"
                >
                  {{ $t('delete') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const vendors = ref([])
const loading = ref(false)

onMounted(async () => {
  await fetchVendors()
})

async function fetchVendors() {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/admin/vendors`)
    vendors.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch vendors:', error)
  } finally {
    loading.value = false
  }
}

async function deleteVendor(id) {
  if (confirm('Are you sure you want to delete this vendor?')) {
    try {
      await axios.delete(`${API_URL}/admin/vendors/${id}`)
      await fetchVendors()
    } catch (error) {
      alert('Failed to delete vendor')
    }
  }
}
</script>

