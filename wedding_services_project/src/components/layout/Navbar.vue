<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse group">
          <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
            <font-awesome-icon icon="building" class="text-white text-xl" />
          </div>
          <span class="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
            {{ $t('welcome') }}
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <RouterLink
            to="/"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
            active-class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
          >
            <font-awesome-icon icon="home" class="text-sm" />
            {{ $t('home') }}
          </RouterLink>
          <RouterLink
            to="/services"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
            active-class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
          >
            <font-awesome-icon icon="search" class="text-sm" />
            {{ $t('services') }}
          </RouterLink>

          <!-- Authenticated User Menu -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink
              v-if="authStore.isVendor"
              to="/dashboard"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            >
              {{ $t('dashboard') }}
            </RouterLink>
            <RouterLink
              v-if="authStore.isAdmin"
              to="/admin"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            >
              {{ $t('admin') }}
            </RouterLink>
            <RouterLink
              to="/profile"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            >
              {{ $t('profile') }}
            </RouterLink>
            <button
              @click="handleLogout"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {{ $t('logout') }}
            </button>
          </template>

          <!-- Guest Menu -->
          <template v-else>
            <RouterLink
              to="/login"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {{ $t('login') }}
            </RouterLink>
            <RouterLink
              to="/register"
              class="btn-primary"
            >
              {{ $t('register') }}
            </RouterLink>
          </template>

          <!-- Language & Theme Switchers -->
          <div class="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-2">
        <RouterLink
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
          @click="mobileMenuOpen = false"
        >
          {{ $t('home') }}
        </RouterLink>
        <RouterLink
          to="/services"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
          @click="mobileMenuOpen = false"
        >
          {{ $t('services') }}
        </RouterLink>
        <template v-if="authStore.isAuthenticated">
          <RouterLink
            v-if="authStore.isVendor"
            to="/dashboard"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
            @click="mobileMenuOpen = false"
          >
            {{ $t('dashboard') }}
          </RouterLink>
          <RouterLink
            to="/profile"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
            @click="mobileMenuOpen = false"
          >
            {{ $t('profile') }}
          </RouterLink>
          <button
            @click="handleLogout"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
          >
            {{ $t('logout') }}
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
            @click="mobileMenuOpen = false"
          >
            {{ $t('login') }}
          </RouterLink>
          <RouterLink
            to="/register"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
            @click="mobileMenuOpen = false"
          >
            {{ $t('register') }}
          </RouterLink>
        </template>

        <!-- Mobile: Language & Theme Switchers -->
        <div class="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import LanguageSwitcher from '../LanguageSwitcher.vue'
import ThemeSwitcher from '../ThemeSwitcher.vue'

const router = useRouter()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)

async function handleLogout() {
  await authStore.logout()
  router.push('/')
  mobileMenuOpen.value = false
}
</script>

