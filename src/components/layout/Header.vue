<template>
  <header class="main-header zm-dual-header">
    <nav class="zm-topbar" aria-label="Store tools">
      <div class="zm-header-layout">
        <!-- TWO LOGOS -->
        <div class="zm-logo-group">
          <a
            class="zm-primary-brand"
            href="#"
            aria-label="ZappyMart home"
            @click.prevent="emit('go-home')"
          >
            <img class="zm-primary-logo" :src="logoUrl" alt="ZappyMart" />
          </a>
          <div class="zm-secondary-brand">
            <img
              class="zm-secondary-logo"
              :src="secondLogoUrl"
              :alt="secondLogoAlt"
            />
          </div>
        </div>

        <!-- SMALLER SEARCH BAR -->
        <div class="zm-header-search">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input
            :value="searchTerm"
            type="text"
            aria-label="Search products"
            placeholder="Search for products, brands and categories..."
            @input="handleSearchInput"
          />
        </div>

        <!-- HEADER ACTIONS -->
        <div class="zm-header-actions">
          <button
            class="zm-header-action"
            type="button"
            aria-label="Open wishlist"
            :aria-expanded="wishlistOpen"
            @click="emit('open-wishlist')"
          >
            <i
              :class="wishlistCount ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
              aria-hidden="true"
            ></i>
            <span v-if="wishlistCount" class="zm-header-count zm-wishlist-count">
              {{ wishlistCount }}
            </span>
          </button>
          <button
            class="zm-header-action"
            type="button"
            aria-label="Open customer profile"
            @click="emit('open-profile')"
          >
            <i class="fa-regular fa-user" aria-hidden="true"></i>
          </button>
          <button
            class="zm-header-action"
            type="button"
            aria-label="Open shopping cart"
            @click="emit('open-cart')"
          >
            <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
            <span class="zm-header-count zm-cart-count">{{ cartCount }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- EXISTING WEBSITE MENU -->
    <nav
      class="category-strip site-menu-strip header-site-menu"
      aria-label="Main website menu"
    >
      <div class="category-track site-menu-track">
        <a
          v-for="item in menuItems"
          :key="item.label"
          class="site-menu-link"
          :class="{ 'is-active': isMenuItemActive(item) }"
          :href="item.href"
          @click.prevent="handleMenuClick(item)"
        >
          <span>{{ item.label }}</span>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import logoUrl from '../../assets/ZappyMart-Logo.png'
// Replace second-logo.png with your second logo's exact filename.
import secondLogoUrl from '../../assets/second-logo.png'

const props = defineProps({
  searchTerm: { type: String, required: true },
  cartCount: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
  wishlistOpen: { type: Boolean, default: false },
  activePage: { type: String, default: 'store' },
  secondLogoAlt: { type: String, default: 'Partner logo' },
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

function handleSearchInput(event) {
  if (event.target instanceof HTMLInputElement) {
    emit('update:searchTerm', event.target.value)
  }
}

function isMenuItemActive(item) {
  if (item.action === 'shop') return props.activePage === 'shop'
  if (item.action === 'home') return props.activePage === 'store'
  return false
}

function handleMenuClick(item) {
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

<style scoped>
/* Dedicated classes avoid the old global header !important overrides. */
.zm-dual-header {
  width: 100%;
  background: #fff;
}
.zm-dual-header *,
.zm-dual-header *::before,
.zm-dual-header *::after {
  box-sizing: border-box;
}
.zm-topbar {
  position: relative;
  z-index: 2;
  padding: 14px 0;
  background: #fff;
}
.zm-header-layout {
  width: 100%;
  min-height: 64px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 24px;
  padding: 0 clamp(24px, 3vw, 48px);
}
.zm-logo-group {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
}
.zm-primary-brand,
.zm-secondary-brand {
  display: flex;
  align-items: center;
  min-width: 0;
  text-decoration: none;
}
.zm-primary-brand {
  width: 230px;
}
.zm-secondary-brand {
  width: 330px;
}
.zm-primary-logo,
.zm-secondary-logo {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  object-position: left center;
}
.zm-secondary-logo {
  max-height: 170px;
  object-position: center;
}
.zm-header-search {
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  justify-self: center;
}
.zm-header-search input {
  display: block;
  width: 100%;
  min-width: 0;
  height: 48px;
  padding: 0 18px 0 46px;
  border: 1px solid #e8edf4;
  border-radius: 999px;
  background: #f6f8fb;
  color: #151922;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
}
.zm-header-search input:focus {
  border-color: #083d77;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(8, 61, 119, 0.08);
}
.zm-header-search > i {
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}
.zm-header-actions {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.zm-header-action {
  position: relative;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 43px;
  height: 43px;
  padding: 0;
  border: 1px solid #e8edf4;
  border-radius: 50%;
  background: #fff;
  color: #083d77;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.25s, color 0.25s, transform 0.25s;
}
.zm-header-action:hover {
  border-color: #083d77;
  background: #083d77;
  color: #fff;
  transform: translateY(-2px);
}
.zm-header-action:focus-visible,
.zm-primary-brand:focus-visible {
  outline: 2px solid #083d77;
  outline-offset: 4px;
}
.zm-header-count {
  position: absolute;
  top: -5px;
  right: -5px;
  display: grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  border-radius: 999px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}
.zm-cart-count { background: #ff3b30; }
.zm-wishlist-count { background: #083d77; }

/* Retain the existing menu's classes and global theme. */
.category-strip {
  width: 100%;
  background: #083d77;
  color: #fff;
  overflow: hidden;
}
.site-menu-track {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(20px, 3vw, 48px);
  padding: 13px 25px;
  overflow-x: auto;
  scrollbar-width: none;
}
.site-menu-track::-webkit-scrollbar { display: none; }
.site-menu-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 7px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  white-space: nowrap;
  text-decoration: none;
  transition: color 0.25s;
}
.site-menu-link:hover,
.site-menu-link.is-active { color: #fff; }
.site-menu-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 8px;
  height: 2px;
  background: #fff;
  transform: scaleX(0);
  transition: transform 0.2s;
}
.site-menu-link:hover::after,
.site-menu-link.is-active::after { transform: scaleX(1); }

@media (min-width: 1400px) {
  .zm-primary-brand { width: 250px; }
  .zm-secondary-brand { width: 380px; }
}
@media (max-width: 991px) {
  .zm-header-layout {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
  }
  .zm-primary-brand { width: 190px; }
  .zm-secondary-brand { width: 260px; }
  .zm-logo-group { gap: 16px; }
  .zm-header-search {
    grid-column: 1 / -1;
    grid-row: 2;
    max-width: 100%;
  }
  .zm-header-actions {
    grid-column: 2;
    grid-row: 1;
  }
}
@media (max-width: 575px) {
  .zm-topbar { padding: 14px 0; }
  .zm-header-layout {
    gap: 14px 12px;
    padding: 0 18px;
  }
  .zm-logo-group {
    grid-column: 1 / -1;
    justify-content: space-between;
  }
  .zm-primary-brand { width: 155px; }
  .zm-secondary-brand { width: 210px; }
  .zm-secondary-logo { max-height: 120px; }
  .zm-header-search {
    grid-column: 1;
    grid-row: 2;
  }
  .zm-header-search input {
    height: 44px;
    padding-left: 34px;
    padding-right: 10px;
    font-size: 13px;
  }
  .zm-header-search > i { left: 12px; }
  .zm-header-actions {
    grid-column: 2;
    grid-row: 2;
  }
  .zm-header-action { width: 39px; height: 39px; }
  .site-menu-track { gap: 24px; padding: 12px 18px; }
  .site-menu-link { font-size: 11px; }
}
@media (max-width: 420px) {
  .zm-primary-brand { width: 140px; }
  .zm-secondary-brand { width: 185px; }
  .zm-header-action { width: 37px; height: 37px; font-size: 14px; }
}
</style>
