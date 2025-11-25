import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const useServicesStore = defineStore('services', () => {
  const services = ref([])
  const featuredServices = ref([])
  const topRatedServices = ref([])
  const currentService = ref(null)
  const loading = ref(false)
  const filters = ref({
    city: '',
    area: '',
    category: '',
    price_min: '',
    price_max: '',
    date: '',
    rating: '',
    capacity: ''
  })

  async function fetchServices(params = {}) {
    loading.value = true
    try {
      const response = await axios.get(`${API_URL}/services`, { params })
      services.value = response.data.data || response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch services'
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedServices() {
    try {
      const response = await axios.get(`${API_URL}/services/featured`)
      featuredServices.value = response.data.data || response.data
    } catch (error) {
      console.error('Failed to fetch featured services:', error)
    }
  }

  async function fetchTopRatedServices() {
    try {
      const response = await axios.get(`${API_URL}/services/top-rated`)
      topRatedServices.value = response.data.data || response.data
    } catch (error) {
      console.error('Failed to fetch top rated services:', error)
    }
  }

  async function fetchService(id) {
    loading.value = true
    try {
      const response = await axios.get(`${API_URL}/services/${id}`)
      currentService.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch service'
      }
    } finally {
      loading.value = false
    }
  }

  async function createService(serviceData) {
    loading.value = true
    try {
      const response = await axios.post(`${API_URL}/services`, serviceData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create service'
      }
    } finally {
      loading.value = false
    }
  }

  async function updateService(id, serviceData) {
    loading.value = true
    try {
      const response = await axios.put(`${API_URL}/services/${id}`, serviceData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update service'
      }
    } finally {
      loading.value = false
    }
  }

  async function deleteService(id) {
    loading.value = true
    try {
      await axios.delete(`${API_URL}/services/${id}`)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete service'
      }
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearFilters() {
    filters.value = {
      city: '',
      area: '',
      category: '',
      price_min: '',
      price_max: '',
      date: '',
      rating: '',
      capacity: ''
    }
  }

  return {
    services,
    featuredServices,
    topRatedServices,
    currentService,
    loading,
    filters,
    fetchServices,
    fetchFeaturedServices,
    fetchTopRatedServices,
    fetchService,
    createService,
    updateService,
    deleteService,
    setFilters,
    clearFilters
  }
})

