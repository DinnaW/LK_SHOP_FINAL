<template>
  <section class="hero-section">
    <div class="hero-full-banner">
      <img
        v-for="(slide, index) in images"
        :key="slide"
        class="hero-static-img hero-carousel-img"
        :class="{ active: index === activeSlide }"
        :src="slide"
        :alt="`LK Shop hero banner ${index + 1}`"
      />
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
})

const activeSlide = ref(0)
let heroTimer = null

const startHeroCarousel = () => {
  if (props.images.length <= 1) return

  heroTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % props.images.length
  }, 4200)
}

onMounted(startHeroCarousel)

onBeforeUnmount(() => {
  clearInterval(heroTimer)
})
</script>
