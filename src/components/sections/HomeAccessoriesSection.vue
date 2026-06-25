<template>
  <section class="section-block product-grid-section home-accessories-section" id="home-accessories">
    <div class="container-fluid px-4 px-lg-5">
      <div class="section-head product-section-head home-accessories-head">
        <div>
          <span class="section-kicker">Curated home living</span>
          <h2 class="section-title">Home Accessories</h2>
          <p class="section-sub">Premium decor, lighting and everyday accents for modern homes.</p>
        </div>
        <a href="#home-accessories" class="view-link">View more <i class="fa-solid fa-arrow-right ms-1"></i></a>
      </div>

      <div class="home-accessories-category-nav" aria-label="Home accessory categories">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="{ active: activeCategory === category }"
          @click="$emit('update:activeCategory', category)"
        >
          {{ category }}
        </button>
      </div>

      <div class="home-accessories-layout">
        <div class="home-accessories-products product-section-grid">
          <ProductCard
            v-for="product in products.slice(0, 5)"
            :key="product.title"
            class="home-accessory-product-card"
            :product="product"
            :wishlist-items="wishlistItems"
            :cart-quantity="cartQuantities[product.title] || 0"
            @add-to-cart="$emit('add-to-cart', $event)"
            @update-cart-quantity="$emit('update-cart-quantity', $event)"
            @quick-view="$emit('quick-view', $event)"
            @add-wishlist="$emit('add-wishlist', $event)"
          />

          <ProductCard
            v-if="products[5]"
            class="home-accessory-product-card"
            :product="products[5]"
            :wishlist-items="wishlistItems"
            :cart-quantity="cartQuantities[products[5].title] || 0"
            @add-to-cart="$emit('add-to-cart', $event)"
            @update-cart-quantity="$emit('update-cart-quantity', $event)"
            @quick-view="$emit('quick-view', $event)"
            @add-wishlist="$emit('add-wishlist', $event)"
          />

          <div class="home-accessories-middle-banner">
            <img :src="featureImage" alt="Home accessories promotion" />
          </div>

          <ProductCard
            v-if="products[6]"
            class="home-accessory-product-card"
            :product="products[6]"
            :wishlist-items="wishlistItems"
            :cart-quantity="cartQuantities[products[6].title] || 0"
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
  categories: { type: Array, required: true },
  activeCategory: { type: String, required: true },
  products: { type: Array, required: true },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantities: { type: Object, default: () => ({}) },
  featureImage: { type: String, required: true },
  visualImage: { type: String, required: true },
})

defineEmits(['update:activeCategory', 'add-to-cart', 'update-cart-quantity', 'quick-view', 'add-wishlist'])
</script>
