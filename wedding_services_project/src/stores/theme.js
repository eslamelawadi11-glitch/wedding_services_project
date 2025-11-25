import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
    valueLight: 'light'
  })
  const toggle = useToggle(isDark)

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggleTheme() {
    toggle()
  }

  return {
    isDark,
    toggleTheme
  }
})

