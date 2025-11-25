import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([])
  const loading = ref(false)

  async function createBooking(bookingData) {
    loading.value = true
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create booking'
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchBookings(params = {}) {
    loading.value = true
    try {
      const response = await axios.get(`${API_URL}/bookings`, { params })
      bookings.value = response.data.data || response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch bookings'
      }
    } finally {
      loading.value = false
    }
  }

  async function updateBookingStatus(id, status) {
    loading.value = true
    try {
      const response = await axios.patch(`${API_URL}/bookings/${id}/status`, { status })
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update booking'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    bookings,
    loading,
    createBooking,
    fetchBookings,
    updateBookingStatus
  }
})

