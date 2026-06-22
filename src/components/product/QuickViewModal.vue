<template>
  <div class="quick-view-backdrop" :class="{ show: product }" @click="$emit('close')"></div>

  <section v-if="product" class="quick-view-modal" role="dialog" aria-modal="true" aria-label="Product quick view">
    <button class="quick-view-close" type="button" aria-label="Close quick view" @click="$emit('close')">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="quick-view-media">
      <span v-if="product.badge" class="quick-view-badge">{{ product.badge }}</span>
      <span class="quick-view-media-label">LK Shop Select</span>
      <div class="quick-view-product-stage">
        <img :src="product.img || fallbackImage" :alt="product.title" />
      </div>
      <div class="quick-view-media-note">
        <i class="fa-solid fa-cube"></i>
        <span>Premium electronics, selected for everyday performance.</span>
      </div>
    </div>

    <div class="quick-view-content">
      <div class="quick-view-heading-row">
        <span class="quick-view-kicker">{{ product.category }}</span>
        <span class="quick-view-stock"><i class="fa-solid fa-circle-check"></i> In stock</span>
      </div>
      <h2>{{ product.title }}</h2>

      <div class="quick-view-rating" aria-label="Rated 4.8 out of 5">
        <span><i class="fa-solid fa-star"></i> 4.8</span>
        <span>Verified product</span>
      </div>

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

      <div class="quick-view-purchase">
        <div class="quick-view-quantity-wrap">
          <span class="quick-view-control-label">Quantity</span>
          <div class="quick-view-quantity" aria-label="Choose quantity">
            <button type="button" aria-label="Reduce quantity" :disabled="quantity <= 1" @click="decreaseQuantity">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span>{{ quantity }}</span>
            <button type="button" aria-label="Increase quantity" :disabled="quantity >= maxQuantity" @click="increaseQuantity">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <button class="quick-add-cart" type="button" @click="addSelectedQuantity">
          <i class="fa-solid fa-cart-shopping"></i>
          Add {{ quantity }} to cart
        </button>
      </div>

      <div class="quick-view-actions">
        <button class="quick-checkout" type="button" @click="quickCheckout">
          Buy now
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button class="quick-wishlist-btn" type="button" :class="{ active: isWishlisted }" @click="$emit('add-wishlist', product)">
          <i :class="isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
          {{ isWishlisted ? 'Wishlisted' : 'Save for later' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { formatPrice } from '@/utils/formatters'
import fallbackImage from '@/assets/product-5.webp'

const props = defineProps({
  product: { type: Object, default: null },
  isWishlisted: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'add-to-cart', 'quick-checkout', 'add-wishlist'])

const quantity = ref(1)
const maxQuantity = 99

watch(() => props.product, () => {
  quantity.value = 1
})

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value -= 1
}

const increaseQuantity = () => {
  if (quantity.value < maxQuantity) quantity.value += 1
}

const selectedProduct = () => ({
  product: props.product,
  quantity: quantity.value,
})

const addSelectedQuantity = () => emit('add-to-cart', selectedProduct())
const quickCheckout = () => emit('quick-checkout', selectedProduct())
</script>
