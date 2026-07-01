<template>
  <section class="brand-showcase-section" id="brands">
    <div class="container-fluid px-4 px-lg-5">
      <div class="brand-showcase-head">
        <h2>Our Trusted Brands</h2>
      </div>

      <div class="brand-showcase-grid" aria-label="Popular brands">
        <div
          v-for="brand in brands"
          :key="brand.name"
          class="brand-logo-card"
          role="img"
          :aria-label="brand.name"
        >
          <img
            v-if="!failedLogos.includes(brand.name)"
            class="brand-logo-img"
            :src="brand.logo"
            :alt="`${brand.name} logo`"
            loading="lazy"
            @error="markLogoFailed(brand.name)"
          />
          <span v-else class="brand-logo-fallback">{{ brand.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const failedLogos = ref([])

const markLogoFailed = (brandName) => {
  if (!failedLogos.value.includes(brandName)) {
    failedLogos.value.push(brandName)
  }
}

const brands = [
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000068' },
  { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000068' },
  { name: 'Sony', logo: 'https://cdn.simpleicons.org/sony/000068' },
  { name: 'JBL', logo: 'https://cdn.simpleicons.org/jbl/000068' },
  { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi/000068' },
  { name: 'LG', logo: 'https://cdn.simpleicons.org/lg/000068' },
  { name: 'Philips', logo: 'https://cdn.simpleicons.org/philips/000068' },
  { name: 'Logitech', logo: 'https://cdn.simpleicons.org/logitech/000068' },
  { name: 'ASUS', logo: 'https://cdn.simpleicons.org/asus/000068' },
  { name: 'Dell', logo: 'https://cdn.simpleicons.org/dell/000068' },
  { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/000068' },
  { name: 'HP', logo: 'https://cdn.simpleicons.org/hp/000068' },
  { name: 'Panasonic', logo: 'https://cdn.simpleicons.org/panasonic/000068' },
  { name: 'Canon', logo: 'https://cdn.simpleicons.org/canon/000068' },
  { name: 'Beats', logo: 'https://cdn.simpleicons.org/beatsbydre/000068' },
]
</script>
