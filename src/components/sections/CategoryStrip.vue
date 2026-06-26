<template>
  <nav class="category-strip site-menu-strip" aria-label="Main website menu">
    <div class="category-track site-menu-track">
      <a v-for="item in menuItems" :key="item.label" :href="item.href">
        {{ item.label }}
      </a>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
})

const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'Mega Sale', href: '#mega-sale' },
  { label: 'Recommendation', href: '#deals' },
  { label: 'Electronics', href: '#electronics' },
  { label: 'Featured Products', href: '#featured-banners' },
  { label: 'Home Accessories', href: '#home-accessories' },
  { label: 'Best Deals', href: '#best-week' },
]
</script>
