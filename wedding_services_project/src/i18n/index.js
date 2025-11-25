import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

const getDefaultLocale = () => {
  const saved = localStorage.getItem('locale')
  if (saved) return saved
  const browserLang = navigator.language.split('-')[0]
  return ['ar', 'en'].includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    ar
  }
})

export default i18n

