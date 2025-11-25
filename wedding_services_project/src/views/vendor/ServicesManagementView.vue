<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('my_services') }}</h1>
      <button @click="showModal = true" class="btn-primary">
        {{ $t('add_service') }}
      </button>
    </div>

    <div v-if="servicesStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="service in servicesStore.services"
        :key="service.id"
        class="card hover:shadow-lg transition-shadow"
      >
        <img
          v-if="service.images && service.images.length > 0"
          :src="service.images[0]"
          :alt="service.title"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">{{ service.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ service.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold text-primary-600">${{ service.price }}</span>
          <div class="flex gap-2">
            <button @click="editService(service)" class="btn-secondary text-sm">{{ $t('edit') }}</button>
            <button @click="deleteService(service.id)" class="btn-secondary text-sm text-red-600">{{ $t('delete') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Service Modal -->
    <div
      v-if="showModal"
      @click.self="closeModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {{ editingService ? $t('edit_service') : $t('add_service') }}
          </h2>
          <ServiceForm
            :service="editingService"
            @save="handleSave"
            @cancel="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServicesStore } from '../../stores/services'
import ServiceForm from '../../components/vendor/ServiceForm.vue'

const servicesStore = useServicesStore()
const showModal = ref(false)
const editingService = ref(null)

onMounted(async () => {
  await servicesStore.fetchServices({ vendor: true })
})

function editService(service) {
  editingService.value = service
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingService.value = null
}

async function handleSave(serviceData) {
  let result
  if (editingService.value) {
    result = await servicesStore.updateService(editingService.value.id, serviceData)
  } else {
    result = await servicesStore.createService(serviceData)
  }
  if (result.success) {
    await servicesStore.fetchServices({ vendor: true })
    closeModal()
  } else {
    alert(result.message)
  }
}

async function deleteService(id) {
  if (confirm('Are you sure you want to delete this service?')) {
    const result = await servicesStore.deleteService(id)
    if (result.success) {
      await servicesStore.fetchServices({ vendor: true })
    } else {
      alert(result.message)
    }
  }
}
</script>

