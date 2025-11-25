<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="servicesStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="servicesStore.currentService" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Image Gallery -->
        <div class="card">
          <div v-if="servicesStore.currentService.images && servicesStore.currentService.images.length > 0" class="grid grid-cols-2 gap-2">
            <img
              v-for="(image, index) in servicesStore.currentService.images"
              :key="index"
              :src="image"
              :alt="servicesStore.currentService.title"
              class="w-full h-64 object-cover rounded-lg cursor-pointer"
              @click="selectedImage = image"
            />
          </div>
          <div v-else class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="image" class="text-4xl text-gray-400" />
          </div>
        </div>

        <!-- Description -->
        <div class="card">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ $t('description') }}</h2>
          <p class="text-gray-700 dark:text-gray-300">{{ servicesStore.currentService.description }}</p>
        </div>

        <!-- Features -->
        <div v-if="servicesStore.currentService.features" class="card">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ $t('features') }}</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li v-for="(feature, index) in servicesStore.currentService.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- Reviews -->
        <div class="card">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ $t('reviews') }}</h2>
          <div v-if="reviews.length === 0" class="text-gray-500 dark:text-gray-400">
            {{ $t('no_reviews') }}
          </div>
          <div v-else class="space-y-4">
            <div v-for="review in reviews" :key="review.id" class="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-semibold">{{ review.user?.name }}</span>
                  <div class="flex gap-0.5">
                    <font-awesome-icon
                      v-for="i in 5"
                      :key="i"
                      :icon="i <= review.rating ? 'star' : ['far', 'star']"
                      class="text-yellow-500 text-sm"
                    />
                  </div>
                </div>
                <span class="text-sm text-gray-500">{{ formatDate(review.created_at) }}</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Booking Card -->
        <div class="card sticky top-20">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {{ servicesStore.currentService.title }}
          </h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('price') }}</span>
              <span class="text-3xl font-bold text-primary-600">${{ servicesStore.currentService.price }}</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="star" class="text-yellow-500" />
              <span class="font-medium">{{ servicesStore.currentService.rating || '0.0' }}</span>
              <span class="text-gray-500">({{ servicesStore.currentService.reviews_count || 0 }})</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <font-awesome-icon icon="map-marker-alt" class="text-xs" />
              <span>{{ servicesStore.currentService.address }}</span>
            </div>

            <div v-if="authStore.isAuthenticated">
              <input
                v-model="bookingDate"
                type="date"
                class="input-field mb-4"
                :min="new Date().toISOString().split('T')[0]"
              />
              <textarea
                v-model="bookingMessage"
                :placeholder="$t('message')"
                class="input-field mb-4"
                rows="3"
              ></textarea>
              <button @click="handleBooking" class="btn-primary w-full mb-2">
                {{ $t('send_booking_request') }}
              </button>
              <button
                @click="toggleWishlist"
                class="btn-secondary w-full"
              >
                {{ isInWishlist ? $t('remove_from_wishlist') : $t('add_to_wishlist') }}
              </button>
            </div>
            <RouterLink v-else to="/login" class="btn-primary w-full block text-center">
              {{ $t('login_to_book') }}
            </RouterLink>
          </div>
        </div>

        <!-- Vendor Info -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('vendor') }}</h3>
          <div v-if="servicesStore.currentService.vendor">
            <p class="font-medium">{{ servicesStore.currentService.vendor.business_name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ servicesStore.currentService.vendor.city }}</p>
          </div>
        </div>

        <!-- Map -->
        <div v-if="servicesStore.currentService.lat && servicesStore.currentService.lng" class="card p-0">
          <div class="h-64 rounded-lg overflow-hidden">
            <ServiceMap
              :lat="servicesStore.currentService.lat"
              :lng="servicesStore.currentService.lng"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Image Modal -->
  <div
    v-if="selectedImage"
    @click="selectedImage = null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
  >
    <img :src="selectedImage" class="max-w-4xl max-h-full" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServicesStore } from '../stores/services'
import { useAuthStore } from '../stores/auth'
import { useBookingsStore } from '../stores/bookings'
import { useWishlistStore } from '../stores/wishlist'
import ServiceMap from '../components/ServiceMap.vue'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()
const wishlistStore = useWishlistStore()

const bookingDate = ref('')
const bookingMessage = ref('')
const selectedImage = ref(null)
const reviews = ref([])

const isInWishlist = computed(() => wishlistStore.isInWishlist(route.params.id))

onMounted(async () => {
  await servicesStore.fetchService(route.params.id)
  if (authStore.isAuthenticated) {
    await wishlistStore.fetchWishlist()
  }
  // Fetch reviews
  // await fetchReviews()
})

async function handleBooking() {
  if (!bookingDate.value) {
    alert('Please select a date')
    return
  }
  const result = await bookingsStore.createBooking({
    service_id: route.params.id,
    date: bookingDate.value,
    message: bookingMessage.value
  })
  if (result.success) {
    alert('Booking request sent successfully!')
    bookingDate.value = ''
    bookingMessage.value = ''
  } else {
    alert(result.message)
  }
}

async function toggleWishlist() {
  if (isInWishlist.value) {
    await wishlistStore.removeFromWishlist(route.params.id)
  } else {
    await wishlistStore.addToWishlist(route.params.id)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
</script>

