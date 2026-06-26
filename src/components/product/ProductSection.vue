<template>
  <section class="section-block product-grid-section" :id="id">
    <div class="container-fluid px-4 px-lg-5">
      <div class="section-head product-section-head">
        <div>
          <h2 class="section-title">{{ title }}</h2>
          <p class="section-sub">{{ subtitle }}</p>
        </div>
        <a href="#" class="view-link">View more <i class="fa-solid fa-arrow-right ms-1"></i></a>
      </div>

      <div class="chip-row product-chip-row">
        <button
          v-for="chip in chips"
          :key="chip"
          class="chip"
          :class="{ active: activeChip === chip }"
          type="button"
          @click="activeChip = chip"
        >
          {{ chip }}
        </button>
      </div>

      <div
        v-if="products.length"
        class="product-section-content"
        :class="{ 'has-side-promo': promoImage }"
      >
        <a
          v-if="promoImage"
          href="#"
          class="product-side-promo"
          :aria-label="promoAlt || title"
        >
          <img :src="promoImage" :alt="promoAlt || title" />
        </a>

        <div
          ref="carouselRef"
          class="product-carousel product-step-carousel"
          aria-label="Auto stepping product carousel"
          @mouseenter="pauseCarousel"
          @mouseleave="resumeCarousel"
          @focusin="pauseCarousel"
          @focusout="resumeCarousel"
        >
          <div
            ref="trackRef"
            class="products-grid product-section-grid product-carousel-track"
            :class="{ 'is-resetting': isResetting }"
            :style="trackStyle"
          >
            <ProductCard
              v-for="(product, index) in carouselProducts"
              :key="`${product.title}-${index}`"
              :product="product"
              :wishlist-items="wishlistItems"
              :cart-quantity="cartQuantities[product.title] || 0"
              @add-to-cart="$emit('add-to-cart', $event)"
              @update-cart-quantity="$emit('update-cart-quantity', $event)"
              @quick-view="$emit('quick-view', $event)"
              @add-wishlist="$emit('add-wishlist', $event)"
            />
          </div>
        </div>
      </div>

      <div v-else class="empty-results">No products found.</div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  id: { type: String, default: undefined },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  chips: { type: Array, required: true },
  products: { type: Array, required: true },
  promoImage: { type: String, default: '' },
  promoAlt: { type: String, default: '' },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantities: { type: Object, default: () => ({}) },
})

defineEmits(['add-to-cart', 'update-cart-quantity', 'quick-view', 'add-wishlist'])

const activeChip = ref(props.chips[0])
const carouselProducts = computed(() => [...props.products, ...props.products, ...props.products])
const carouselRef = ref(null)
const trackRef = ref(null)
const stepIndex = ref(0)
const stepSize = ref(0)
const isResetting = ref(false)
let stepTimer = null
let resetTimer = null
let isCarouselPaused = false

const trackStyle = computed(() => ({
  '--lk-carousel-x': `-${stepIndex.value * stepSize.value}px`,
}))

const measureStepSize = () => {
  const card = trackRef.value?.querySelector('.product-card')
  const track = trackRef.value

  if (!card || !track) {
    stepSize.value = 0
    return
  }

  const trackStyles = window.getComputedStyle(track)
  const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 24
  const cardWidth = card.getBoundingClientRect().width

  stepSize.value = Math.round(cardWidth + gap)
}

const hardResetToStart = () => {
  isResetting.value = true
  stepIndex.value = 0

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isResetting.value = false
    })
  })
}

const moveOneCard = () => {
  const totalProducts = props.products.length

  if (!totalProducts) return

  if (!stepSize.value) {
    measureStepSize()
  }

  if (!stepSize.value) return

  clearTimeout(resetTimer)

  stepIndex.value += 1

  if (stepIndex.value >= totalProducts) {
    resetTimer = setTimeout(hardResetToStart, 760)
  }
}

const startCarousel = () => {
  clearInterval(stepTimer)
  stepTimer = null

  if (isCarouselPaused || props.products.length < 2) return

  stepTimer = setInterval(moveOneCard, 2300)
}

const pauseCarousel = () => {
  isCarouselPaused = true
  clearInterval(stepTimer)
  stepTimer = null
}

const resumeCarousel = () => {
  isCarouselPaused = false
  startCarousel()
}

const resetCarousel = () => {
  clearInterval(stepTimer)
  clearTimeout(resetTimer)
  stepIndex.value = 0
  isResetting.value = false

  nextTick(() => {
    measureStepSize()
    startCarousel()
  })
}

const handleResize = () => {
  measureStepSize()
}

onMounted(() => {
  nextTick(resetCarousel)
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  clearInterval(stepTimer)
  clearTimeout(resetTimer)
  window.removeEventListener('resize', handleResize)
})

watch(() => props.products, () => {
  nextTick(resetCarousel)
})
</script>
