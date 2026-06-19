<template>
  <header class="main-header">
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="brand" href="#">lksh<span>o</span>p</a>

        <div class="search-box mx-lg-auto">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            :value="searchTerm"
            type="text"
            placeholder="Search for products, brands and categories..."
            @input="$emit('update:searchTerm', $event.target.value)"
          />
        </div>

        <div class="d-flex align-items-center gap-2 ms-lg-4">
          <button class="header-icon d-none d-md-grid" type="button" aria-label="Wishlist">
            <i class="fa-regular fa-heart"></i>
            <span v-if="wishlistCount" class="wishlist-count">{{ wishlistCount }}</span>
          </button>

          <button class="header-icon d-none d-md-grid" type="button">
            <i class="fa-regular fa-user"></i>
          </button>

          <button class="header-icon" type="button" @click="$emit('open-cart')">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-count">{{ cartCount }}</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
defineProps({
  searchTerm: { type: String, required: true },
  cartCount: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
})

defineEmits(['update:searchTerm', 'open-cart'])
</script>
