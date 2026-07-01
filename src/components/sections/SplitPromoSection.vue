<template>
  <section class="split-promo-section" :id="id">
    <div class="split-promo-left">
      <img :src="leftImage" :alt="leftAlt" />
      <div class="split-promo-copy">
        <h2>{{ headline }}</h2>
        <a :href="ctaHref">{{ ctaText }}</a>
      </div>
    </div>

    <div class="split-promo-right">
      <img class="split-promo-product-img" :src="displayImage" :alt="product.title" />

      <div class="split-promo-product-copy">
        <div class="split-promo-stars" aria-label="5 star rating">
          <i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
        </div>
        <h3>{{ product.title }}</h3>
        <p>{{ description }}</p>

        <button type="button" @click="addProduct">
          Add To Cart
          <span v-if="product.old">{{ formatPrice(product.old) }}</span>
          <strong>{{ formatPrice(product.price) }}</strong>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  id: { type: String, default: 'home-accessories-promo' },
  leftImage: { type: String, required: true },
  leftAlt: { type: String, default: 'Lifestyle promotional image' },
  rightImage: { type: String, default: '' },
  product: { type: Object, required: true },
  headline: {
    type: String,
    default: 'Style your space with pieces that feel modern, useful and beautifully simple.',
  },
  description: {
    type: String,
    default: 'Premium daily essentials selected for a cleaner, more comfortable home.',
  },
  ctaText: { type: String, default: 'See Products' },
  ctaHref: { type: String, default: '#home-accessories' },
})

const emit = defineEmits(['add-to-cart'])

const displayImage = computed(() => props.rightImage || props.product.img)

const addProduct = () => {
  emit('add-to-cart', {
    product: {
      ...props.product,
      img: displayImage.value,
    },
    quantity: 1,
  })
}
</script>
