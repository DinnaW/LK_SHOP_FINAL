<template>
  <section class="brand-showcase-section" id="brands">
    <div class="container-fluid px-4 px-lg-5">
      <div class="brand-showcase-head">
        <h2>Our Trusted Brands</h2>
      </div>

      <div class="brand-showcase-grid" aria-label="Popular brands">
        <div
          v-for="(brand, index) in brands"
          :key="brand.name"
          class="brand-logo-card"
          :class="{ 'is-last-brand-row': index >= Math.max(brands.length - 5, 0) }"
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
const brandLogoModules = import.meta.glob('@/assets/brands/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

const formatBrandName = (path) => {
  const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') || 'Brand'

  return fileName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

const brands = Object.entries(brandLogoModules)
  .map(([path, logo]) => ({
    name: formatBrandName(path),
    logo,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
</script>
