<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ $t('register') }}
        </h2>
        <div class="mt-4 flex gap-2 justify-center">
          <button
            @click="userType = 'user'"
            :class="['px-4 py-2 rounded-lg', userType === 'user' ? 'btn-primary' : 'btn-secondary']"
          >
            {{ $t('register_as_user') }}
          </button>
          <button
            @click="userType = 'vendor'"
            :class="['px-4 py-2 rounded-lg', userType === 'vendor' ? 'btn-primary' : 'btn-secondary']"
          >
            {{ $t('register_as_vendor') }}
          </button>
        </div>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('name') }}
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="input-field"
              :placeholder="$t('name')"
            />
          </div>
          <div v-if="userType === 'vendor'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('business_name') }}
            </label>
            <input
              v-model="form.business_name"
              type="text"
              required
              class="input-field"
              :placeholder="$t('business_name')"
            />
          </div>
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
              {{ $t('phone') }}
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="input-field"
              :placeholder="$t('phone')"
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
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('confirm_password') }}
            </label>
            <input
              v-model="form.password_confirmation"
              type="password"
              required
              class="input-field"
              :placeholder="$t('confirm_password')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full"
          >
            <span v-if="authStore.loading">{{ $t('loading') }}...</span>
            <span v-else>{{ $t('register') }}</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('already_have_account') }}
            <RouterLink to="/login" class="text-primary-600 hover:text-primary-500">
              {{ $t('login') }}
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userType = ref('user')
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  business_name: ''
})

async function handleRegister() {
  if (form.value.password !== form.value.password_confirmation) {
    alert('Passwords do not match')
    return
  }
  const result = await authStore.register(form.value, userType.value)
  if (result.success) {
    router.push(userType.value === 'vendor' ? '/dashboard' : '/')
  } else {
    alert(result.message)
  }
}
</script>

