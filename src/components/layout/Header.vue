<template>
  <header class="main-header">
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="brand" href="#" aria-label="ZappyMart home" @click.prevent="$emit('go-home')">
          <img class="brand-logo" :src="logoUrl" alt="ZappyMart" />
        </a>

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
          <button
            class="header-icon"
            type="button"
            aria-label="Open wishlist"
            :aria-expanded="wishlistOpen"
            @click="$emit('open-wishlist')"
          >
            <i :class="wishlistCount ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
            <span v-if="wishlistCount" class="wishlist-count">{{ wishlistCount }}</span>
          </button>

          <button class="header-icon" type="button" aria-label="Open customer profile" @click="$emit('open-profile')">
            <i class="fa-regular fa-user"></i>
          </button>

          <button class="header-icon" type="button" aria-label="Open shopping cart" @click="$emit('open-cart')">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-count">{{ cartCount }}</span>
          </button>
        </div>
      </div>
    </nav>

    <nav class="category-strip site-menu-strip header-site-menu" aria-label="Main website menu">
      <div class="category-track site-menu-track">
        <a
          v-for="item in menuItems"
          :key="item.label"
          class="site-menu-link"
          :class="{ 'is-active': isMenuItemActive(item) }"
          :href="item.href"
          @click.prevent="handleMenuClick(item)"
        >
          <i v-if="item.icon" :class="item.icon" aria-hidden="true"></i>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import logoUrl from '../../assets/ZappyMart Logo.svg'

const props = defineProps({
  searchTerm: { type: String, required: true },
  cartCount: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
  wishlistOpen: { type: Boolean, default: false },
  activePage: { type: String, default: 'store' },
})

const emit = defineEmits([
  'update:searchTerm',
  'open-cart',
  'open-wishlist',
  'go-home',
  'open-shop',
  'navigate-section',
  'open-profile',
])

const menuItems = [
  { label: 'Home', href: '#', action: 'home' },
  { label: 'Shop', href: '?page=shop', action: 'shop' },
  { label: 'Mega Sale', href: '#mega-sale', action: 'section' },
  { label: 'Recommendation', href: '#deals', action: 'section' },
  { label: 'Electronics', href: '#electronics', action: 'section' },
  { label: 'Featured Products', href: '#featured-banners', action: 'section' },
  { label: 'Home Accessories', href: '#home-accessories', action: 'section' },
  { label: 'Best Deals', href: '#best-week', action: 'section' },
]

const isMenuItemActive = (item) => {
  if (item.action === 'shop') return props.activePage === 'shop'
  if (item.action === 'home') return props.activePage === 'store'
  return false
}

const handleMenuClick = (item) => {
  if (item.action === 'shop') {
    emit('open-shop')
    return
  }

  if (item.action === 'home') {
    emit('go-home')
    return
  }

  emit('navigate-section', item.href)
}
</script>
