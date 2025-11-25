<template>
  <button
    @click="toggleTheme"
    class="theme-switcher-btn"
    :title="themeStore.isDark ? t('light_mode') : t('dark_mode')"
    :aria-label="themeStore.isDark ? t('light_mode') : t('dark_mode')"
    :aria-pressed="themeStore.isDark"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 rotate-90 scale-0"
      enter-to-class="opacity-100 rotate-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 -rotate-90 scale-0"
    >
      <font-awesome-icon
        :key="themeStore.isDark ? 'sun' : 'moon'"
        :icon="themeStore.isDark ? 'sun' : 'moon'"
        class="text-lg"
      />
    </Transition>
  </button>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const { t } = useI18n()

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.theme-switcher-btn {
  @apply flex items-center justify-center 
         w-10 h-10 rounded-lg
         bg-white dark:bg-gray-700
         border border-gray-200 dark:border-gray-600
         text-gray-700 dark:text-gray-300
         hover:bg-primary-50 dark:hover:bg-gray-600
         hover:text-primary-600 dark:hover:text-primary-400
         hover:border-primary-300 dark:hover:border-primary-500
         transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
         active:scale-95;
}

/* Smooth theme transition */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>
