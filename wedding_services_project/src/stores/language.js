import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', () => {
  const { locale } = useI18n()
  const currentLocale = ref(locale.value || localStorage.getItem('locale') || 'en')

  function setLocale(lang) {
    // Update store state
    currentLocale.value = lang
    
    // Update i18n locale
    locale.value = lang
    
    // Save to localStorage
    localStorage.setItem('locale', lang)
    
    // Update document attributes
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
    
    // Force a re-render by triggering a small delay
    // This ensures all components pick up the language change
    setTimeout(() => {
      // Trigger a custom event for any components that need to react
      window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }))
    }, 0)
  }

  // Initialize on store creation
  if (currentLocale.value) {
    setLocale(currentLocale.value)
  }

  return {
    currentLocale,
    setLocale
  }
})
