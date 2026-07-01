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
            class="brand-logo-img"
            :src="brand.logo"
            :alt="`${brand.name} logo`"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import appleLogo from '@/assets/brands/apple-color.svg'
import samsungLogo from '@/assets/brands/samsung-color.svg'
import sonyLogo from '@/assets/brands/sony-color.svg'
import jblLogo from '@/assets/brands/jbl-color.svg'
import xiaomiLogo from '@/assets/brands/xiaomi-color.svg'
import lgLogo from '@/assets/brands/lg-color.svg'
import philipsLogo from '@/assets/brands/philips-color.svg'
import logitechLogo from '@/assets/brands/logitech-color.svg'
import asusLogo from '@/assets/brands/asus-color.svg'
import dellLogo from '@/assets/brands/dell-color.svg'
import lenovoLogo from '@/assets/brands/lenovo-color.svg'
import hpLogo from '@/assets/brands/hp-color.svg'
import panasonicLogo from '@/assets/brands/panasonic-color.svg'
import canonLogo from '@/assets/brands/canon-color.svg'
import beatsLogo from '@/assets/brands/beats-color.svg'

const brands = [
  { name: 'Apple', logo: appleLogo },
  { name: 'Samsung', logo: samsungLogo },
  { name: 'Sony', logo: sonyLogo },
  { name: 'JBL', logo: jblLogo },
  { name: 'Xiaomi', logo: xiaomiLogo },
  { name: 'LG', logo: lgLogo },
  { name: 'Philips', logo: philipsLogo },
  { name: 'Logitech', logo: logitechLogo },
  { name: 'ASUS', logo: asusLogo },
  { name: 'Dell', logo: dellLogo },
  { name: 'Lenovo', logo: lenovoLogo },
  { name: 'HP', logo: hpLogo },
  { name: 'Panasonic', logo: panasonicLogo },
  { name: 'Canon', logo: canonLogo },
  { name: 'Beats', logo: beatsLogo },
]
</script>
