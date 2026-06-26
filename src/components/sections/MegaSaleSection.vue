<template>
  <section id="mega-sale" class="mega-sale-section" aria-label="Mega sale products">
    <div class="container-fluid">
      <div class="mega-sale-grid">
        <article
          v-for="product in products"
          :key="product.title"
          class="mega-sale-card"
          @click="$emit('quick-view', product)"
        >
          <div class="mega-sale-visual mega-sale-creative-visual">
            <img :src="product.img" :alt="product.title" loading="lazy" />
          </div>

          <div class="mega-sale-timer" aria-label="Offer countdown timer">
            <span class="mega-sale-timer-label">Offer<br />Ends In</span>
            <div v-for="unit in countdownUnits" :key="unit.label" class="mega-sale-time-box">
              <small>{{ unit.label }}</small>
              <strong>{{ unit.value }}</strong>
            </div>
          </div>

          <div class="mega-sale-info">
            <h3>{{ product.title }}</h3>

            <div class="mega-sale-price-row">
              <div class="mega-sale-price">
                <del>{{ formatPrice(product.old) }}</del>
                <strong>{{ formatPrice(product.price) }}</strong>
                <span>Monthly<br />{{ formatPrice(product.monthly) }}</span>
              </div>

              <div class="mega-sale-save">
                <span>Save</span>
                <strong>{{ formatPrice(product.save) }}</strong>
              </div>
            </div>

            <button type="button" class="mega-sale-buy" @click.stop="$emit('buy-now', product)">
              Buy Now
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { formatPrice } from '@/utils/formatters'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})

defineEmits(['buy-now', 'quick-view'])

const remaining = ref({ days: '0', hours: '12', minutes: '04', seconds: '49' })
let saleEndTime = null
let timer = null

const pad = (value) => String(value).padStart(2, '0')

const updateTimer = () => {
  const now = Date.now()

  if (!saleEndTime || now >= saleEndTime) {
    saleEndTime = now + 12 * 60 * 60 * 1000 + 4 * 60 * 1000 + 49 * 1000
  }

  const diff = Math.max(saleEndTime - now, 0)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  remaining.value = {
    days: String(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

const countdownUnits = computed(() => [
  { label: 'Days', value: remaining.value.days },
  { label: 'Hr', value: remaining.value.hours },
  { label: 'Min', value: remaining.value.minutes },
  { label: 'Sec', value: remaining.value.seconds },
])

onMounted(() => {
  updateTimer()
  timer = setInterval(updateTimer, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
