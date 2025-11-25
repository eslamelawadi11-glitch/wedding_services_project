<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const props = defineProps({
  services: {
    type: Array,
    default: () => []
  }
})

const mapContainer = ref(null)
let map = null

onMounted(() => {
  // Initialize map - you'll need to set your Mapbox token
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'your-mapbox-token-here'
  
  if (mapContainer.value) {
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [0, 0], // Default center
      zoom: 2
    })

    // Add markers when services change
    watch(() => props.services, updateMarkers, { immediate: true })
  }
})

function updateMarkers() {
  if (!map || !props.services.length) return

  // Clear existing markers
  const markers = document.querySelectorAll('.mapboxgl-marker')
  markers.forEach(marker => marker.remove())

  // Add new markers
  props.services.forEach(service => {
    if (service.lat && service.lng) {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${service.title}</h3>
            <p class="text-sm text-gray-600">${service.price}$</p>
            <a href="/services/${service.id}" class="text-primary-600 text-sm">View Details</a>
          </div>
        `)

      new mapboxgl.Marker()
        .setLngLat([service.lng, service.lat])
        .setPopup(popup)
        .addTo(map)
    }
  })

  // Fit map to bounds
  if (props.services.length > 0) {
    const bounds = new mapboxgl.LngLatBounds()
    props.services.forEach(service => {
      if (service.lat && service.lng) {
        bounds.extend([service.lng, service.lat])
      }
    })
    map.fitBounds(bounds, { padding: 50 })
  }
}
</script>

