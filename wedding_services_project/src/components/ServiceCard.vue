<template>
  <div class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer" @click="goToDetails">
    <div class="relative h-48 mb-4 rounded-lg overflow-hidden">
      <img
        v-if="service.images && service.images.length > 0"
        :src="service.images[0]"
        :alt="service.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="image" class="text-4xl text-gray-400" />
      </div>
      <div class="absolute top-2 right-2">
        <button
          v-if="authStore.isAuthenticated"
          @click.stop="toggleWishlist"
          class="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :title="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
        >
          <font-awesome-icon 
            :icon="isInWishlist ? 'heart' : ['far', 'heart']" 
            :class="isInWishlist ? 'text-red-500' : 'text-gray-400'"
          />
        </button>
      </div>
    </div>
    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ service.title }}</h3>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{{ service.description }}</p>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <font-awesome-icon icon="star" class="text-yellow-500 text-sm" />
        <span class="text-sm font-medium">{{ service.rating || '0.0' }}</span>
        <span class="text-sm text-gray-500">({{ service.reviews_count || 0 }})</span>
      </div>
      <div class="text-lg font-bold text-primary-600">
        ${{ service.price }}
      </div>
    </div>
    <div class="mt-2 text-sm text-gray-500 flex items-center gap-1">
      <font-awesome-icon icon="map-marker-alt" class="text-xs" />
      <span>{{ service.address || service.city }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useWishlistStore } from '../stores/wishlist'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.service.id))

function goToDetails() {
  router.push({ name: 'service-details', params: { id: props.service.id } })
}

async function toggleWishlist() {
  if (isInWishlist.value) {
    await wishlistStore.removeFromWishlist(props.service.id)
  } else {
    await wishlistStore.addToWishlist(props.service.id)
  }
}
</script>

