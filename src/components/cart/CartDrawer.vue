<template>
  <div class="overlay" :class="{ show: isOpen }" @click="$emit('close')"></div>

  <aside class="cart-drawer" :class="{ open: isOpen }">
    <div class="drawer-head">
      <h4>Your Cart</h4>
      <button class="btn-close" type="button" @click="$emit('close')"></button>
    </div>

    <div class="drawer-body">
      <p v-if="cart.length === 0" class="text-muted fw-semibold">Your cart is empty.</p>

      <div v-for="(item, index) in cart" :key="`${item.title}-${index}`" class="drawer-item">
        <img :src="item.img" :alt="item.title" />
        <div class="flex-grow-1">
          <h6>{{ item.title }}</h6>
          <p>{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
          <strong class="drawer-line-total">{{ formatPrice(item.price * item.quantity) }}</strong>
        </div>
        <button class="remove-btn" type="button" @click="$emit('remove', index)">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    <div class="drawer-footer">
      <div class="d-flex justify-content-between mb-3 fw-bold">
        <span>Total</span>
        <span>{{ formatPrice(cartTotal) }}</span>
      </div>
      <button class="checkout-btn">Proceed to Checkout</button>
    </div>
  </aside>
</template>

<script setup>
import { formatPrice } from '@/utils/formatters'

defineProps({
  cart: { type: Array, required: true },
  isOpen: { type: Boolean, default: false },
  cartTotal: { type: Number, required: true },
})

defineEmits(['close', 'remove'])
</script>
