<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ $t('my_wishlist') }}</h1>

    <div v-if="wishlistStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="wishlistStore.wishlist.length === 0" class="text-center py-12 text-gray-500">
      {{ $t('wishlist_empty') }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ServiceCard
        v-for="item in wishlistStore.wishlist"
        :key="item.id || item.service_id"
        :service="item.service || item"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWishlistStore } from '../../stores/wishlist'
import ServiceCard from '../../components/ServiceCard.vue'

const wishlistStore = useWishlistStore()

onMounted(async () => {
  await wishlistStore.fetchWishlist()
})
</script>

