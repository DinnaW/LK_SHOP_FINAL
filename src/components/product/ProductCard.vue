<template>
  <article class="product-card" :class="{ 'is-out-of-stock': isOutOfStock }">
    <div class="product-img">
      <span
        v-if="ribbonText"
        class="product-ribbon"
        :class="[ribbonClass, { 'out-stock': isOutOfStock }]"
      >
        {{ ribbonText }}
      </span>

      <div class="product-actions modern-hover-actions">
        <button
          type="button"
          :class="{ active: isWishlisted }"
          title="Add to wishlist"
          aria-label="Add to wishlist"
          @click.stop="$emit('add-wishlist', product)"
        >
          <svg
            class="card-action-icon wishlist-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            :class="{ filled: isWishlisted }"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>

        <button
          type="button"
          title="Quick view"
          aria-label="Quick view"
          @click.stop="$emit('quick-view', product)"
        >
          <svg class="card-action-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2.06 12.35a1 1 0 0 1 0-.7C3.7 7.35 7.88 4.5 12 4.5s8.3 2.85 9.94 7.15a1 1 0 0 1 0 .7C20.3 16.65 16.12 19.5 12 19.5s-8.3-2.85-9.94-7.15Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        <button
          type="button"
          class="hover-cart-action"
          :disabled="isOutOfStock"
          :title="isOutOfStock ? 'Out of stock' : 'Add to cart'"
          :aria-label="isOutOfStock ? 'Out of stock' : 'Add to cart'"
          @click.stop="addOneToCart"
        >
          <svg class="card-action-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.65 12.42a2 2 0 0 0 2 1.58h7.72a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            <path d="M12 8v5" />
            <path d="M9.5 10.5h5" />
          </svg>
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

      <div class="product-cart-controls" :class="{ 'has-cart-quantity': cartQuantity > 0 }">
        <button
          v-if="cartQuantity <= 0"
          class="add-btn add-cart-icon-btn"
          :class="{ disabled: isOutOfStock }"
          type="button"
          :disabled="isOutOfStock"
          @click="addOneToCart"
        >
          <svg class="button-inline-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span>{{ isOutOfStock ? 'Out Of Stock' : 'Add' }}</span>
        </button>

        <div v-else class="quantity-control cart-quantity-control" :class="{ disabled: isOutOfStock }">
          <button
            type="button"
            aria-label="Reduce quantity"
            :disabled="isOutOfStock"
            @click="decreaseCartQuantity"
          >
            <svg class="quantity-inline-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
          </button>

          <span>{{ cartQuantity }}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            :disabled="isOutOfStock || cartQuantity >= maxQuantity"
            @click="increaseCartQuantity"
          >
            <svg class="quantity-inline-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  product: { type: Object, required: true },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantity: { type: Number, default: 0 },
})

const emit = defineEmits(['add-to-cart', 'update-cart-quantity', 'quick-view', 'add-wishlist'])

const maxQuantity = 99

const isWishlisted = computed(() => props.wishlistItems.includes(props.product.title))
const isOutOfStock = computed(() =>
  props.product.outOfStock ||
  props.product.stock === 'out' ||
  props.product.stockStatus === 'out' ||
  String(props.product.badge || '').toLowerCase().includes('out of stock'),
)
const ribbonText = computed(() => (isOutOfStock.value ? 'OUT OF STOCK' : props.product.badge))
const ribbonClass = computed(() => {
  const badge = String(ribbonText.value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return badge ? `ribbon-${badge}` : ''
})

const addOneToCart = () => {
  if (isOutOfStock.value) return

  emit('add-to-cart', {
    product: props.product,
    quantity: 1,
  })
}

const decreaseCartQuantity = () => {
  if (isOutOfStock.value) return

  emit('update-cart-quantity', {
    product: props.product,
    quantity: props.cartQuantity - 1,
  })
}

const increaseCartQuantity = () => {
  if (isOutOfStock.value) return

  emit('update-cart-quantity', {
    product: props.product,
    quantity: Math.min(props.cartQuantity + 1, maxQuantity),
  })
}
</script>
