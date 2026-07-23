<template>
  <Teleport to="body">
    <Transition name="qv-pro-transition">
      <div v-if="product" class="qv-pro-layer" @keydown.esc="closeModal">
        <button
          class="qv-pro-backdrop"
          type="button"
          aria-label="Close product quick view"
          @click="closeModal"
        ></button>

        <section
          ref="dialogRef"
          class="qv-pro-modal qv-pro-drawer"
          role="dialog"
          aria-modal="true"
          :aria-label="`${product.title} quick view`"
          tabindex="-1"
        >
          <header class="qv-pro-header">
            <div>
              <span class="qv-pro-header-kicker">Quick view</span>
              <strong>Review the essentials before you buy</strong>
            </div>

            <button class="qv-pro-close" type="button" aria-label="Close quick view" @click="closeModal">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </header>

          <div class="qv-pro-main">
            <div class="qv-pro-gallery-column">
              <div class="qv-pro-image-stage">
                <span v-if="product.badge" class="qv-pro-product-badge">{{ product.badge }}</span>

                <button
                  class="qv-pro-heart"
                  type="button"
                  :class="{ active: isWishlisted }"
                  :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
                  @click="$emit('add-wishlist', product)"
                >
                  <i :class="isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" aria-hidden="true"></i>
                </button>

                <div class="qv-pro-image-window">
                  <img
                    :key="`${product.title}-${activeGalleryIndex}`"
                    :src="product.img || fallbackImage"
                    :alt="product.title"
                    :style="activeGalleryStyle"
                  />
                </div>

                <div class="qv-pro-image-assurance">
                  <i class="fa-solid fa-shield-check" aria-hidden="true"></i>
                  <span>Authentic product imagery</span>
                </div>
              </div>

              <div class="qv-pro-thumbnails" aria-label="Product image views">
                <button
                  v-for="(view, index) in galleryViews"
                  :key="view.label"
                  type="button"
                  :class="{ active: activeGalleryIndex === index }"
                  :aria-label="view.label"
                  @click="activeGalleryIndex = index"
                >
                  <img
                    :src="product.img || fallbackImage"
                    :alt="`${product.title} ${view.label}`"
                    :style="view.thumbnailStyle"
                  />
                </button>
              </div>
            </div>

            <div class="qv-pro-details-column">
              <div class="qv-pro-topline">
                <span>{{ product.category || 'Featured product' }}</span>
                <span class="qv-pro-stock"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> In stock</span>
              </div>

              <h2>{{ product.title }}</h2>

              <div class="qv-pro-rating-row">
                <div class="qv-pro-stars" aria-label="Rated 4.8 out of 5">
                  <i v-for="star in 5" :key="star" class="fa-solid fa-star" aria-hidden="true"></i>
                </div>
                <strong>4.8</strong>
                <span>{{ reviewCount }} verified reviews</span>
              </div>

              <div class="qv-pro-price-block">
                <div class="qv-pro-price-line">
                  <strong>{{ formatPrice(product.price) }}</strong>
                  <del v-if="product.old">{{ formatPrice(product.old) }}</del>
                  <span v-if="discountPercent > 0">Save {{ discountPercent }}%</span>
                </div>
                <p>
                  or 3 × <b>{{ formatPrice(Math.round(product.price / 3)) }}</b> with
                  <span class="koko-label">KOKO</span>
                </p>
              </div>

              <p class="qv-pro-summary">{{ productSummary }}</p>

              <div v-if="optionGroups.length" class="qv-pro-options-area">
                <div v-for="group in optionGroups" :key="group.key" class="qv-pro-option-group">
                  <div class="qv-pro-option-heading">
                    <span>{{ group.label }}</span>
                    <strong>{{ selectedOptions[group.key] }}</strong>
                  </div>

                  <div class="qv-pro-option-list" :class="{ 'is-colours': group.type === 'colour' }">
                    <button
                      v-for="choice in group.choices"
                      :key="choice.label"
                      type="button"
                      :class="{ active: selectedOptions[group.key] === choice.label }"
                      :title="choice.label"
                      @click="selectOption(group.key, choice.label)"
                    >
                      <span
                        v-if="group.type === 'colour'"
                        class="qv-pro-colour-dot"
                        :style="{ background: choice.value }"
                      ></span>
                      <span>{{ choice.label }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="qv-pro-order-row">
                <div class="qv-pro-quantity-block">
                  <span>Quantity</span>
                  <div class="qv-pro-quantity">
                    <button type="button" aria-label="Reduce quantity" :disabled="quantity <= 1" @click="decreaseQuantity">
                      <i class="fa-solid fa-minus" aria-hidden="true"></i>
                    </button>
                    <strong>{{ quantity }}</strong>
                    <button type="button" aria-label="Increase quantity" :disabled="quantity >= maxQuantity" @click="increaseQuantity">
                      <i class="fa-solid fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                <div class="qv-pro-availability">
                  <strong>Ready to dispatch</strong>
                  <span>Usually leaves our store in 1–3 working days.</span>
                </div>
              </div>

              <div class="qv-pro-actions">
                <button class="qv-pro-add" type="button" @click="addSelectedQuantity">
                  <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                  Add to cart
                </button>

                <button class="qv-pro-checkout" type="button" @click="quickCheckout">
                  Checkout now
                  <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>

              <div class="qv-pro-trust-row">
                <div><i class="fa-solid fa-truck-fast" aria-hidden="true"></i><span>Islandwide delivery</span></div>
                <div><i class="fa-solid fa-shield-halved" aria-hidden="true"></i><span>Secure payment</span></div>
                <div><i class="fa-solid fa-rotate-left" aria-hidden="true"></i><span>Easy returns</span></div>
              </div>
            </div>
          </div>

          <div class="qv-pro-info-panel">
            <nav class="qv-pro-tabs" aria-label="Quick product information">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                type="button"
                :class="{ active: activeTab === tab.key }"
                @click="activeTab = tab.key"
              >
                {{ tab.label }}
              </button>
            </nav>

            <div class="qv-pro-tab-content">
              <template v-if="activeTab === 'overview'">
                <p>{{ productSummary }}</p>
                <ul>
                  <li v-for="feature in keyFeatures" :key="feature">{{ feature }}</li>
                </ul>
              </template>

              <template v-else-if="activeTab === 'delivery'">
                <div class="qv-pro-delivery-grid">
                  <div>
                    <i class="fa-solid fa-store" aria-hidden="true"></i>
                    <strong>Store pickup</strong>
                    <span>Collect after order confirmation.</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-truck" aria-hidden="true"></i>
                    <strong>Home delivery</strong>
                    <span>Calculated at checkout based on your city.</span>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="qv-pro-review-summary">
                  <strong>4.8</strong>
                  <div>
                    <div class="qv-pro-stars">
                      <i v-for="star in 5" :key="star" class="fa-solid fa-star" aria-hidden="true"></i>
                    </div>
                    <span>Customers value the product quality, packaging and delivery experience.</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { formatPrice } from '@/utils/formatters'
import fallbackImage from '@/assets/product-5.webp'

const props = defineProps({
  product: { type: Object, default: null },
  isWishlisted: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'add-to-cart', 'quick-checkout', 'add-wishlist'])

const dialogRef = ref(null)
const quantity = ref(1)
const activeGalleryIndex = ref(0)
const activeTab = ref('overview')
const selectedOptions = reactive({})
const maxQuantity = 99

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'delivery', label: 'Delivery & pickup' },
  { key: 'reviews', label: 'Reviews' },
]

const galleryViews = [
  {
    label: 'Main view',
    imageStyle: { transform: 'scale(1)', objectPosition: 'center' },
    thumbnailStyle: { transform: 'scale(1)', objectPosition: 'center' },
  },
  {
    label: 'Detail view',
    imageStyle: { transform: 'scale(1.34)', objectPosition: '38% 44%' },
    thumbnailStyle: { transform: 'scale(1.22)', objectPosition: '38% 44%' },
  },
  {
    label: 'Close-up view',
    imageStyle: { transform: 'scale(1.5)', objectPosition: '65% 50%' },
    thumbnailStyle: { transform: 'scale(1.34)', objectPosition: '65% 50%' },
  },
  {
    label: 'Alternate view',
    imageStyle: { transform: 'scale(1.24)', objectPosition: '50% 72%' },
    thumbnailStyle: { transform: 'scale(1.16)', objectPosition: '50% 72%' },
  },
]

const normalizeText = computed(() => `${props.product?.title || ''} ${props.product?.category || ''}`.toLowerCase())

const colourChoices = [
  { label: 'Black', value: '#1b1d22' },
  { label: 'Blue', value: '#315b87' },
  { label: 'White', value: '#f5f5f1' },
  { label: 'Grey', value: '#9298a2' },
]

const optionGroups = computed(() => {
  const text = normalizeText.value

  if (/shoe|fashion|shirt|wear|backpack|bag/.test(text)) {
    return [
      { key: 'size', label: 'Size', choices: ['38', '40', '42', '44'].map(label => ({ label })) },
      { key: 'colour', label: 'Colour', type: 'colour', choices: colourChoices },
    ]
  }

  if (/phone|mobile|tablet/.test(text)) {
    return [
      { key: 'storage', label: 'Storage', choices: ['128 GB', '256 GB', '512 GB'].map(label => ({ label })) },
      { key: 'colour', label: 'Colour', type: 'colour', choices: colourChoices },
    ]
  }

  if (/tv|television/.test(text)) {
    return [
      { key: 'screenSize', label: 'Screen size', choices: ['43 inch', '55 inch', '65 inch'].map(label => ({ label })) },
      { key: 'warranty', label: 'Warranty', choices: ['1 Year', '2 Years'].map(label => ({ label })) },
    ]
  }

  if (/ssd|storage|drive|memory/.test(text)) {
    return [
      { key: 'capacity', label: 'Capacity', choices: ['512 GB', '1 TB', '2 TB'].map(label => ({ label })) },
      { key: 'connection', label: 'Connection', choices: ['USB-C', 'USB 3.2'].map(label => ({ label })) },
    ]
  }

  if (/headphone|audio|speaker|earbud/.test(text)) {
    return [
      { key: 'colour', label: 'Colour', type: 'colour', choices: colourChoices },
      { key: 'connection', label: 'Connection', choices: ['Bluetooth', 'Wired'].map(label => ({ label })) },
    ]
  }

  if (/gaming|console|ps5|game player/.test(text)) {
    return [
      { key: 'edition', label: 'Edition', choices: ['Standard', 'Bundle'].map(label => ({ label })) },
      { key: 'storage', label: 'Storage', choices: ['64 GB', '128 GB'].map(label => ({ label })) },
    ]
  }

  if (/skin|cream|cleanser|serum|lotion|beauty/.test(text)) {
    return [
      { key: 'size', label: 'Pack size', choices: ['50 ml', '100 ml', '200 ml'].map(label => ({ label })) },
      { key: 'skinType', label: 'Skin type', choices: ['All skin', 'Dry', 'Sensitive'].map(label => ({ label })) },
    ]
  }

  if (/lamp|vase|cushion|decor|basket|tray|tableware|pillow/.test(text)) {
    return [
      { key: 'finish', label: 'Finish', choices: ['Classic', 'Natural', 'Modern'].map(label => ({ label })) },
      { key: 'colour', label: 'Colour', type: 'colour', choices: colourChoices },
    ]
  }

  return [
    { key: 'model', label: 'Model', choices: ['Standard', 'Premium'].map(label => ({ label })) },
    { key: 'warranty', label: 'Warranty', choices: ['6 Months', '1 Year'].map(label => ({ label })) },
  ]
})

const activeGalleryStyle = computed(() => galleryViews[activeGalleryIndex.value]?.imageStyle || galleryViews[0].imageStyle)
const reviewCount = computed(() => Number(props.product?.reviews) || 18)
const discountPercent = computed(() => {
  const price = Number(props.product?.price) || 0
  const old = Number(props.product?.old) || 0
  if (!old || old <= price) return 0
  return Math.round(((old - price) / old) * 100)
})

const productSummary = computed(() => {
  const text = normalizeText.value
  if (/skin|cream|cleanser|serum|lotion|beauty/.test(text)) return 'A carefully selected personal-care essential designed for a simple, comfortable daily routine.'
  if (/lamp|vase|cushion|decor|basket|tray|tableware|pillow/.test(text)) return 'A considered home piece that combines everyday function with a clean, modern finish.'
  if (/gaming|console|ps5|game player/.test(text)) return 'Responsive entertainment hardware selected for smooth everyday play and reliable performance.'
  if (/phone|mobile|tablet/.test(text)) return 'A practical connected device with balanced performance, storage and everyday usability.'
  if (/headphone|audio|speaker|earbud/.test(text)) return 'Clear sound, comfortable everyday use and dependable connectivity in one refined audio product.'
  return 'A quality-tested LK Shop product selected for dependable everyday performance and straightforward ownership.'
})

const keyFeatures = computed(() => {
  const text = normalizeText.value
  if (/skin|cream|cleanser|serum|lotion|beauty/.test(text)) return ['Easy to include in a daily routine', 'Carefully packed before dispatch', 'Simple product selection options']
  if (/lamp|vase|cushion|decor|basket|tray|tableware|pillow/.test(text)) return ['Clean contemporary finish', 'Made for everyday home use', 'Carefully packed for delivery']
  if (/gaming|console|ps5|game player/.test(text)) return ['Responsive controls', 'Multiple configuration choices', 'Protected local warranty options']
  return ['Verified product selection', 'Secure local checkout', 'Islandwide delivery support']
})

watch(
  () => props.product,
  async (product) => {
    quantity.value = 1
    activeGalleryIndex.value = 0
    activeTab.value = 'overview'
    Object.keys(selectedOptions).forEach(key => delete selectedOptions[key])

    optionGroups.value.forEach((group) => {
      selectedOptions[group.key] = group.choices[0]?.label || ''
    })

    document.body.style.overflow = product ? 'hidden' : ''

    if (product) {
      await nextTick()
      dialogRef.value?.focus()
    }
  },
  { immediate: true },
)

watch(optionGroups, (groups) => {
  groups.forEach((group) => {
    if (!selectedOptions[group.key]) selectedOptions[group.key] = group.choices[0]?.label || ''
  })
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

const closeModal = () => emit('close')
const decreaseQuantity = () => { if (quantity.value > 1) quantity.value -= 1 }
const increaseQuantity = () => { if (quantity.value < maxQuantity) quantity.value += 1 }
const selectOption = (key, value) => { selectedOptions[key] = value }

const selectedProductPayload = () => ({
  product: {
    ...props.product,
    selectedOptions: { ...selectedOptions },
  },
  quantity: quantity.value,
})

const addSelectedQuantity = () => emit('add-to-cart', selectedProductPayload())
const quickCheckout = () => emit('quick-checkout', selectedProductPayload())
</script>
