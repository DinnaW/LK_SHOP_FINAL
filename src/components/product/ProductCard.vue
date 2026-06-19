<template>
  <article class="product-card" :class="{ 'is-out-of-stock': isOutOfStock }">
    <div class="product-img">
      <span v-if="ribbonText" class="product-ribbon" :class="{ 'out-stock': isOutOfStock }">{{ ribbonText }}</span>

      <div class="product-actions modern-hover-actions">
        <button
          type="button"
          :class="{ active: isWishlisted }"
          title="Add to wishlist"
          aria-label="Add to wishlist"
          @click.stop="$emit('add-wishlist', product)"
        >
          <i :class="isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
        </button>

        <button
          type="button"
          title="Quick view"
          aria-label="Quick view"
          @click.stop="$emit('quick-view', product)"
        >
          <i class="fa-regular fa-eye"></i>
        </button>
      </div>

      <img :src="product.img" :alt="product.title" @click="$emit('quick-view', product)" />
    </div>

    <div class="product-body">
      <div class="product-category">{{ product.category }}</div>
      <h3 class="product-title">{{ product.title }}</h3>

      <div class="price">
        <del v-if="product.old">{{ formatPrice(product.old) }}</del>
        <strong>{{ formatPrice(product.price) }}</strong>
      </div>

      <p class="installment-line">
        or 3 X <strong>{{ formatPrice(Math.round(product.price / 3)) }}</strong> with
        <span class="koko-label">KOKO</span>
      </p>

      <div class="product-cart-controls">
        <div class="quantity-control" :class="{ disabled: isOutOfStock }">
          <button
            type="button"
            aria-label="Reduce quantity"
            :disabled="isOutOfStock || quantity <= 1"
            @click="decreaseQuantity"
          >
            <i class="fa-solid fa-minus"></i>
          </button>

          <span>{{ quantity }}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            :disabled="isOutOfStock || quantity >= maxQuantity"
            @click="increaseQuantity"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <button
          class="add-btn add-cart-icon-btn"
          :class="{ disabled: isOutOfStock }"
          type="button"
          :disabled="isOutOfStock"
          @click="addSelectedQuantity"
        >
          <i class="fa-solid fa-cart-shopping"></i>
          <span>{{ isOutOfStock ? 'Out Of Stock' : 'Add To Cart' }}</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  product: { type: Object, required: true },
  wishlistItems: { type: Array, default: () => [] },
})

const emit = defineEmits(['add-to-cart', 'quick-view', 'add-wishlist'])

const quantity = ref(1)
const maxQuantity = 99

const isWishlisted = computed(() => props.wishlistItems.includes(props.product.title))
const isOutOfStock = computed(() =>
  props.product.outOfStock ||
  props.product.stock === 'out' ||
  props.product.stockStatus === 'out' ||
  String(props.product.badge || '').toLowerCase().includes('out of stock'),
)
const ribbonText = computed(() => (isOutOfStock.value ? 'OUT OF STOCK' : props.product.badge))

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value -= 1
}

const increaseQuantity = () => {
  if (quantity.value < maxQuantity) quantity.value += 1
}

const addSelectedQuantity = () => {
  if (isOutOfStock.value) return

  emit('add-to-cart', {
    product: props.product,
    quantity: quantity.value,
  })
}
</script>
