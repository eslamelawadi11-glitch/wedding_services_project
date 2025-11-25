<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('my_bookings') }}</h1>

    <div class="card">
      <div v-if="bookingsStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="bookingsStore.bookings.length === 0" class="text-center py-12 text-gray-500">
        {{ $t('no_bookings') }}
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="booking in bookingsStore.bookings"
          :key="booking.id"
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold mb-2">{{ booking.service?.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-2">
                {{ $t('vendor') }}: {{ booking.vendor?.business_name }}
              </p>
              <p class="text-gray-600 dark:text-gray-400 mb-2">
                {{ $t('date') }}: {{ formatDate(booking.date) }}
              </p>
              <p v-if="booking.message" class="text-gray-600 dark:text-gray-400 mb-2">
                {{ booking.message }}
              </p>
            </div>
            <span :class="['px-3 py-1 rounded-full text-sm', getStatusClass(booking.status)]">
              {{ $t(booking.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBookingsStore } from '../../stores/bookings'

const bookingsStore = useBookingsStore()

onMounted(async () => {
  await bookingsStore.fetchBookings({ user: true })
})

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

function getStatusClass(status) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || ''
}
</script>

