import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref([])
  const loading = ref(false)

  const wishlistIds = computed(() => wishlist.value.map(item => item.id || item.service_id))

  async function fetchWishlist() {
    loading.value = true
    try {
      const response = await axios.get(`${API_URL}/wishlist`)
      wishlist.value = response.data.data || response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch wishlist'
      }
    } finally {
      loading.value = false
    }
  }

  async function addToWishlist(serviceId) {
    loading.value = true
    try {
      const response = await axios.post(`${API_URL}/wishlist`, { service_id: serviceId })
      wishlist.value.push(response.data)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to wishlist'
      }
    } finally {
      loading.value = false
    }
  }

  async function removeFromWishlist(serviceId) {
    loading.value = true
    try {
      await axios.delete(`${API_URL}/wishlist/${serviceId}`)
      wishlist.value = wishlist.value.filter(item => (item.id || item.service_id) !== serviceId)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove from wishlist'
      }
    } finally {
      loading.value = false
    }
  }

  function isInWishlist(serviceId) {
    return wishlistIds.value.includes(serviceId)
  }

  return {
    wishlist,
    loading,
    wishlistIds,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }
})

