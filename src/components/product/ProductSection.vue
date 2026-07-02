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
        v-if="displayedProducts.length"
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
          class="product-static-grid-wrap"
          aria-label="Product grid"
        >
          <div
            class="products-grid product-section-grid product-static-grid"
          >
            <ProductCard
              v-for="product in displayedProducts"
              :key="product.title"
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
import { computed, ref, watch } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  id: { type: String, default: undefined },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  chips: { type: Array, required: true },
  products: { type: Array, required: true },
  productGroups: { type: Object, default: null },
  promoImage: { type: String, default: '' },
  promoAlt: { type: String, default: '' },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantities: { type: Object, default: () => ({}) },
})

defineEmits(['add-to-cart', 'update-cart-quantity', 'quick-view', 'add-wishlist'])

const activeChip = ref(props.chips[0])

const displayedProducts = computed(() => {
  const groupedProducts = props.productGroups?.[activeChip.value]

  return Array.isArray(groupedProducts) ? groupedProducts : props.products
})

watch(() => props.chips, (chips) => {
  if (!chips.includes(activeChip.value)) {
    activeChip.value = chips[0]
  }
})
</script>
