<template>
  <section class="home-accessories-image-banner-section" :id="id">
    <img class="home-accessories-image-banner-img" :src="image" :alt="alt" />
  </section>
</template>

<script setup>
defineProps({
  id: { type: String, default: undefined },
  image: { type: String, required: true },
  alt: { type: String, default: 'Promotional banner' },
})
</script>
