<template>
  <section class="skin-care-inline-products" id="skin-care-products">
    <div class="container-fluid px-4 px-lg-5">
      <div class="skin-care-box">
        <div class="skin-care-box-head">
          <a href="#skin-care-products" class="view-link">
            View all <i class="fa-solid fa-arrow-right ms-1"></i>
          </a>
        </div>

        <div class="products-grid product-section-grid skin-care-product-grid">
          <ProductCard
            v-for="product in products"
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
  </section>
</template>

<script setup>
import ProductCard from '@/components/product/ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantities: { type: Object, default: () => ({}) },
})

defineEmits(['add-to-cart', 'update-cart-quantity', 'quick-view', 'add-wishlist'])
</script>
