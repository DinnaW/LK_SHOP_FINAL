<template>
  <Transition name="wishlist-backdrop">
    <button
      v-if="isOpen"
      class="wishlist-drawer-overlay"
      type="button"
      aria-label="Close wishlist"
      @click="$emit('close')"
    ></button>
  </Transition>

  <Transition name="wishlist-drawer-slide">
    <aside
      v-if="isOpen"
      class="wishlist-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlistDrawerTitle"
    >
      <header class="wishlist-drawer-header">
        <div>
          <span class="wishlist-drawer-eyebrow">Saved for later</span>
          <div class="wishlist-drawer-title-row">
            <h2 id="wishlistDrawerTitle">My Wishlist</h2>
            <span class="wishlist-drawer-count">{{ wishlist.length }}</span>
          </div>
        </div>

        <button
          class="wishlist-drawer-close"
          type="button"
          aria-label="Close wishlist"
          @click="$emit('close')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </header>

      <div v-if="wishlist.length" class="wishlist-drawer-summary">
        <div class="wishlist-summary-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </div>
        <div>
          <strong>{{ wishlist.length }} saved {{ wishlist.length === 1 ? 'item' : 'items' }}</strong>
          <span>{{ availableCount }} available to add now</span>
        </div>
        <strong class="wishlist-summary-total">{{ formatPrice(wishlistTotal) }}</strong>
      </div>

      <div class="wishlist-drawer-body">
        <div v-if="!wishlist.length" class="wishlist-empty-state">
          <div class="wishlist-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
          </div>
          <span>Your wishlist is waiting</span>
          <h3>Save products you love</h3>
          <p>Use the heart icon on any product and it will appear here for quick access.</p>
          <button type="button" @click="$emit('close')">Continue Shopping</button>
        </div>

        <template v-else>
          <article
            v-for="product in wishlist"
            :key="product.title"
            class="wishlist-drawer-item"
          >
          <button
            class="wishlist-item-image"
            type="button"
            :aria-label="`View ${product.title}`"
            @click="$emit('view-product', product)"
          >
            <img :src="product.img" :alt="product.title" />
            <span v-if="product.badge" class="wishlist-item-badge">{{ product.badge }}</span>
          </button>

          <div class="wishlist-item-content">
            <div class="wishlist-item-topline">
              <span>{{ product.category || 'Featured product' }}</span>
              <button
                class="wishlist-remove-button"
                type="button"
                :aria-label="`Remove ${product.title} from wishlist`"
                @click="$emit('remove', product)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v5" />
                  <path d="M14 11v5" />
                </svg>
              </button>
            </div>

            <button
              class="wishlist-item-title"
              type="button"
              @click="$emit('view-product', product)"
            >
              {{ product.title }}
            </button>

            <div class="wishlist-item-stock" :class="{ 'is-unavailable': isOutOfStock(product) }">
              <span></span>
              {{ isOutOfStock(product) ? 'Currently unavailable' : 'In stock and ready to order' }}
            </div>

            <div class="wishlist-item-price-row">
              <div class="wishlist-item-price">
                <del v-if="product.old">{{ formatPrice(product.old) }}</del>
                <strong>{{ formatPrice(product.price) }}</strong>
              </div>

              <span v-if="cartQuantities[product.title]" class="wishlist-in-cart-label">
                {{ cartQuantities[product.title] }} in cart
              </span>
            </div>

            <button
              class="wishlist-add-cart-button"
              type="button"
              :disabled="isOutOfStock(product)"
              @click="$emit('add-to-cart', product)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.65 12.42a2 2 0 0 0 2 1.58h7.72a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                <path d="M12 8v5" />
                <path d="M9.5 10.5h5" />
              </svg>
              <span>{{ isOutOfStock(product) ? 'Out of Stock' : 'Add to Cart' }}</span>
            </button>
          </div>
          </article>
        </template>
      </div>

      <footer v-if="wishlist.length" class="wishlist-drawer-footer">
        <div class="wishlist-footer-copy">
          <span>Wishlist value</span>
          <strong>{{ formatPrice(wishlistTotal) }}</strong>
        </div>

        <button
          class="wishlist-add-all-button"
          type="button"
          :disabled="availableCount === 0"
          @click="$emit('add-all')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add All Available to Cart
        </button>
      </footer>
    </aside>
  </Transition>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  wishlist: { type: Array, default: () => [] },
  isOpen: { type: Boolean, default: false },
  cartQuantities: { type: Object, default: () => ({}) },
})

defineEmits(['close', 'remove', 'add-to-cart', 'add-all', 'view-product'])

const isOutOfStock = (product) =>
  Boolean(
    product?.outOfStock ||
    product?.stock === 'out' ||
    product?.stockStatus === 'out' ||
    String(product?.badge || '').toLowerCase().includes('out of stock'),
  )

const wishlistTotal = computed(() =>
  props.wishlist.reduce((total, product) => total + Number(product.price || 0), 0),
)

const availableCount = computed(() =>
  props.wishlist.filter((product) => !isOutOfStock(product)).length,
)

const syncBodyScroll = (isOpen) => {
  document.body.classList.toggle('wishlist-drawer-open', isOpen)
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    const closeButton = document.querySelector('.wishlist-drawer-close')
    closeButton?.click()
  }
}

watch(() => props.isOpen, syncBodyScroll, { immediate: true })

onMounted(() => window.addEventListener('keydown', handleKeydown))

onBeforeUnmount(() => {
  document.body.classList.remove('wishlist-drawer-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>
