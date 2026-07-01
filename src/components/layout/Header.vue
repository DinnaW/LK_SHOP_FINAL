<template>
  <header class="main-header">
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="brand" href="#" aria-label="ZappyMart home">
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

    <nav
      class="scroll-header-categories"
      :class="{ 'is-visible': isScrolled }"
      aria-label="Header categories"
    >
      <a v-for="item in categoryLinks" :key="item.label" :href="item.href">
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import logoUrl from '../../assets/ZappyMart Logo.svg'

const props = defineProps({
  searchTerm: { type: String, required: true },
  cartCount: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
  categories: { type: Array, default: () => [] },
})

defineEmits(['update:searchTerm', 'open-cart'])

const isScrolled = ref(false)
let scrollFrame = null

const categoryLinks = computed(() => {
  const validCategories = props.categories.filter((item) => item?.label && item?.href)
  const storageIndex = validCategories.findIndex((item) => item.label === 'Storage')

  return storageIndex >= 0 ? validCategories.slice(0, storageIndex + 1) : validCategories
})

const updateScrollState = () => {
  if (scrollFrame) return

  scrollFrame = window.requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 140
    scrollFrame = null
  })
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})
</script>
