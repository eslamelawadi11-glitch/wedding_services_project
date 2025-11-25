import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)

  // Set axios default header if token exists
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isVendor = computed(() => user.value?.role === 'vendor')
  const isUser = computed(() => user.value?.role === 'user')

  async function login(email, password) {
    loading.value = true
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      }
    } finally {
      loading.value = false
    }
  }

  async function register(userData, role = 'user') {
    loading.value = true
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        ...userData,
        role
      })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await axios.get(`${API_URL}/auth/me`)
      user.value = response.data
    } catch (error) {
      await logout()
    }
  }

  async function updateProfile(profileData) {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, profileData)
      user.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed'
      }
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    isVendor,
    isUser,
    login,
    register,
    logout,
    fetchUser,
    updateProfile
  }
})

