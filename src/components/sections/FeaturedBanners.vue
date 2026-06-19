<template>
  <section class="feature-showcase-section" id="featured-banners">
    <div class="container-fluid px-4 px-lg-5">
      <div class="section-head product-section-head feature-showcase-head">
        <div>
          <h2 class="section-title">Featured Products</h2>
          <p class="section-sub">Premium collections and highlight banners selected for you.</p>
        </div>

        <a href="#deals" class="view-link">
          View all <i class="fa-solid fa-arrow-right ms-1"></i>
        </a>
      </div>

      <div class="feature-showcase-grid">
        <article
          v-for="item in banners"
          :key="item.title"
          class="feature-showcase-card"
          :class="item.className"
        >
          <img :src="item.img" :alt="item.title" />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  banners: {
    type: Array,
    required: true,
  },
})
</script>
