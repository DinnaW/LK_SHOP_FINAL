<template>
  <div class="app-shell" :class="{ 'sidebar-expanded': isSidebarExpanded }">
    <Sidebar
      :items="categorySidebarItems"
      :active-sidebar="activeSidebar"
      :is-expanded="isSidebarExpanded"
      @toggle="toggleSidebar"
      @set-active="setActiveSidebar"
    />

    <main class="page-wrapper">
      <TopStrip />
      <Header
        v-model:search-term="searchTerm"
        :cart-count="cartCount"
        :wishlist-count="wishlist.length"
        @open-cart="openCart"
      />

      <CategoryStrip :categories="categorySidebarItems" />
      <HeroSection :images="heroImages" />
      <MarqueeStrip :categories="scrollingCategories" />

      <MegaSaleSection
        :products="filteredMegaSaleProducts"
        @buy-now="addToCart"
        @quick-view="openQuickView"
      />

      <ProductSection
        id="deals"
        title="Recommendation for you"
        subtitle="Recommended products arranged in a clean 5-card row with full-cover product visuals."
        :chips="['New Products', 'Featured Products', 'Top Deals', 'Best Sellers']"
        :products="filteredRecommendedProducts"
        :wishlist-items="wishlistTitles"
        :cart-quantities="cartQuantities"
        @add-to-cart="addToCart"
        @update-cart-quantity="updateCartQuantity"
        @quick-view="openQuickView"
        @add-wishlist="addToWishlist"
      />

      <ApplianceBanner :image="applianceBanner" />

      <ProductSection
        id="electronics"
        title="Electronics"
        subtitle="Gadgets, gaming, computer accessories and smart devices."
        :chips="['Gaming', 'Audio Devices', 'Computer Accessories', 'Cameras', 'Home Appliances']"
        :products="filteredElectronicsProducts"
        :promo-image="electronicsSideBanner"
        promo-alt="JBL speaker electronics promotional banner"
        :wishlist-items="wishlistTitles"
        :cart-quantities="cartQuantities"
        @add-to-cart="addToCart"
        @update-cart-quantity="updateCartQuantity"
        @quick-view="openQuickView"
        @add-wishlist="addToWishlist"
      />

      <FeaturedBanners :banners="featuredProductBanners" />

      <HomeAccessoriesSection
        v-model:active-category="activeHomeAccessoryCategory"
        :categories="homeAccessoryCategories"
        :products="filteredHomeAccessoryProducts"
        :wishlist-items="wishlistTitles"
        :cart-quantities="cartQuantities"
        :feature-image="homeAccessoriesFeatureImage"
        :visual-image="product4"
        @add-to-cart="addToCart"
        @update-cart-quantity="updateCartQuantity"
        @quick-view="openQuickView"
        @add-wishlist="addToWishlist"
      />

      <ImageBanner
        id="home-accessories-banner"
        :image="homeAccessoriesBanner"
        alt="Home accessories promotional banner"
      />

      <ProductSection
        id="best-week"
        title="Best of The Week"
        subtitle="Top selling items with special weekly prices."
        :chips="['Personal Care Gadget', 'Office Equipment', 'Gaming', 'Top Deals']"
        :products="filteredBestProducts"
        :wishlist-items="wishlistTitles"
        :cart-quantities="cartQuantities"
        @add-to-cart="addToCart"
        @update-cart-quantity="updateCartQuantity"
        @quick-view="openQuickView"
        @add-wishlist="addToWishlist"
      />

      <Testimonials :reviews="reviews" />
      <Footer />
    </main>

    <CartToast :toast="toast" />
    <CartDrawer
      :cart="cart"
      :is-open="isCartOpen"
      :cart-total="cartTotal"
      @close="closeCart"
      @remove="removeFromCart"
    />

    <QuickViewModal
      :product="quickViewProduct"
      :is-wishlisted="quickViewProduct ? isWishlisted(quickViewProduct) : false"
      @close="closeQuickView"
      @add-to-cart="addToCart"
      @quick-checkout="quickCheckout"
      @add-wishlist="addToWishlist"
    />
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'

import Sidebar from '@/components/layout/Sidebar.vue'
import TopStrip from '@/components/layout/TopStrip.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import ProductSection from '@/components/product/ProductSection.vue'
import QuickViewModal from '@/components/product/QuickViewModal.vue'
import CartToast from '@/components/cart/CartToast.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import CategoryStrip from '@/components/sections/CategoryStrip.vue'
import MarqueeStrip from '@/components/sections/MarqueeStrip.vue'
import MegaSaleSection from '@/components/sections/MegaSaleSection.vue'
import ApplianceBanner from '@/components/sections/ApplianceBanner.vue'
import FeaturedBanners from '@/components/sections/FeaturedBanners.vue'
import HomeAccessoriesSection from '@/components/sections/HomeAccessoriesSection.vue'
import ImageBanner from '@/components/sections/ImageBanner.vue'
import Testimonials from '@/components/sections/Testimonials.vue'

import heroB1g from '@/assets/hero-b1g.png'
import applianceBanner from '@/assets/appliance-banner.png'
import electronicsSideBanner from '@/assets/electronics-side-banner.png'
import homeAccessoriesBanner from '@/assets/home-accessories-banner.png'
import {
  categorySidebarItems,
  scrollingCategories,
  featuredProductBanners,
  homeAccessoryCategories,
  homeAccessoriesFeatureImage,
  homeAccessoryProducts,
  megaSaleProducts,
  recommendedProducts,
  electronicsProducts,
  bestProducts,
  reviews,
  product4,
} from '@/data/shopData'

const searchTerm = ref('')
const heroImages = [heroB1g]
const cart = ref([])
const wishlist = ref([])
const quickViewProduct = ref(null)
const isCartOpen = ref(false)
const isSidebarExpanded = ref(false)
const activeSidebar = ref('Electronics')
const activeHomeAccessoryCategory = ref('All')
const toast = ref({
  visible: false,
  product: null,
  message: 'Added to your cart successfully.',
})
let toastTimer = null

onUnmounted(() => {
  clearTimeout(toastTimer)
})

const filterProducts = (items) => {
  const keyword = searchTerm.value.trim().toLowerCase()
  if (!keyword) return items

  return items.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(keyword))
}

const filteredMegaSaleProducts = computed(() => filterProducts(megaSaleProducts))
const filteredRecommendedProducts = computed(() => filterProducts(recommendedProducts))
const filteredElectronicsProducts = computed(() => filterProducts(electronicsProducts))
const filteredHomeAccessoryProducts = computed(() => {
  const category = activeHomeAccessoryCategory.value
  const categoryItems = category === 'All'
    ? homeAccessoryProducts
    : homeAccessoryProducts.filter((item) => item.category === category)

  return filterProducts(categoryItems)
})
const filteredBestProducts = computed(() => filterProducts(bestProducts))
const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
const cartQuantities = computed(() =>
  cart.value.reduce((items, item) => {
    items[item.title] = item.quantity
    return items
  }, {}),
)
const wishlistTitles = computed(() => wishlist.value.map((item) => item.title))

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

const setActiveSidebar = (label) => {
  activeSidebar.value = label
}

const showProductToast = (product, message = 'Added to your cart successfully.') => {
  toast.value = { visible: true, product, message }

  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value.visible = false
  }, 2600)
}

const normalizeCartPayload = (payload) => {
  if (payload && payload.product) {
    return {
      product: payload.product,
      quantity: Number(payload.quantity) > 0 ? Number(payload.quantity) : 1,
    }
  }

  return {
    product: payload,
    quantity: 1,
  }
}

const addToCart = (payload) => {
  const { product, quantity } = normalizeCartPayload(payload)
  const existingItem = cart.value.find((item) => item.title === product.title)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.value.push({ ...product, quantity })
  }

  showProductToast(product, `${quantity} item${quantity > 1 ? 's' : ''} added to your cart successfully.`)
}

const updateCartQuantity = ({ product, quantity }) => {
  const existingIndex = cart.value.findIndex((item) => item.title === product.title)

  if (quantity <= 0) {
    if (existingIndex !== -1) cart.value.splice(existingIndex, 1)
    return
  }

  if (existingIndex === -1) {
    cart.value.push({ ...product, quantity })
    showProductToast(product, `${quantity} item${quantity > 1 ? 's' : ''} added to your cart successfully.`)
    return
  }

  cart.value[existingIndex].quantity = quantity
}

const addToWishlist = (product) => {
  const exists = wishlist.value.some((item) => item.title === product.title)

  if (!exists) {
    wishlist.value.push(product)
    showProductToast(product, 'Added to wishlist successfully.')
  }
}

const isWishlisted = (product) => wishlist.value.some((item) => item.title === product.title)

const openQuickView = (product) => {
  quickViewProduct.value = product
}

const closeQuickView = () => {
  quickViewProduct.value = null
}

const quickCheckout = (product) => {
  addToCart(product)
  closeQuickView()
  openCart()
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

const openCart = () => {
  isCartOpen.value = true
}

const closeCart = () => {
  isCartOpen.value = false
}
</script>
