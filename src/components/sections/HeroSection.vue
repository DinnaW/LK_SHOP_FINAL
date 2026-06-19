<template>
  <section class="hero-section">
    <div class="hero-full-banner">
      <img class="hero-static-img" :src="image" alt="Premium electronics mega banner" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
})
</script>
