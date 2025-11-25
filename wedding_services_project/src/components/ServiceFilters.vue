<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('city') }}
      </label>
      <input
        v-model="localFilters.city"
        type="text"
        class="input-field"
        :placeholder="$t('city')"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('area') }}
      </label>
      <input
        v-model="localFilters.area"
        type="text"
        class="input-field"
        :placeholder="$t('area')"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('service_category') }}
      </label>
      <select v-model="localFilters.category" class="input-field">
        <option value="">{{ $t('all') }}</option>
        <option value="wedding-halls">{{ $t('wedding_halls') }}</option>
        <option value="photographers">{{ $t('photographers') }}</option>
        <option value="makeup-artists">{{ $t('makeup_artists') }}</option>
        <option value="djs">{{ $t('djs') }}</option>
        <option value="decoration">{{ $t('decoration') }}</option>
        <option value="other">{{ $t('other_services') }}</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('price_range') }}
      </label>
      <div class="flex gap-2">
        <input
          v-model.number="localFilters.price_min"
          type="number"
          class="input-field"
          :placeholder="$t('min')"
        />
        <input
          v-model.number="localFilters.price_max"
          type="number"
          class="input-field"
          :placeholder="$t('max')"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('date') }}
      </label>
      <input
        v-model="localFilters.date"
        type="date"
        class="input-field"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('rating') }}
      </label>
      <div class="relative">
        <select v-model="localFilters.rating" class="input-field">
          <option value="">{{ $t('all') }}</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {{ $t('capacity') }}
      </label>
      <input
        v-model.number="localFilters.capacity"
        type="number"
        class="input-field"
        :placeholder="$t('capacity')"
      />
    </div>

    <div class="flex gap-2">
      <button @click="applyFilters" class="btn-primary flex-1">
        {{ $t('apply_filters') }}
      </button>
      <button @click="clearFilters" class="btn-secondary">
        {{ $t('clear_filters') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['apply', 'clear'])

const localFilters = ref({
  city: '',
  area: '',
  category: '',
  price_min: '',
  price_max: '',
  date: '',
  rating: '',
  capacity: ''
})

function applyFilters() {
  emit('apply', { ...localFilters.value })
}

function clearFilters() {
  localFilters.value = {
    city: '',
    area: '',
    category: '',
    price_min: '',
    price_max: '',
    date: '',
    rating: '',
    capacity: ''
  }
  emit('clear')
}
</script>

