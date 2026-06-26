<template>
  <section class="feature-showcase-section" id="featured-banners">
    <div class="container-fluid px-4 px-lg-5">
      <div class="section-head product-section-head feature-showcase-head">
        <div>
          <h2 class="section-title">Featured Products</h2>
          <p class="section-sub">Premium collections and highlight banners selected for you.</p>
        </div>

        <a href="#deals" class="view-link">
          View all <i class="fa-solid fa-arrow-right ms-1"></i>
        </a>
      </div>

      <div class="feature-editorial-grid">
        <article
          v-for="item in mappedBanners"
          :key="item.key"
          class="feature-editorial-card"
          :class="item.layoutClass"
        >
          <img :src="item.img" :alt="item.title" />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  banners: {
    type: Array,
    required: true,
  },
})

const mappedBanners = computed(() => {
  const items = Array.isArray(props.banners) ? props.banners : []

  if (!items.length) return []

  const leftTall = items[0] ?? items[items.length - 1]
  const topWide = items[1] ?? items[0]
  const bottomLeft = items[2] ?? items[0]
  const bottomRight = items[3] ?? items[1] ?? items[0]
  const rightTall = items[4] ?? items[0]

  return [
    { ...leftTall, key: `feature-left-${leftTall.title}`, layoutClass: 'tile-left-tall' },
    { ...topWide, key: `feature-top-${topWide.title}`, layoutClass: 'tile-top-wide' },
    { ...bottomLeft, key: `feature-bottom-left-${bottomLeft.title}`, layoutClass: 'tile-bottom-left' },
    { ...bottomRight, key: `feature-bottom-right-${bottomRight.title}`, layoutClass: 'tile-bottom-right' },
    { ...rightTall, key: `feature-right-${rightTall.title}`, layoutClass: 'tile-right-tall' },
  ]
})
</script>

<style scoped>
.feature-editorial-grid {
  display: grid;
  grid-template-columns: minmax(240px, 1.15fr) minmax(220px, 0.74fr) minmax(220px, 0.74fr) minmax(240px, 0.86fr);
  grid-template-areas:
    'left top top right'
    'left bottomA bottomB right';
  gap: 28px;
  align-items: stretch;
}

.feature-editorial-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: #f6f3ee;
  min-height: 270px;
  box-shadow: 0 14px 36px rgba(20, 30, 55, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-editorial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 42px rgba(20, 30, 55, 0.12);
}

.feature-editorial-card img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.tile-left-tall {
  grid-area: left;
  min-height: 640px;
}

.tile-top-wide {
  grid-area: top;
  min-height: 306px;
}

.tile-bottom-left {
  grid-area: bottomA;
  min-height: 306px;
}

.tile-bottom-right {
  grid-area: bottomB;
  min-height: 306px;
}

.tile-right-tall {
  grid-area: right;
  min-height: 640px;
}

@media (max-width: 1199px) {
  .feature-editorial-grid {
    grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) minmax(220px, 1fr);
    grid-template-areas:
      'left top top'
      'left bottomA bottomB'
      'right right right';
  }

  .tile-right-tall {
    min-height: 320px;
  }
}

@media (max-width: 767px) {
  .feature-editorial-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      'left'
      'top'
      'bottomA'
      'bottomB'
      'right';
    gap: 18px;
  }

  .feature-editorial-card,
  .tile-left-tall,
  .tile-top-wide,
  .tile-bottom-left,
  .tile-bottom-right,
  .tile-right-tall {
    min-height: 240px;
  }
}
</style>
