<template>
  <header class="main-header">

    <!-- MAIN HEADER -->
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid px-4 px-lg-5">

        <!-- LOGO -->
        <a
          class="brand"
          href="#"
          aria-label="ZappyMart home"
          @click.prevent="$emit('go-home')"
        >
          <img
            class="brand-logo"
            :src="logoUrl"
            alt="ZappyMart"
          />
        </a>

        <!-- SEARCH BAR -->
        <div class="search-box mx-lg-auto">
          <i class="fa-solid fa-magnifying-glass"></i>

          <input
            :value="searchTerm"
            type="text"
            placeholder="Search for products, brands and categories..."
            @input="$emit('update:searchTerm', $event.target.value)"
          />
        </div>

        <!-- HEADER ICONS -->
        <div class="d-flex align-items-center gap-2 ms-lg-4">

          <!-- WISHLIST -->
          <button
            class="header-icon"
            type="button"
            aria-label="Open wishlist"
            :aria-expanded="wishlistOpen"
            @click="$emit('open-wishlist')"
          >
            <i
              :class="
                wishlistCount
                  ? 'fa-solid fa-heart'
                  : 'fa-regular fa-heart'
              "
            ></i>

            <span
              v-if="wishlistCount"
              class="wishlist-count"
            >
              {{ wishlistCount }}
            </span>
          </button>

          <!-- PROFILE -->
          <button
            class="header-icon"
            type="button"
            aria-label="Open customer profile"
            @click="$emit('open-profile')"
          >
            <i class="fa-regular fa-user"></i>
          </button>

          <!-- CART -->
          <button
            class="header-icon"
            type="button"
            aria-label="Open shopping cart"
            @click="$emit('open-cart')"
          >
            <i class="fa-solid fa-cart-shopping"></i>

            <span class="cart-count">
              {{ cartCount }}
            </span>
          </button>

        </div>
      </div>
    </nav>

    <!-- MAIN WEBSITE MENU -->
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
          <i
            v-if="item.icon"
            :class="item.icon"
            aria-hidden="true"
          ></i>

          <span>
            {{ item.label }}
          </span>
        </a>

      </div>
    </nav>

  </header>
</template>


<script setup>

import logoUrl from '../../assets/ZappyMart-Logo.png'


/* =========================================================
   PROPS
========================================================= */

const props = defineProps({

  searchTerm: {
    type: String,
    required: true,
  },

  cartCount: {
    type: Number,
    default: 0,
  },

  wishlistCount: {
    type: Number,
    default: 0,
  },

  wishlistOpen: {
    type: Boolean,
    default: false,
  },

  activePage: {
    type: String,
    default: 'store',
  },

})


/* =========================================================
   EMITS
========================================================= */

const emit = defineEmits([

  'update:searchTerm',

  'open-cart',

  'open-wishlist',

  'go-home',

  'open-shop',

  'navigate-section',

  'open-profile',

])


/* =========================================================
   MENU ITEMS
========================================================= */

const menuItems = [

  {
    label: 'Home',
    href: '#',
    action: 'home',
  },

  {
    label: 'Shop',
    href: '?page=shop',
    action: 'shop',
  },

  {
    label: 'Mega Sale',
    href: '#mega-sale',
    action: 'section',
  },

  {
    label: 'Recommendation',
    href: '#deals',
    action: 'section',
  },

  {
    label: 'Electronics',
    href: '#electronics',
    action: 'section',
  },

  {
    label: 'Featured Products',
    href: '#featured-banners',
    action: 'section',
  },

  {
    label: 'Home Accessories',
    href: '#home-accessories',
    action: 'section',
  },

  {
    label: 'Best Deals',
    href: '#best-week',
    action: 'section',
  },

]


/* =========================================================
   ACTIVE MENU
========================================================= */

const isMenuItemActive = (item) => {

  if (item.action === 'shop') {
    return props.activePage === 'shop'
  }

  if (item.action === 'home') {
    return props.activePage === 'store'
  }

  return false
}


/* =========================================================
   MENU CLICK HANDLER
========================================================= */

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


<style scoped>

/* =========================================================
   HEADER
========================================================= */

.main-header {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
}


/* =========================================================
   NAVBAR
========================================================= */

.navbar-custom {
  min-height: 105px;
}


/* =========================================================
   LOGO
========================================================= */

.brand {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  text-decoration: none;
}


/*
  Bigger ZappyMart logo
*/

.brand-logo {
  display: block;

  width: clamp(220px, 18vw, 310px);

  height: auto;

  max-height: 88px;

  object-fit: contain;

  object-position: left center;
}


/* =========================================================
   SEARCH BOX
========================================================= */

.search-box {
  max-width: 580px;
  width: 100%;
  position: relative;
  margin-left: 35px;
  margin-right: 35px;
}

.search-box input {
  height: 48px;
  width: 100%;

  border-radius: 999px;

  border: 1px solid #e8edf4;

  background: #f6f8fb;

  padding-left: 52px;
  padding-right: 18px;

  font-size: 14px;

  font-weight: 500;

  outline: none;

  transition: 0.25s ease;
}

.search-box input:focus {
  border-color: #083d77;

  background: #ffffff;

  box-shadow:
    0 0 0 3px rgba(8, 61, 119, 0.08);
}

.search-box i {
  position: absolute;

  top: 50%;

  left: 20px;

  transform: translateY(-50%);

  color: #6b7280;

  z-index: 2;
}


/* =========================================================
   HEADER ICONS
========================================================= */

.header-icon {
  width: 43px;

  height: 43px;

  border-radius: 50%;

  border: 1px solid #e8edf4;

  display: grid;

  place-items: center;

  background: #ffffff;

  color: #083d77;

  position: relative;

  cursor: pointer;

  transition: all 0.25s ease;
}

.header-icon:hover {
  background: #083d77;

  color: #ffffff;

  border-color: #083d77;

  transform: translateY(-2px);
}


/* =========================================================
   CART COUNT
========================================================= */

.cart-count {
  position: absolute;

  top: -5px;

  right: -5px;

  width: 20px;

  height: 20px;

  border-radius: 50%;

  background: #ff3b30;

  color: #ffffff;

  font-size: 11px;

  font-weight: 700;

  display: grid;

  place-items: center;
}


/* =========================================================
   WISHLIST COUNT
========================================================= */

.wishlist-count {
  position: absolute;

  top: -5px;

  right: -5px;

  width: 20px;

  height: 20px;

  border-radius: 50%;

  background: #083d77;

  color: #ffffff;

  font-size: 11px;

  font-weight: 700;

  display: grid;

  place-items: center;
}


/* =========================================================
   MENU STRIP
========================================================= */

.category-strip {
  width: 100%;

  background: #083d77;

  color: #ffffff;

  overflow: hidden;
}

.site-menu-track {
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: clamp(20px, 3vw, 48px);

  padding: 13px 25px;
}

.site-menu-link {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  color: rgba(255, 255, 255, 0.85);

  font-size: 12px;

  font-weight: 600;

  letter-spacing: 0.7px;

  text-transform: uppercase;

  white-space: nowrap;

  text-decoration: none;

  position: relative;

  transition: 0.25s ease;
}

.site-menu-link:hover {
  color: #ffffff;
}

.site-menu-link::after {
  content: '';

  position: absolute;

  left: 50%;

  bottom: -6px;

  width: 0;

  height: 2px;

  background: #ffffff;

  transform: translateX(-50%);

  transition: width 0.25s ease;
}

.site-menu-link:hover::after {
  width: 100%;
}

.site-menu-link.is-active {
  color: #ffffff;
}

.site-menu-link.is-active::after {
  width: 100%;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 991px) {

  .navbar-custom {
    min-height: auto;
    padding: 18px 0;
  }

  .brand-logo {
    width: 205px;

    max-height: 72px;
  }

  .search-box {
    order: 3;

    flex-basis: 100%;

    max-width: 100%;

    margin: 16px 0 0;
  }

  .site-menu-track {
    justify-content: flex-start;

    overflow-x: auto;

    scrollbar-width: none;
  }

  .site-menu-track::-webkit-scrollbar {
    display: none;
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 575px) {

  .navbar-custom {
    padding: 14px 0;
  }

  .brand-logo {
    width: 170px;

    max-height: 60px;
  }

  .header-icon {
    width: 39px;

    height: 39px;
  }

  .search-box input {
    height: 44px;

    font-size: 13px;
  }

  .site-menu-track {
    gap: 24px;

    padding: 12px 18px;
  }

  .site-menu-link {
    font-size: 11px;
  }

}

</style>