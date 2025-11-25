<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ $t('login') }}
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('email') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input-field"
              :placeholder="$t('email')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('password') }}
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="input-field"
              :placeholder="$t('password')"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              {{ $t('remember_me') }}
            </label>
          </div>
          <RouterLink to="/forgot-password" class="text-sm text-primary-600 hover:text-primary-500">
            {{ $t('forgot_password') }}
          </RouterLink>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full"
          >
            <span v-if="authStore.loading">{{ $t('loading') }}...</span>
            <span v-else>{{ $t('login') }}</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('dont_have_account') }}
            <RouterLink to="/register" class="text-primary-600 hover:text-primary-500">
              {{ $t('register') }}
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  remember: false
})

async function handleLogin() {
  const result = await authStore.login(form.value.email, form.value.password)
  if (result.success) {
    const redirect = route.query.redirect || (authStore.isVendor ? '/dashboard' : '/')
    router.push(redirect)
  } else {
    alert(result.message)
  }
}
</script>

