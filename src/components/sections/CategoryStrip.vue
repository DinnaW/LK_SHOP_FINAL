<template>
  <div class="category-strip">
    <div class="category-track">
      <template v-for="round in 2" :key="round">
        <template v-for="category in categories" :key="`${round}-${category}`">
          <span>{{ category }}</span>
          <span>|</span>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
})
</script>
