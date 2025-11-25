<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('manage_services') }}</h1>

    <div class="card">
      <div v-if="servicesStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('service_title') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('vendor') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('category') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('price') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('status') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="service in servicesStore.services"
              :key="service.id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-3 px-4">{{ service.title }}</td>
              <td class="py-3 px-4">{{ service.vendor?.business_name }}</td>
              <td class="py-3 px-4">{{ service.category }}</td>
              <td class="py-3 px-4">${{ service.price }}</td>
              <td class="py-3 px-4">
                <span :class="getStatusClass(service.status)">{{ service.status }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-2">
                  <button
                    v-if="service.status === 'pending'"
                    @click="updateStatus(service.id, 'approved')"
                    class="text-green-600 hover:text-green-700"
                  >
                    {{ $t('approve') }}
                  </button>
                  <button
                    @click="deleteService(service.id)"
                    class="text-red-600 hover:text-red-700"
                  >
                    {{ $t('delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useServicesStore } from '../../stores/services'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const servicesStore = useServicesStore()

onMounted(async () => {
  await servicesStore.fetchServices({ admin: true })
})

async function updateStatus(id, status) {
  try {
    await axios.patch(`${API_URL}/admin/services/${id}/status`, { status })
    await servicesStore.fetchServices({ admin: true })
  } catch (error) {
    alert('Failed to update service status')
  }
}

async function deleteService(id) {
  if (confirm('Are you sure you want to delete this service?')) {
    const result = await servicesStore.deleteService(id)
    if (result.success) {
      await servicesStore.fetchServices({ admin: true })
    } else {
      alert(result.message)
    }
  }
}

function getStatusClass(status) {
  const classes = {
    pending: 'text-yellow-600',
    approved: 'text-green-600',
    rejected: 'text-red-600'
  }
  return classes[status] || ''
}
</script>

