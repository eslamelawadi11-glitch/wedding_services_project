<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('welcome') }}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ $t('find_perfect_wedding_service') }}
          </p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">{{ $t('categories') }}</h4>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>{{ $t('wedding_halls') }}</li>
            <li>{{ $t('photographers') }}</li>
            <li>{{ $t('makeup_artists') }}</li>
            <li>{{ $t('djs') }}</li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">{{ $t('services') }}</h4>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><RouterLink to="/services">{{ $t('view_all') }}</RouterLink></li>
            <li v-if="authStore.isAuthenticated"><RouterLink to="/dashboard/wishlist">{{ $t('my_wishlist') }}</RouterLink></li>
            <li v-if="authStore.isAuthenticated"><RouterLink to="/dashboard/my-bookings">{{ $t('my_bookings') }}</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">{{ $t('contact') }}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Email: info@weddingservices.com<br>
            Phone: +1234567890
          </p>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Wedding Services Platform. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
</script>

