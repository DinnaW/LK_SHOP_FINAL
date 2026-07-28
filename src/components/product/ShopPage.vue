<template>
  <section class="shop-page" aria-label="Shop all products">
    <div class="shop-page__inner">
      <nav class="shop-breadcrumb" aria-label="Breadcrumb">
        <button type="button" @click="$emit('go-home')">Home</button>
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        <span>Shop</span>
      </nav>


      <section class="shop-category-rail shop-category-grid-section" aria-labelledby="shop-category-title">
        <div class="shop-section-heading shop-category-grid-heading">
          <div>
            <span class="shop-section-kicker">Browse departments</span>
            <h2 id="shop-category-title">Shop by category</h2>
          </div>

          <button type="button" class="shop-text-action shop-category-view-all" @click="selectCategory('All Products')">
            <span>View all products</span>
            <span class="shop-category-view-all__count">{{ normalizedProducts.length }}</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>

        <div class="shop-category-grid shop-category-grid--tall">
          <button
            v-for="category in featuredCategories"
            :key="category.label"
            type="button"
            class="shop-category-card"
            :class="{ active: selectedCategory === category.label }"
            @click="selectCategory(category.label)"
          >
            <span class="shop-category-card__image">
              <img
                :src="category.image"
                :alt="`${category.label} category`"
                loading="lazy"
                decoding="async"
                @error="useCategoryFallback($event, category.fallbackImage)"
              />
            </span>

            <span class="shop-category-card__body">
              <span class="shop-category-card__copy">
                <small>Department</small>
                <strong>{{ category.label }}</strong>
              </span>

              <span class="shop-category-card__arrow" aria-hidden="true">
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </span>
          </button>
        </div>
      </section>

      <div class="shop-workspace">
        <aside class="shop-filter-panel" :class="{ 'is-open': filtersOpen }">
          <div class="shop-filter-panel__mobile-head">
            <div>
              <span>Refine results</span>
              <strong>Filters</strong>
            </div>
            <button type="button" aria-label="Close filters" @click="filtersOpen = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="shop-filter-title-row">
            <div>
              <span class="shop-section-kicker">Refine results</span>
              <h2>Filters</h2>
            </div>
            <button v-if="activeFilterCount" type="button" @click="clearFilters">Clear</button>
          </div>

          <div class="shop-filter-block">
            <button type="button" class="shop-filter-block__heading" @click="toggleFilter('category')">
              <span>Department</span>
              <i :class="openFilters.category ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
            </button>
            <div v-show="openFilters.category" class="shop-filter-options">
              <label v-for="category in groupedCategories" :key="category.label" class="shop-radio-row">
                <input v-model="selectedCategory" type="radio" :value="category.label" />
                <span class="shop-custom-radio"></span>
                <span>{{ category.label }}</span>
                <small>{{ category.count }}</small>
              </label>
            </div>
          </div>

          <div class="shop-filter-block">
            <button type="button" class="shop-filter-block__heading" @click="toggleFilter('price')">
              <span>Price range</span>
              <i :class="openFilters.price ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
            </button>
            <div v-show="openFilters.price" class="shop-price-filter">
              <div class="shop-price-values">
                <span>Rs. 0</span>
                <strong>{{ formatPrice(priceLimit) }}</strong>
              </div>
              <input
                v-model.number="priceLimit"
                type="range"
                :min="0"
                :max="maxPrice"
                :step="500"
                aria-label="Maximum price"
              />
              <div class="shop-price-presets">
                <button v-for="preset in pricePresets" :key="preset" type="button" @click="priceLimit = preset">
                  Under {{ compactPrice(preset) }}
                </button>
              </div>
            </div>
          </div>

          <div class="shop-filter-block">
            <button type="button" class="shop-filter-block__heading" @click="toggleFilter('availability')">
              <span>Availability</span>
              <i :class="openFilters.availability ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
            </button>
            <div v-show="openFilters.availability" class="shop-filter-options">
              <label class="shop-check-row">
                <input v-model="inStockOnly" type="checkbox" />
                <span class="shop-custom-check"><i class="fa-solid fa-check"></i></span>
                <span>In stock only</span>
                <small>{{ inStockCount }}</small>
              </label>
              <label class="shop-check-row">
                <input v-model="dealsOnly" type="checkbox" />
                <span class="shop-custom-check"><i class="fa-solid fa-check"></i></span>
                <span>Offers & discounts</span>
                <small>{{ dealCount }}</small>
              </label>
            </div>
          </div>

          <div class="shop-filter-block">
            <button type="button" class="shop-filter-block__heading" @click="toggleFilter('brand')">
              <span>Popular brands</span>
              <i :class="openFilters.brand ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
            </button>
            <div v-show="openFilters.brand" class="shop-filter-options">
              <label v-for="brand in brands" :key="brand.name" class="shop-check-row">
                <input v-model="selectedBrands" type="checkbox" :value="brand.name" />
                <span class="shop-custom-check"><i class="fa-solid fa-check"></i></span>
                <span>{{ brand.name }}</span>
                <small>{{ brand.count }}</small>
              </label>
            </div>
          </div>

          <div class="shop-filter-promo">
            <span><i class="fa-solid fa-bolt"></i> Weekly picks</span>
            <strong>Extra value on selected essentials.</strong>
            <p>Use the deal filter to see products with live savings.</p>
            <button type="button" @click="activateDeals">Explore offers</button>
          </div>

          <button type="button" class="shop-mobile-apply" @click="filtersOpen = false">
            Show {{ filteredProducts.length }} products
          </button>
        </aside>

        <button v-if="filtersOpen" type="button" class="shop-filter-backdrop" aria-label="Close filters" @click="filtersOpen = false"></button>

        <main class="shop-results product-grid-section">
          <div class="shop-results-toolbar">
            <div class="shop-results-toolbar__summary">
              <span class="shop-section-kicker">Curated marketplace</span>
              <h2>{{ selectedCategory }}</h2>
              <p>{{ filteredProducts.length }} products found</p>
            </div>

            <div class="shop-results-toolbar__actions">
              <button type="button" class="shop-filter-trigger" @click="filtersOpen = true">
                <i class="fa-solid fa-sliders"></i>
                Filters
                <span v-if="activeFilterCount">{{ activeFilterCount }}</span>
              </button>

              <label class="shop-sort-control">
                <span>Sort by</span>
                <select v-model="sortBy">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="discount">Biggest savings</option>
                  <option value="rating">Top rated</option>
                </select>
                <i class="fa-solid fa-chevron-down"></i>
              </label>

            </div>
          </div>

          <div v-if="activeFilterCount" class="shop-active-filters">
            <span>Active filters</span>
            <button v-if="selectedCategory !== 'All Products'" type="button" @click="selectedCategory = 'All Products'">
              {{ selectedCategory }} <i class="fa-solid fa-xmark"></i>
            </button>
            <button v-for="brand in selectedBrands" :key="brand" type="button" @click="removeBrand(brand)">
              {{ brand }} <i class="fa-solid fa-xmark"></i>
            </button>
            <button v-if="priceLimit < maxPrice" type="button" @click="priceLimit = maxPrice">
              Up to {{ formatPrice(priceLimit) }} <i class="fa-solid fa-xmark"></i>
            </button>
            <button v-if="inStockOnly" type="button" @click="inStockOnly = false">
              In stock <i class="fa-solid fa-xmark"></i>
            </button>
            <button v-if="dealsOnly" type="button" @click="dealsOnly = false">
              Offers <i class="fa-solid fa-xmark"></i>
            </button>
            <button type="button" class="clear-all" @click="clearFilters">Clear all</button>
          </div>

          <div v-if="visibleProducts.length" class="products-grid product-section-grid shop-product-grid">
            <ProductCard
              v-for="product in visibleProducts"
              :key="product.title"
              :product="product"
              :wishlist-items="wishlistItems"
              :cart-quantity="cartQuantities[product.title] || 0"
              @add-to-cart="$emit('add-to-cart', $event)"
              @update-cart-quantity="$emit('update-cart-quantity', $event)"
              @quick-view="$emit('quick-view', $event)"
              @view-product="$emit('view-product', $event)"
              @add-wishlist="$emit('add-wishlist', $event)"
            />
          </div>

          <div v-else class="shop-empty-state">
            <span><i class="fa-solid fa-magnifying-glass"></i></span>
            <h3>No products match those filters.</h3>
            <p>Try widening the price range or clearing one of your selected filters.</p>
            <button type="button" @click="clearFilters">Reset filters</button>
          </div>

          <div v-if="hasMoreProducts" class="shop-load-more">
            <div class="shop-load-progress">
              <span :style="{ width: `${loadProgress}%` }"></span>
            </div>
            <p>Showing {{ visibleProducts.length }} of {{ filteredProducts.length }} products</p>
            <button type="button" @click="visibleCount += pageSize">
              Load more products <i class="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ProductCard from '@/components/product/ProductCard.vue'
import { formatPrice } from '@/utils/formatters'
import electronicsCategoryImage from '@/assets/appliance-banne1r.png'
import mobileCategoryImage from '@/assets/featured-2.png'
import appliancesCategoryImage from '@/assets/home-accessories-middle-banner.png'
import livingCategoryImage from '@/assets/home-accessories-banner.png'
import beautyCategoryImage from '@/assets/featured-4.png'
import gamingCategoryImage from '@/assets/hero-b1g.png'
import audioCategoryImage from '@/assets/hero-7.png'
import officeCategoryImage from '@/assets/home-accessories-middle-bannerpre.png'

const props = defineProps({
  products: { type: Array, default: () => [] },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantities: { type: Object, default: () => ({}) },
  searchTerm: { type: String, default: '' },
})

defineEmits([
  'go-home',
  'add-to-cart',
  'update-cart-quantity',
  'quick-view',
  'view-product',
  'add-wishlist',
])

const selectedCategory = ref('All Products')
const selectedBrands = ref([])
const sortBy = ref('featured')
const inStockOnly = ref(false)
const dealsOnly = ref(false)
const filtersOpen = ref(false)
const visibleCount = ref(12)
const pageSize = 8
const openFilters = ref({ category: true, price: true, availability: true, brand: true })

const classifyProduct = (product) => {
  const text = `${product.category || ''} ${product.title || ''}`.toLowerCase()

  if (/skin|beauty|cleanser|cream|serum|lotion|care/.test(text)) return 'Health & Beauty'
  if (/home decor|lighting|cushion|basket|tray|tableware|linen|organizer|storage|vase/.test(text)) return 'Home & Living'
  if (/mobile|phone|tablet|watch|wearable|iphone|redmi/.test(text)) return 'Mobile & Wearables'
  if (/blender|appliance|kitchen|vacuum|iron|fan|air fryer/.test(text)) return 'Home Appliances'
  if (/gaming|game|console|controller|playstation|xbox/.test(text)) return 'Gaming'
  if (/audio|headphone|earbud|speaker|jbl|beats|soundcore/.test(text)) return 'Audio'
  if (/office|printer|keyboard|mouse|laptop|computer|monitor|camera/.test(text)) return 'Office & Computing'
  return 'Electronics'
}

const categoryImages = {
  Electronics: 'https://i.pinimg.com/1200x/78/70/69/787069012be82579e63164d8001123b1.jpg',
  'Mobile & Wearables': 'https://i.pinimg.com/736x/7d/46/c9/7d46c99a56446442067c56e132781ef9.jpg',
  'Home Appliances': 'https://i.pinimg.com/736x/e2/d4/e6/e2d4e633bc3ecf782a6ad381e0524b5e.jpg',
  'Home & Living': 'https://i.pinimg.com/736x/2d/66/11/2d6611c69a1e42184f91fb37c3f57837.jpg',
  'Health & Beauty': 'https://i.pinimg.com/1200x/a3/93/fe/a393fe6fe4bfc7ad135871568affc450.jpg',
  Gaming: 'https://i.pinimg.com/736x/f6/51/db/f651dbca42fb8a6f7504cc5d7406a557.jpg',
  Audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&h=1100&q=88',
  'Office & Computing': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&h=1100&q=88',
}

const categoryFallbackImages = {
  Electronics: electronicsCategoryImage,
  'Mobile & Wearables': mobileCategoryImage,
  'Home Appliances': appliancesCategoryImage,
  'Home & Living': livingCategoryImage,
  'Health & Beauty': beautyCategoryImage,
  Gaming: gamingCategoryImage,
  Audio: audioCategoryImage,
  'Office & Computing': officeCategoryImage,
}

const categoryMeta = [
  { label: 'All Products', icon: 'fa-solid fa-grid-2' },
  { label: 'Electronics', icon: 'fa-solid fa-microchip' },
  { label: 'Mobile & Wearables', icon: 'fa-solid fa-mobile-screen-button' },
  { label: 'Home Appliances', icon: 'fa-solid fa-blender-phone' },
  { label: 'Home & Living', icon: 'fa-solid fa-couch' },
  { label: 'Health & Beauty', icon: 'fa-solid fa-spa' },
  { label: 'Gaming', icon: 'fa-solid fa-gamepad' },
  { label: 'Audio', icon: 'fa-solid fa-headphones-simple' },
  { label: 'Office & Computing', icon: 'fa-solid fa-laptop' },
]

const normalizedProducts = computed(() => props.products
  .filter((product) => !isMegaSaleProduct(product))
  .map((product, index) => ({
    ...product,
    _index: index,
    _department: classifyProduct(product),
    _brand: inferBrand(product),
  })))

const maxPrice = computed(() => {
  const highest = Math.max(...normalizedProducts.value.map((product) => Number(product.price) || 0), 10000)
  return Math.ceil(highest / 5000) * 5000
})
const priceLimit = ref(250000)

watch(maxPrice, (value) => {
  if (!priceLimit.value || priceLimit.value > value) priceLimit.value = value
}, { immediate: true })

const groupedCategories = computed(() => categoryMeta.map((category) => ({
  ...category,
  count: category.label === 'All Products'
    ? normalizedProducts.value.length
    : normalizedProducts.value.filter((product) => product._department === category.label).length,
})).filter((category) => category.label === 'All Products' || category.count > 0))

const featuredCategories = computed(() => groupedCategories.value
  .filter((category) => category.label !== 'All Products')
  .slice(0, 6)
  .map((category) => ({
    ...category,
    image: categoryImages[category.label]
      || normalizedProducts.value.find((product) => product._department === category.label)?.img,
    fallbackImage: categoryFallbackImages[category.label]
      || normalizedProducts.value.find((product) => product._department === category.label)?.img,
  })))

const brands = computed(() => {
  const counts = new Map()
  normalizedProducts.value.forEach((product) => counts.set(product._brand, (counts.get(product._brand) || 0) + 1))
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 8)
})

const dealCount = computed(() => normalizedProducts.value.filter(hasDeal).length)
const inStockCount = computed(() => normalizedProducts.value.filter((product) => !isOutOfStock(product)).length)
const pricePresets = computed(() => [10000, 25000, 50000].filter((price) => price < maxPrice.value))

const filteredProducts = computed(() => {
  const keyword = props.searchTerm.trim().toLowerCase()
  let items = normalizedProducts.value.filter((product) => {
    const matchesSearch = !keyword || `${product.title} ${product.category} ${product._brand}`.toLowerCase().includes(keyword)
    const matchesCategory = selectedCategory.value === 'All Products' || product._department === selectedCategory.value
    const matchesBrand = !selectedBrands.value.length || selectedBrands.value.includes(product._brand)
    const matchesPrice = Number(product.price || 0) <= priceLimit.value
    const matchesStock = !inStockOnly.value || !isOutOfStock(product)
    const matchesDeal = !dealsOnly.value || hasDeal(product)

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesDeal
  })

  items = [...items].sort((a, b) => {
    if (sortBy.value === 'price-low') return Number(a.price) - Number(b.price)
    if (sortBy.value === 'price-high') return Number(b.price) - Number(a.price)
    if (sortBy.value === 'discount') return discountValue(b) - discountValue(a)
    if (sortBy.value === 'rating') return Number(b.rating || b.reviews || 0) - Number(a.rating || a.reviews || 0)
    if (sortBy.value === 'newest') return b._index - a._index
    return Number(Boolean(b.badge)) - Number(Boolean(a.badge)) || a._index - b._index
  })

  return items
})

const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))
const hasMoreProducts = computed(() => visibleProducts.value.length < filteredProducts.value.length)
const loadProgress = computed(() => filteredProducts.value.length
  ? Math.min(100, (visibleProducts.value.length / filteredProducts.value.length) * 100)
  : 0)

const activeFilterCount = computed(() =>
  Number(selectedCategory.value !== 'All Products') +
  selectedBrands.value.length +
  Number(priceLimit.value < maxPrice.value) +
  Number(inStockOnly.value) +
  Number(dealsOnly.value),
)

watch([selectedCategory, selectedBrands, priceLimit, inStockOnly, dealsOnly, sortBy], () => {
  visibleCount.value = 12
}, { deep: true })

function isMegaSaleProduct(product) {
  const source = String(product.sourceSection || product.section || product.collection || '').toLowerCase()
  const badge = String(product.badge || '').toLowerCase()
  return source.includes('mega sale') || source.includes('megasale') || badge === 'mega sale'
}

function inferBrand(product) {
  const text = `${product.title || ''}`.trim()
  const knownBrands = ['Xiaomi', 'Samsung', 'Apple', 'Sony', 'JBL', 'LG', 'Philips', 'Panasonic', 'Dell', 'Asus', 'Lenovo', 'Logitech', 'Beats', 'Soundcore', 'Canon', 'Redmi']
  return knownBrands.find((brand) => text.toLowerCase().includes(brand.toLowerCase())) || 'Zappy Select'
}

function isOutOfStock(product) {
  return product.outOfStock || product.stock === 'out' || product.stockStatus === 'out' || String(product.badge || '').toLowerCase().includes('out of stock')
}

function hasDeal(product) {
  return Number(product.old || 0) > Number(product.price || 0) || Boolean(product.discount) || /sale|deal|off|mega/i.test(String(product.badge || ''))
}

function discountValue(product) {
  if (!product.old || Number(product.old) <= Number(product.price)) return 0
  return ((Number(product.old) - Number(product.price)) / Number(product.old)) * 100
}

function compactPrice(value) {
  if (value >= 1000) return `Rs. ${Math.round(value / 1000)}K`
  return `Rs. ${value}`
}

function toggleFilter(key) {
  openFilters.value[key] = !openFilters.value[key]
}

function useCategoryFallback(event, fallbackImage) {
  const image = event.currentTarget
  if (!image || !fallbackImage || image.dataset.fallbackApplied === 'true') return

  image.dataset.fallbackApplied = 'true'
  image.src = fallbackImage
}

function selectCategory(label) {
  selectedCategory.value = label
  visibleCount.value = 12
  document.querySelector('.shop-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function removeBrand(brand) {
  selectedBrands.value = selectedBrands.value.filter((item) => item !== brand)
}

function clearFilters() {
  selectedCategory.value = 'All Products'
  selectedBrands.value = []
  priceLimit.value = maxPrice.value
  inStockOnly.value = false
  dealsOnly.value = false
  sortBy.value = 'featured'
}

function activateDeals() {
  dealsOnly.value = true
  filtersOpen.value = false
}
</script>
