<template>
  <div class="cart-toast" :class="{ show: toast.visible }">
    <img :src="toast.product?.img || ''" alt="Added product" />
    <div>
      <h6>{{ toast.product?.title || 'Product added' }}</h6>
      <p>{{ toast.message || 'Added to your cart successfully.' }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  toast: { type: Object, required: true },
})
</script>
