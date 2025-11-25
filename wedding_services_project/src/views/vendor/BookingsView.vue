<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('booking_requests') }}</h1>

    <div class="card">
      <div v-if="bookingsStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="bookingsStore.bookings.length === 0" class="text-center py-12 text-gray-500">
        {{ $t('no_bookings') }}
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('service') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('customer') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('date') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('message') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('status') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="booking in bookingsStore.bookings"
              :key="booking.id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-3 px-4">{{ booking.service?.title }}</td>
              <td class="py-3 px-4">{{ booking.user?.name }}</td>
              <td class="py-3 px-4">{{ formatDate(booking.date) }}</td>
              <td class="py-3 px-4">{{ booking.message || '-' }}</td>
              <td class="py-3 px-4">
                <span :class="getStatusClass(booking.status)">{{ $t(booking.status) }}</span>
              </td>
              <td class="py-3 px-4">
                <div v-if="booking.status === 'pending'" class="flex gap-2">
                  <button
                    @click="updateStatus(booking.id, 'accepted')"
                    class="text-green-600 hover:text-green-700"
                  >
                    {{ $t('accept') }}
                  </button>
                  <button
                    @click="updateStatus(booking.id, 'rejected')"
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
import { onMounted } from 'vue'
import { useBookingsStore } from '../../stores/bookings'

const bookingsStore = useBookingsStore()

onMounted(async () => {
  await bookingsStore.fetchBookings({ vendor: true })
})

async function updateStatus(id, status) {
  const result = await bookingsStore.updateBookingStatus(id, status)
  if (result.success) {
    await bookingsStore.fetchBookings({ vendor: true })
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

