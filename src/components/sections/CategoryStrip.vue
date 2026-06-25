<template>
  <nav class="category-strip" aria-label="Main product categories">
    <button class="category-menu-trigger" type="button">
      Categories <i class="fa-solid fa-chevron-down"></i>
    </button>

    <div class="category-track">
      <a v-for="category in categories" :key="category.label" :href="category.href">
        {{ category.label }}
      </a>
    </div>

    <div class="category-nav-arrows" aria-hidden="true">
      <span><i class="fa-solid fa-chevron-left"></i></span>
      <span><i class="fa-solid fa-chevron-right"></i></span>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
})
</script>
