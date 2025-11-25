<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('dashboard') }}</h1>
    
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('total_services') }}</h3>
        <p class="text-3xl font-bold text-primary-600">{{ stats.total_services || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('pending_bookings') }}</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.pending_bookings || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('accepted_bookings') }}</h3>
        <p class="text-3xl font-bold text-green-600">{{ stats.accepted_bookings || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ $t('total_revenue') }}</h3>
        <p class="text-3xl font-bold text-blue-600">${{ stats.total_revenue || 0 }}</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <RouterLink to="/dashboard/services" class="card hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ $t('my_services') }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('manage_your_services') }}</p>
      </RouterLink>
      <RouterLink to="/dashboard/bookings" class="card hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold mb-2">{{ $t('booking_requests') }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('view_and_manage_bookings') }}</p>
      </RouterLink>
    </div>

    <!-- Recent Bookings -->
    <div class="card">
      <h2 class="text-xl font-semibold mb-4">{{ $t('recent_bookings') }}</h2>
      <div v-if="recentBookings.length === 0" class="text-center py-8 text-gray-500">
        {{ $t('no_bookings') }}
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('service') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('customer') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('date') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('status') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in recentBookings" :key="booking.id" class="border-b border-gray-200 dark:border-gray-700">
              <td class="py-3 px-4">{{ booking.service?.title }}</td>
              <td class="py-3 px-4">{{ booking.user?.name }}</td>
              <td class="py-3 px-4">{{ formatDate(booking.date) }}</td>
              <td class="py-3 px-4">
                <span :class="getStatusClass(booking.status)">{{ $t(booking.status) }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-2">
                  <button
                    v-if="booking.status === 'pending'"
                    @click="updateBookingStatus(booking.id, 'accepted')"
                    class="text-green-600 hover:text-green-700"
                  >
                    {{ $t('accept') }}
                  </button>
                  <button
                    v-if="booking.status === 'pending'"
                    @click="updateBookingStatus(booking.id, 'rejected')"
                    class="text-red-600 hover:text-red-700"
                  >
                    {{ $t('reject') }}
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
import { ref, onMounted } from 'vue'
import { useBookingsStore } from '../../stores/bookings'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const bookingsStore = useBookingsStore()

const stats = ref({})
const recentBookings = ref([])

onMounted(async () => {
  await fetchStats()
  await fetchRecentBookings()
})

async function fetchStats() {
  try {
    const response = await axios.get(`${API_URL}/vendor/stats`)
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

async function fetchRecentBookings() {
  try {
    const response = await axios.get(`${API_URL}/vendor/bookings?limit=5`)
    recentBookings.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  }
}

async function updateBookingStatus(id, status) {
  const result = await bookingsStore.updateBookingStatus(id, status)
  if (result.success) {
    await fetchRecentBookings()
    await fetchStats()
  } else {
    alert(result.message)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

function getStatusClass(status) {
  const classes = {
    pending: 'text-yellow-600',
    accepted: 'text-green-600',
    rejected: 'text-red-600'
  }
  return classes[status] || ''
}
</script>

