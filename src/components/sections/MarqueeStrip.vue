<template>
  <div class="hero-marquee-strip" aria-label="Featured categories">
    <div class="hero-marquee-track">
      <template v-for="round in 2" :key="round">
        <template v-for="category in categories" :key="`${round}-${category}`">
          <span>{{ category }}</span>
          <i class="fa-solid fa-circle"></i>
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
