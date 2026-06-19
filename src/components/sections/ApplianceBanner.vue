<template>
  <section class="appliance-banner-section" id="home-appliances">
    <img class="appliance-full-banner-img" :src="image" alt="Home appliances promotional banner" />
  </section>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
})
</script>
