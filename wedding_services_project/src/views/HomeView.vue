<template>
  <div>
    <!-- Hero Section -->
    <section class="relative hero-gradient text-white py-20 md:py-32 overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-6">
            <font-awesome-icon icon="heart" class="text-6xl md:text-8xl text-white opacity-20 mb-4" />
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-balance">
            {{ $t('find_perfect_wedding_service') }}
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-primary-100 max-w-2xl mx-auto">
            {{ $t('search_placeholder') }}
          </p>
          <div class="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 md:py-24 bg-cream-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title">
          {{ $t('categories') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
            @click="goToCategory(category.slug)"
          />
        </div>
      </div>
    </section>

    <!-- Featured Vendors Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 class="section-title mb-4 md:mb-0">
            {{ $t('featured_vendors') }}
          </h2>
          <RouterLink
            to="/services"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold flex items-center gap-2 group"
          >
            {{ $t('view_all') }}
            <font-awesome-icon icon="chevron-right" class="group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>
        <div v-if="servicesStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            v-for="service in servicesStore.featuredServices"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Top Rated Section -->
    <section class="py-12 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ $t('top_rated') }}
          </h2>
          <RouterLink
            to="/services"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          >
            {{ $t('view_all') }} →
          </RouterLink>
        </div>
        <div v-if="servicesStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            v-for="service in servicesStore.topRatedServices"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useServicesStore } from '../stores/services'
import SearchBar from '../components/SearchBar.vue'
import CategoryCard from '../components/CategoryCard.vue'
import ServiceCard from '../components/ServiceCard.vue'

const router = useRouter()
const servicesStore = useServicesStore()

const categories = [
  { id: 1, name: 'Wedding Halls', slug: 'wedding-halls', icon: 'building' },
  { id: 2, name: 'Photographers', slug: 'photographers', icon: 'camera' },
  { id: 3, name: 'Makeup Artists', slug: 'makeup-artists', icon: 'spray-can' },
  { id: 4, name: 'DJs', slug: 'djs', icon: 'music' },
  { id: 5, name: 'Decoration', slug: 'decoration', icon: 'palette' },
  { id: 6, name: 'Other Services', slug: 'other', icon: 'star' }
]

onMounted(async () => {
  await servicesStore.fetchFeaturedServices()
  await servicesStore.fetchTopRatedServices()
})

function goToCategory(slug) {
  router.push({ name: 'services', query: { category: slug } })
}
</script>
