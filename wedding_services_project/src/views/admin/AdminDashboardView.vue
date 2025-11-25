<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('admin_dashboard') }}</h1>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('total_users') }}</h3>
        <p class="text-3xl font-bold text-blue-600">{{ stats.total_users || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('total_vendors') }}</h3>
        <p class="text-3xl font-bold text-green-600">{{ stats.total_vendors || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('total_services') }}</h3>
        <p class="text-3xl font-bold text-purple-600">{{ stats.total_services || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('total_bookings') }}</h3>
        <p class="text-3xl font-bold text-orange-600">{{ stats.total_bookings || 0 }}</p>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RouterLink to="/admin/users" class="card hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ $t('manage_users') }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">{{ $t('view_and_manage_all_users') }}</p>
      </RouterLink>
      <RouterLink to="/admin/vendors" class="card hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ $t('manage_vendors') }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">{{ $t('view_and_manage_all_vendors') }}</p>
      </RouterLink>
      <RouterLink to="/admin/services" class="card hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ $t('manage_services') }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">{{ $t('approve_and_manage_services') }}</p>
      </RouterLink>
      <RouterLink to="/admin/bookings" class="card hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ $t('manage_bookings') }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">{{ $t('view_all_bookings') }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const stats = ref({})

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats`)
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
})
</script>

