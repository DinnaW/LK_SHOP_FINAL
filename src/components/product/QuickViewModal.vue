<template>
  <div class="quick-view-backdrop" :class="{ show: product }" @click="$emit('close')"></div>

  <section v-if="product" class="quick-view-modal" role="dialog" aria-modal="true" aria-label="Product quick view">
    <button class="quick-view-close" type="button" aria-label="Close quick view" @click="$emit('close')">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="quick-view-media">
      <span v-if="product.badge" class="quick-view-badge">{{ product.badge }}</span>
      <div class="quick-view-orb"></div>
      <img :src="product.img" :alt="product.title" />
    </div>

    <div class="quick-view-content">
      <span class="quick-view-kicker">{{ product.category }}</span>
      <h2>{{ product.title }}</h2>
      <p class="quick-view-description">
        A premium selected product from LK Shop with fast delivery, secure checkout and a cleaner shopping experience.
      </p>

      <div class="quick-view-price-row">
        <strong>{{ formatPrice(product.price) }}</strong>
        <del v-if="product.old">{{ formatPrice(product.old) }}</del>
      </div>

      <p class="quick-view-installment">
        or 3 X <strong>{{ formatPrice(Math.round(product.price / 3)) }}</strong> with
        <span class="koko-label">KOKO</span>
      </p>

      <div class="quick-view-meta-grid">
        <div><i class="fa-solid fa-truck-fast"></i><span>Fast delivery</span></div>
        <div><i class="fa-solid fa-shield-halved"></i><span>Secure checkout</span></div>
        <div><i class="fa-solid fa-rotate-left"></i><span>Easy returns</span></div>
      </div>

      <div class="quick-view-actions">
        <button class="quick-add-cart" type="button" @click="$emit('add-to-cart', product)">
          <i class="fa-solid fa-cart-shopping"></i>
          Add to cart
        </button>
        <button class="quick-checkout" type="button" @click="$emit('quick-checkout', product)">
          Quick checkout
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <button class="quick-wishlist-btn" type="button" :class="{ active: isWishlisted }" @click="$emit('add-wishlist', product)">
        <i :class="isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
        {{ isWishlisted ? 'Added to wishlist' : 'Add to wishlist' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { formatPrice } from '@/utils/formatters'

defineProps({
  product: { type: Object, default: null },
  isWishlisted: { type: Boolean, default: false },
})

defineEmits(['close', 'add-to-cart', 'quick-checkout', 'add-wishlist'])
</script>
