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

      <div v-if="products.length" class="products-grid product-section-grid">
        <ProductCard
          v-for="product in products"
          :key="product.title"
          :product="product"
          :wishlist-items="wishlistItems"
          @add-to-cart="$emit('add-to-cart', $event)"
          @quick-view="$emit('quick-view', $event)"
          @add-wishlist="$emit('add-wishlist', $event)"
        />
      </div>

      <div v-else class="empty-results">No products found.</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  id: { type: String, default: undefined },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  chips: { type: Array, required: true },
  products: { type: Array, required: true },
  wishlistItems: { type: Array, default: () => [] },
})

defineEmits(['add-to-cart', 'quick-view', 'add-wishlist'])

const activeChip = ref(props.chips[0])
</script>
