<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('manage_users') }}</h1>

    <div class="card">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('name') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('email') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('role') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('created_at') }}</th>
              <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-3 px-4">{{ user.name }}</td>
              <td class="py-3 px-4">{{ user.email }}</td>
              <td class="py-3 px-4">{{ user.role }}</td>
              <td class="py-3 px-4">{{ formatDate(user.created_at) }}</td>
              <td class="py-3 px-4">
                <button
                  @click="deleteUser(user.id)"
                  class="text-red-600 hover:text-red-700"
                >
                  {{ $t('delete') }}
                </button>
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
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const users = ref([])
const loading = ref(false)

onMounted(async () => {
  await fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/admin/users`)
    users.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    loading.value = false
  }
}

async function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`)
      await fetchUsers()
    } catch (error) {
      alert('Failed to delete user')
    }
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
</script>

