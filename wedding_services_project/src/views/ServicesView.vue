<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters Sidebar -->
      <aside class="w-full md:w-64 flex-shrink-0">
        <div class="card sticky top-20">
          <h3 class="text-lg font-semibold mb-4">{{ $t('filters') }}</h3>
          <ServiceFilters @apply="handleFilter" @clear="handleClearFilters" />
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ $t('services') }}
          </h1>
          <div class="flex gap-2">
            <button
              @click="viewMode = 'list'"
              :class="['px-4 py-2 rounded-lg', viewMode === 'list' ? 'btn-primary' : 'btn-secondary']"
            >
              {{ $t('list_view') }}
            </button>
            <button
              @click="viewMode = 'map'"
              :class="['px-4 py-2 rounded-lg', viewMode === 'map' ? 'btn-primary' : 'btn-secondary']"
            >
              {{ $t('map_view') }}
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="servicesStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <!-- List View -->
        <div v-else-if="viewMode === 'list'">
          <div v-if="servicesStore.services.length === 0" class="text-center py-12">
            <p class="text-gray-500 dark:text-gray-400 text-lg">{{ $t('no_results') }}</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in servicesStore.services"
              :key="service.id"
              :service="service"
            />
          </div>
        </div>

        <!-- Map View -->
        <div v-else class="h-[600px] rounded-lg overflow-hidden">
          <ServicesMap :services="servicesStore.services" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useServicesStore } from '../stores/services'
import ServiceCard from '../components/ServiceCard.vue'
import ServiceFilters from '../components/ServiceFilters.vue'
import ServicesMap from '../components/ServicesMap.vue'

const route = useRoute()
const servicesStore = useServicesStore()
const viewMode = ref('list')

onMounted(async () => {
  await fetchServices()
})

watch(() => route.query, async () => {
  await fetchServices()
}, { deep: true })

async function fetchServices() {
  const params = {
    ...route.query,
    ...servicesStore.filters
  }
  await servicesStore.fetchServices(params)
}

function handleFilter(filters) {
  servicesStore.setFilters(filters)
  fetchServices()
}

function handleClearFilters() {
  servicesStore.clearFilters()
  fetchServices()
}
</script>

