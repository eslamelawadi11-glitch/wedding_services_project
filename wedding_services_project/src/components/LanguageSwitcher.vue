<template>
  <div class="relative" ref="containerRef">
    <!-- Desktop: Button with Globe Icon and Language Code -->
    <div class="hidden md:block">
      <button
        @click.stop="toggleDropdown"
        class="language-switcher-btn"
        :title="t('language')"
        :aria-label="`${t('language')}: ${currentLanguageCode.toUpperCase()}`"
        :aria-expanded="showDropdown"
        type="button"
      >
        <font-awesome-icon icon="globe" class="text-base" />
        <span class="ml-2 font-semibold text-sm">{{ currentLanguageCode.toUpperCase() }}</span>
        <font-awesome-icon 
          icon="chevron-down" 
          class="ml-2 text-xs transition-transform duration-200"
          :class="{ 'rotate-180': showDropdown }"
        />
      </button>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95 translate-y-1"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-1"
      >
        <div
          v-if="showDropdown"
          ref="dropdownRef"
          class="language-dropdown"
          role="menu"
          @click.stop
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click.stop="handleLanguageSelect(lang.code)"
            class="language-option"
            :class="{ 'language-option-active': currentLanguageCode === lang.code }"
            role="menuitem"
            :aria-label="`Switch to ${lang.name}`"
            type="button"
          >
            <font-awesome-icon icon="globe" class="text-base" />
            <span class="ml-3 font-medium">{{ lang.name }}</span>
            <font-awesome-icon
              v-if="currentLanguageCode === lang.code"
              icon="check"
              class="ml-auto text-primary-600 dark:text-primary-400"
            />
          </button>
        </div>
      </Transition>
    </div>

    <!-- Mobile: Icon + Language Code -->
    <div class="md:hidden">
      <button
        @click="toggleLanguage"
        class="language-switcher-btn-mobile"
        :title="`${t('language')}: ${currentLanguageCode.toUpperCase()}`"
        :aria-label="`${t('language')}: ${currentLanguageCode.toUpperCase()}`"
        type="button"
      >
        <font-awesome-icon icon="globe" class="text-base" />
        <span class="ml-1.5 font-semibold text-xs">{{ currentLanguageCode.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useI18n } from 'vue-i18n'

const languageStore = useLanguageStore()
const { locale, t } = useI18n()

const showDropdown = ref(false)
const containerRef = ref(null)
const dropdownRef = ref(null)

const languages = [
  { code: 'en', name: 'English', icon: 'globe' },
  { code: 'ar', name: 'العربية', icon: 'globe' }
]

const currentLanguageCode = computed(() => languageStore.currentLocale)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    nextTick(() => {
      setupClickOutside()
    })
  }
}

async function handleLanguageSelect(code) {
  // Only switch if it's a different language
  if (code !== currentLanguageCode.value) {
    // Update language store
    languageStore.setLocale(code)
    
    // Force i18n locale update
    locale.value = code
    
    // Wait for the update to complete
    await nextTick()
    
    // Close dropdown after language change
    setTimeout(() => {
      showDropdown.value = false
    }, 100)
  } else {
    // If same language selected, just close dropdown
    showDropdown.value = false
  }
}

function switchLanguage(code) {
  handleLanguageSelect(code)
}

function toggleLanguage() {
  const currentIndex = languages.findIndex(lang => lang.code === currentLanguageCode.value)
  const nextIndex = (currentIndex + 1) % languages.length
  switchLanguage(languages[nextIndex].code)
}

function closeDropdown() {
  showDropdown.value = false
}

// Click outside handler
let clickOutsideHandler = null

function setupClickOutside() {
  // Remove existing handler if any
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler)
  }
  
  // Add new handler with delay to avoid immediate closure
  clickOutsideHandler = (event) => {
    if (containerRef.value && !containerRef.value.contains(event.target)) {
      // Small delay to ensure click events on dropdown items complete first
      setTimeout(() => {
        if (showDropdown.value) {
          showDropdown.value = false
        }
      }, 150)
    }
  }
  
  // Use setTimeout to avoid immediate trigger
  setTimeout(() => {
    document.addEventListener('click', clickOutsideHandler)
  }, 100)
}

// Close dropdown on escape key
let escapeHandler = null
onMounted(() => {
  escapeHandler = (e) => {
    if (e.key === 'Escape' && showDropdown.value) {
      closeDropdown()
    }
  }
  document.addEventListener('keydown', escapeHandler)
})

onUnmounted(() => {
  if (escapeHandler) {
    document.removeEventListener('keydown', escapeHandler)
  }
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler)
  }
})
</script>

<style scoped>
.language-switcher-btn {
  @apply flex items-center px-3 py-2 rounded-lg 
         bg-white dark:bg-gray-700 
         border border-gray-200 dark:border-gray-600
         text-gray-700 dark:text-gray-300
         hover:bg-primary-50 dark:hover:bg-gray-600
         hover:text-primary-600 dark:hover:text-primary-400
         hover:border-primary-300 dark:hover:border-primary-500
         transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
         min-w-[80px];
}

.language-switcher-btn-mobile {
  @apply flex items-center justify-center px-2.5 py-2 rounded-lg
         bg-white dark:bg-gray-700
         border border-gray-200 dark:border-gray-600
         text-gray-700 dark:text-gray-300
         hover:bg-primary-50 dark:hover:bg-gray-600
         hover:text-primary-600 dark:hover:text-primary-400
         transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-primary-500
         min-h-[40px];
}

.language-dropdown {
  @apply absolute top-full right-0 mt-2 w-48
         bg-white dark:bg-gray-800
         border border-gray-200 dark:border-gray-700
         rounded-lg shadow-lg
         py-2 z-50;
}

.language-option {
  @apply w-full flex items-center px-4 py-2.5
         text-gray-700 dark:text-gray-300
         hover:bg-primary-50 dark:hover:bg-gray-700
         hover:text-primary-600 dark:hover:text-primary-400
         transition-colors duration-150
         cursor-pointer
         text-sm;
}

.language-option-active {
  @apply bg-primary-50 dark:bg-primary-900/20
         text-primary-600 dark:text-primary-400
         font-semibold;
}
</style>
