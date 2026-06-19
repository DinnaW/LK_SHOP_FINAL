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

      <div class="home-accessories-layout">
        <aside class="home-accessories-category-card">
          <img class="home-accessories-bg" :src="featureImage" alt="Home accessories background" />
          <div class="home-accessories-overlay"></div>

          <div class="home-accessories-category-content premium-filter-card">
            <div class="home-filter-topbar">
              <span class="home-filter-brand">LK Shop</span>
              <span class="home-filter-menu"><i class="fa-solid fa-grip-lines"></i></span>
            </div>

            <div class="home-filter-copy">
              <span>Home Accessories</span>
              <h3>Design Your Living Space</h3>
              <p>Choose a category and discover refined pieces for every corner.</p>
            </div>

            <div class="home-filter-visual-wrap">
              <img class="home-filter-visual" :src="visualImage" alt="Premium home accessories visual" />
            </div>

            <div class="home-accessories-tabs premium-filter-tabs">
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
          </div>
        </aside>

        <div class="home-accessories-products product-section-grid">
          <ProductCard
            v-for="product in products"
            :key="product.title"
            class="home-accessory-product-card"
            :product="product"
            :wishlist-items="wishlistItems"
            @add-to-cart="$emit('add-to-cart', $event)"
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
  featureImage: { type: String, required: true },
  visualImage: { type: String, required: true },
})

defineEmits(['update:activeCategory', 'add-to-cart', 'quick-view', 'add-wishlist'])
</script>
