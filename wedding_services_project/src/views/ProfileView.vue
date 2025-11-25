<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('profile') }}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6">
        <!-- Profile Info -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('profile_information') }}</h2>
          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {{ $t('name') }}
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {{ $t('email') }}
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {{ $t('phone') }}
              </label>
              <input
                v-model="profileForm.phone"
                type="tel"
                class="input-field"
              />
            </div>
            <button type="submit" class="btn-primary">{{ $t('update') }}</button>
          </form>
        </div>

        <!-- Change Password -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('change_password') }}</h2>
          <form @submit.prevent="handleChangePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {{ $t('current_password') }}
              </label>
              <input
                v-model="passwordForm.current_password"
                type="password"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {{ $t('new_password') }}
              </label>
              <input
                v-model="passwordForm.new_password"
                type="password"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {{ $t('confirm_new_password') }}
              </label>
              <input
                v-model="passwordForm.new_password_confirmation"
                type="password"
                class="input-field"
              />
            </div>
            <button type="submit" class="btn-primary">{{ $t('update') }}</button>
          </form>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <div class="card text-center">
          <div class="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span class="text-4xl">{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
          </div>
          <h3 class="text-lg font-semibold">{{ authStore.user?.name }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ authStore.user?.email }}</p>
        </div>

        <div class="card">
          <h3 class="font-semibold mb-4">{{ $t('quick_links') }}</h3>
          <div class="space-y-2">
            <RouterLink
              v-if="authStore.isUser"
              to="/dashboard/my-bookings"
              class="block text-primary-600 hover:text-primary-700"
            >
              {{ $t('my_bookings') }}
            </RouterLink>
            <RouterLink
              v-if="authStore.isUser"
              to="/dashboard/wishlist"
              class="block text-primary-600 hover:text-primary-700"
            >
              {{ $t('my_wishlist') }}
            </RouterLink>
            <RouterLink
              v-if="authStore.isVendor"
              to="/dashboard"
              class="block text-primary-600 hover:text-primary-700"
            >
              {{ $t('dashboard') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const authStore = useAuthStore()

const profileForm = ref({
  name: '',
  email: '',
  phone: ''
})

const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

onMounted(() => {
  if (authStore.user) {
    profileForm.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || ''
    }
  }
})

async function handleUpdateProfile() {
  const result = await authStore.updateProfile(profileForm.value)
  if (result.success) {
    alert('Profile updated successfully!')
  } else {
    alert(result.message)
  }
}

async function handleChangePassword() {
  if (passwordForm.value.new_password !== passwordForm.value.new_password_confirmation) {
    alert('Passwords do not match')
    return
  }
  try {
    await axios.post(`${API_URL}/auth/change-password`, passwordForm.value)
    alert('Password changed successfully!')
    passwordForm.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to change password')
  }
}
</script>

