<template>
  <div class="pro-pdp pro-pdp--sticky-commerce">
    <section class="pro-pdp-product">
      <div class="pro-pdp-container">
        <nav class="pro-pdp-breadcrumb" aria-label="Breadcrumb">
          <button type="button" @click="$emit('go-home')">Home</button>
          <i class="fa-solid fa-chevron-right"></i>
          <button type="button" @click="$emit('go-home')">Shop</button>
          <i class="fa-solid fa-chevron-right"></i>
          <span>{{ product.category }}</span>
          <i class="fa-solid fa-chevron-right"></i>
          <strong>{{ product.title }}</strong>
        </nav>

        <div class="pro-pdp-layout pro-pdp-layout--three-column">
          <section class="pro-pdp-gallery" aria-label="Product gallery">
            <div class="pro-pdp-main-visual" :class="`is-${activeGalleryView.mode}`">
              <div class="pro-pdp-visual-top">
                <span v-if="product.badge" class="pro-pdp-badge">{{ product.badge }}</span>
                <div class="pro-pdp-gallery-tools">
                  <button
                    type="button"
                    :class="{ active: isWishlisted }"
                    :aria-label="isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'"
                    @click="$emit('add-wishlist', product)"
                  >
                    <i :class="isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
                  </button>
                  <button type="button" aria-label="Enlarge product image" @click="showZoom = true">
                    <i class="fa-solid fa-expand"></i>
                  </button>
                </div>
              </div>

              <button
                class="pro-pdp-image-button"
                :class="{ 'is-hover-zoomed': imageHoverZoom }"
                type="button"
                aria-label="Hover to magnify or click to open the enlarged product image"
                @mouseenter="imageHoverZoom = true"
                @mousemove="handleImageHoverZoom"
                @mouseleave="resetImageHoverZoom"
                @blur="resetImageHoverZoom"
                @click="showZoom = true"
              >
                <img
                  :src="activeGalleryView.image"
                  :alt="product.title"
                  :style="{ transformOrigin: imageHoverOrigin }"
                />
                <span class="pro-pdp-hover-magnifier" aria-hidden="true">
                  <i class="fa-solid fa-magnifying-glass-plus"></i>
                </span>
              </button>

              <div class="pro-pdp-visual-bottom">
                <span>{{ activeGalleryView.label }}</span>
                <small>{{ activeViewIndex + 1 }} / {{ galleryViews.length }}</small>
              </div>
            </div>

            <div class="pro-pdp-thumbnails" aria-label="Choose product image">
              <button
                v-for="(view, index) in galleryViews"
                :key="`${view.label}-${index}`"
                type="button"
                :class="[{ active: activeViewIndex === index }, `is-${view.mode}`]"
                :aria-label="`View ${view.label}`"
                @click="activeViewIndex = index"
              >
                <img :src="view.image" :alt="`${product.title} ${view.label}`" />
              </button>
            </div>

            <div class="pro-pdp-gallery-statement">
              <i class="fa-solid fa-quote-left"></i>
              <p>{{ overviewHeading }}</p>
              <button type="button" @click="shareProduct">
                <i class="fa-solid fa-arrow-up-from-bracket"></i>
                {{ shareLabel }}
              </button>
            </div>
          </section>

          <main class="pro-pdp-details">
            <div class="pro-pdp-details-topline">
              <span>{{ product.brand || 'ZappyMart Select' }}</span>
              <span :class="{ unavailable: isOutOfStock }">
                <i class="fa-solid fa-circle"></i>
                {{ isOutOfStock ? 'Currently unavailable' : 'Available now' }}
              </span>
            </div>

            <h1>{{ product.title }}</h1>
            <p class="pro-pdp-lead">{{ description }}</p>

            <div class="pro-pdp-product-meta">
              <div class="pro-pdp-rating">
                <div class="pro-pdp-stars" :aria-label="`${rating} out of 5 stars`">
                  <i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
                </div>
                <button type="button" @click="scrollToInformation('Reviews')">
                  {{ rating }} rating · {{ reviewCount }} reviews
                </button>
              </div>
              <span>Item # {{ sku }}</span>
            </div>

            <div class="pro-pdp-price-snapshot">
              <div>
                <strong>{{ formatPrice(product.price) }}</strong>
                <del v-if="product.old">{{ formatPrice(product.old) }}</del>
              </div>
              <span v-if="discountPercent">You save {{ discountPercent }}%</span>
              <p>
                Pay in 3 interest-free instalments of
                <strong>{{ formatPrice(Math.round(product.price / 3)) }}</strong>
                with KOKO.
              </p>
            </div>

            <div class="pro-pdp-availability-row">
              <span>Availability</span>
              <strong :class="{ unavailable: isOutOfStock }">
                {{ isOutOfStock ? 'Out of stock' : 'In stock' }}
                <i :class="isOutOfStock ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-check'"></i>
              </strong>
            </div>

            <div v-if="optionGroups.length" class="pro-pdp-options-panel">
              <section v-for="group in optionGroups" :key="group.key" class="pro-pdp-option-group">
                <div class="pro-pdp-option-heading">
                  <div>
                    <span>{{ group.label }}</span>
                    <strong>{{ selectedOptions[group.key] }}</strong>
                  </div>
                  <button v-if="group.guideLabel" type="button" @click="openGuide(group)">
                    {{ group.guideLabel }}
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>

                <div v-if="group.display === 'swatch'" class="pro-pdp-swatches" role="radiogroup">
                  <button
                    v-for="choice in group.values"
                    :key="choice.value"
                    type="button"
                    role="radio"
                    :disabled="choice.disabled"
                    :aria-checked="selectedOptions[group.key] === choice.value"
                    :class="{ active: selectedOptions[group.key] === choice.value }"
                    @click="selectOption(group.key, choice)"
                  >
                    <span :style="{ backgroundColor: choice.color }"></span>
                    <small>{{ choice.label }}</small>
                  </button>
                </div>

                <div v-else class="pro-pdp-choice-list" role="radiogroup">
                  <button
                    v-for="choice in group.values"
                    :key="choice.value"
                    type="button"
                    role="radio"
                    :disabled="choice.disabled"
                    :aria-checked="selectedOptions[group.key] === choice.value"
                    :class="{ active: selectedOptions[group.key] === choice.value }"
                    @click="selectOption(group.key, choice)"
                  >
                    <span>{{ choice.label }}</span>
                    <small v-if="choice.note">{{ choice.note }}</small>
                  </button>
                </div>
              </section>
            </div>

            <div class="pro-pdp-assurance-ribbon">
              <article v-for="item in assuranceItems" :key="item.title">
                <i :class="item.icon"></i>
                <div>
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.text }}</span>
                </div>
              </article>
            </div>

            <div class="pro-pdp-feature-preview">
              <div class="pro-pdp-mini-heading">
                <span>Product highlights</span>
                <button type="button" @click="scrollToInformation('Overview')">View full details</button>
              </div>
              <ul>
                <li v-for="feature in features.slice(0, 3)" :key="feature">
                  <i class="fa-solid fa-check"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </main>

          <aside class="pro-pdp-checkout-column" aria-label="Purchase options">
            <div class="pro-pdp-checkout-card">
              <div class="pro-pdp-checkout-price">
                <strong>{{ formatPrice(product.price) }}</strong>
                <del v-if="product.old">{{ formatPrice(product.old) }}</del>
              </div>

              <div v-if="discountPercent" class="pro-pdp-deal-label">
                <i class="fa-solid fa-bolt"></i>
                Limited-time saving · {{ discountPercent }}% off
              </div>

              <div class="pro-pdp-delivery-estimate">
                <i class="fa-solid fa-truck-fast"></i>
                <div>
                  <span>Estimated delivery</span>
                  <strong>{{ isOutOfStock ? 'Unavailable' : 'Within 2–5 working days' }}</strong>
                </div>
              </div>

              <div class="pro-pdp-selected-summary">
                <span>Selected options</span>
                <strong>{{ selectedOptionsLabel }}</strong>
              </div>

              <div class="pro-pdp-checkout-quantity">
                <span>Quantity</span>
                <div class="pro-pdp-quantity">
                  <button type="button" :disabled="quantity <= 1" @click="quantity -= 1" aria-label="Reduce quantity">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <strong>{{ quantity }}</strong>
                  <button type="button" :disabled="quantity >= maxQuantity" @click="quantity += 1" aria-label="Increase quantity">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>

              <p class="pro-pdp-stock-alert" :class="{ unavailable: isOutOfStock }">
                <i :class="isOutOfStock ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-fire-flame-curved'"></i>
                {{ isOutOfStock ? 'This product is currently unavailable.' : 'Popular item — order while stock is available.' }}
              </p>

              <div class="pro-pdp-checkout-actions">
                <button class="pro-pdp-cart" type="button" :disabled="isOutOfStock" @click="addSelectedQuantity">
                  <i class="fa-solid fa-bag-shopping"></i>
                  Add to cart
                </button>
                <button class="pro-pdp-buy" type="button" :disabled="isOutOfStock" @click="buySelectedQuantity">
                  Buy now
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div class="pro-pdp-secure-box">
                <div>
                  <i class="fa-solid fa-lock"></i>
                  <strong>Secure transaction</strong>
                </div>
                <p>Your checkout and payment information are protected.</p>
              </div>

              <div class="pro-pdp-checkout-services">
                <article v-for="fact in purchaseFacts" :key="fact.label">
                  <span>{{ fact.label }}</span>
                  <strong>{{ fact.value }}</strong>
                </article>
              </div>

              <div class="pro-pdp-payment-row" aria-label="Accepted payment methods">
                <div class="pro-pdp-payment-heading">
                  <span>Payment methods</span>
                  <small><i class="fa-solid fa-lock" aria-hidden="true"></i> Secure checkout</small>
                </div>

                <div class="pro-pdp-payment-logos" role="list">
                  <span
                    class="pro-pdp-payment-logo pro-pdp-payment-logo--visa"
                    role="listitem"
                    aria-label="Visa"
                    title="Visa"
                  >
                    <span class="pro-pdp-visa-wordmark">VISA</span>
                  </span>

                  <span
                    class="pro-pdp-payment-logo pro-pdp-payment-logo--mastercard"
                    role="listitem"
                    aria-label="Mastercard"
                    title="Mastercard"
                  >
                    <span class="pro-pdp-mastercard-symbol" aria-hidden="true">
                      <i></i>
                      <i></i>
                    </span>
                    <span class="pro-pdp-mastercard-wordmark">mastercard</span>
                  </span>

                  <span
                    class="pro-pdp-payment-logo pro-pdp-payment-logo--koko"
                    role="listitem"
                    aria-label="KOKO"
                    title="KOKO"
                  >
                    <span class="pro-pdp-koko-wordmark">koko</span>
                    <small>pay in 3</small>
                  </span>

                  <span
                    class="pro-pdp-payment-logo pro-pdp-payment-logo--mintpay"
                    role="listitem"
                    aria-label="Mintpay"
                    title="Mintpay"
                  >
                    <span class="pro-pdp-mintpay-wordmark">
                      <b>mint</b><em>pay</em>
                    </span>
                  </span>
                </div>
              </div>

              <div class="pro-pdp-checkout-utilities">
                <button type="button" :class="{ active: isWishlisted }" @click="$emit('add-wishlist', product)">
                  <i :class="isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
                  {{ isWishlisted ? 'Saved to wishlist' : 'Save to wishlist' }}
                </button>
                <button type="button" @click="shareProduct">
                  <i class="fa-solid fa-arrow-up-from-bracket"></i>
                  {{ shareLabel }}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section ref="informationSection" class="pro-pdp-information">
      <div class="pro-pdp-container">
        <div class="pro-pdp-tabs" role="tablist" aria-label="Product information">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="activeTab === 'Overview'" class="pro-pdp-overview">
          <div>
            <span class="pro-pdp-kicker">Product overview</span>
            <h2>{{ overviewHeading }}</h2>
            <p>{{ description }}</p>
          </div>
          <div class="pro-pdp-features">
            <article v-for="(feature, index) in features" :key="feature">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ feature }}</p>
            </article>
          </div>
        </div>

        <div v-else-if="activeTab === 'Specifications'" class="pro-pdp-specs">
          <div class="pro-pdp-section-intro">
            <span class="pro-pdp-kicker">Product details</span>
            <h2>Everything important, clearly listed.</h2>
          </div>
          <div class="pro-pdp-spec-table">
            <div v-for="item in specifications" :key="item.label">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'Reviews'" class="pro-pdp-reviews">
          <div class="pro-pdp-review-score">
            <span class="pro-pdp-kicker">Customer feedback</span>
            <strong>{{ rating }}</strong>
            <div class="pro-pdp-stars"><i v-for="star in 5" :key="star" class="fa-solid fa-star"></i></div>
            <p>Based on {{ reviewCount }} verified reviews</p>
            <button type="button" @click="showReviewForm = true">Write a review</button>
          </div>
          <article class="pro-pdp-review-card">
            <div><span>ZM</span><strong>Verified customer</strong></div>
            <div class="pro-pdp-stars"><i v-for="star in 5" :key="star" class="fa-solid fa-star"></i></div>
            <h3>Exactly as described and carefully packed.</h3>
            <p>The product matched the listing, arrived securely packed and the ordering process was straightforward.</p>
          </article>
        </div>

        <div v-else class="pro-pdp-delivery">
          <div class="pro-pdp-section-intro">
            <span class="pro-pdp-kicker">Delivery and aftercare</span>
            <h2>Simple ordering. Dependable support.</h2>
          </div>
          <div class="pro-pdp-delivery-grid">
            <article v-for="item in deliveryItems" :key="item.title">
              <i :class="item.icon"></i>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section v-if="filteredRelatedProducts.length" class="pro-pdp-related">
      <div class="pro-pdp-container">
        <div class="pro-pdp-related-head">
          <div>
            <span class="pro-pdp-kicker">You may also like</span>
            <h2>Related products</h2>
          </div>
          <button type="button" @click="$emit('go-home')">View all <i class="fa-solid fa-arrow-right"></i></button>
        </div>

        <div class="pro-pdp-related-grid">
          <article v-for="item in filteredRelatedProducts.slice(0, 4)" :key="item.title" class="pro-pdp-product-card">
            <button class="pro-pdp-card-image" type="button" @click="$emit('view-product', item)">
              <span v-if="item.badge">{{ item.badge }}</span>
              <img :src="item.img" :alt="item.title" />
            </button>
            <div class="pro-pdp-card-body">
              <span>{{ item.category }}</span>
              <button type="button" @click="$emit('view-product', item)">{{ item.title }}</button>
              <div class="pro-pdp-card-price">
                <strong>{{ formatPrice(item.price) }}</strong>
                <del v-if="item.old">{{ formatPrice(item.old) }}</del>
              </div>
              <button type="button" @click="$emit('add-to-cart', item)">
                Add to cart <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <div v-if="showZoom" class="pro-pdp-overlay" @click.self="showZoom = false">
      <div class="pro-pdp-zoom-modal" role="dialog" aria-modal="true" aria-label="Enlarged product image">
        <button type="button" aria-label="Close image" @click="showZoom = false"><i class="fa-solid fa-xmark"></i></button>
        <img :src="activeGalleryView.image" :alt="product.title" />
        <span>{{ product.title }}</span>
      </div>
    </div>

    <div v-if="activeGuideGroup" class="pro-pdp-overlay" @click.self="activeGuideGroup = null">
      <div class="pro-pdp-guide-modal" role="dialog" aria-modal="true" aria-label="Option guide">
        <button type="button" aria-label="Close guide" @click="activeGuideGroup = null"><i class="fa-solid fa-xmark"></i></button>
        <span class="pro-pdp-kicker">{{ activeGuideGroup.guideLabel }}</span>
        <h2>Choose the best {{ activeGuideGroup.label.toLowerCase() }} for you.</h2>
        <p>{{ activeGuideGroup.guideCopy }}</p>
        <div>
          <article v-for="choice in activeGuideGroup.values" :key="choice.value">
            <span>{{ choice.label }}</span>
            <strong>{{ choice.note || 'Available option' }}</strong>
          </article>
        </div>
      </div>
    </div>

    <div v-if="showReviewForm" class="pro-pdp-overlay" @click.self="showReviewForm = false">
      <form class="pro-pdp-review-modal" @submit.prevent="submitReview">
        <button type="button" aria-label="Close review form" @click="showReviewForm = false"><i class="fa-solid fa-xmark"></i></button>
        <span class="pro-pdp-kicker">Share your experience</span>
        <h2>Write a review</h2>
        <div class="pro-pdp-review-input-stars">
          <button v-for="star in 5" :key="star" type="button" :class="{ active: star <= localReviewRating }" @click="localReviewRating = star">
            <i class="fa-solid fa-star"></i>
          </button>
        </div>
        <textarea v-model="reviewText" rows="5" placeholder="Tell other customers what you liked..." required></textarea>
        <button class="pro-pdp-review-submit" type="submit">Submit review</button>
      </form>
    </div>

    <div v-if="reviewSubmitted" class="pro-pdp-toast">
      <i class="fa-solid fa-circle-check"></i>
      Thank you. Your review has been submitted.
    </div>

    <div class="pro-pdp-mobile-bar">
      <div><span>{{ formatPrice(product.price) }}</span><small>{{ selectedOptionsLabel }}</small></div>
      <button type="button" :disabled="isOutOfStock" @click="addSelectedQuantity">{{ isOutOfStock ? 'Out of stock' : 'Add to cart' }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  product: { type: Object, required: true },
  relatedProducts: { type: Array, default: () => [] },
  wishlistItems: { type: Array, default: () => [] },
  cartQuantities: { type: Object, default: () => ({}) },
})

const emit = defineEmits([
  'go-home',
  'add-to-cart',
  'update-cart-quantity',
  'buy-now',
  'quick-view',
  'view-product',
  'add-wishlist',
])

const tabs = ['Overview', 'Specifications', 'Reviews', 'Delivery & returns']
const activeTab = ref('Overview')
const activeViewIndex = ref(0)
const quantity = ref(1)
const maxQuantity = 99
const selectedOptions = ref({})
const informationSection = ref(null)
const showZoom = ref(false)
const activeGuideGroup = ref(null)
const showReviewForm = ref(false)
const reviewSubmitted = ref(false)
const localReviewRating = ref(5)
const reviewText = ref('')
const shareLabel = ref('Share')
const imageHoverZoom = ref(false)
const imageHoverOrigin = ref('50% 50%')
let reviewTimer
let shareTimer

const productText = computed(() => `${props.product.title || ''} ${props.product.category || ''}`.toLowerCase())
const categoryKey = computed(() => String(props.product.category || '').toLowerCase())

const isMegaSaleProduct = (item) => {
  const category = String(item?.category || '').toLowerCase()
  const badge = String(item?.badge || '').toLowerCase()
  const image = String(item?.img || '').toLowerCase()

  return category.includes('mega sale') || badge === 'mega sale' || image.includes('mega-sale-')
}

const filteredRelatedProducts = computed(() => props.relatedProducts.filter((item) =>
  item &&
  item.title !== props.product.title &&
  !isMegaSaleProduct(item),
))
const isWishlisted = computed(() => props.wishlistItems.includes(props.product.title))
const isOutOfStock = computed(() =>
  props.product.outOfStock ||
  props.product.stock === 'out' ||
  props.product.stockStatus === 'out' ||
  String(props.product.badge || '').toLowerCase().includes('out of stock'),
)
const discountPercent = computed(() => {
  if (!props.product.old || props.product.old <= props.product.price) return 0
  return Math.round(((props.product.old - props.product.price) / props.product.old) * 100)
})
const rating = computed(() => Number(props.product.rating || 4.8).toFixed(1))
const reviewCount = computed(() => props.product.reviews || 24)
const sku = computed(() => props.product.sku || props.product.title
  .toUpperCase()
  .replace(/[^A-Z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 16))
const warrantyLabel = computed(() => props.product.warranty || 'Seller warranty')

const colourChoice = (label, color, extra = {}) => ({ label, value: label, color, ...extra })
const textChoice = (label, note = '', extra = {}) => ({ label, value: label, note, ...extra })

const normalizeChoices = (values = []) => values.map((choice) => {
  if (typeof choice === 'string' || typeof choice === 'number') return textChoice(String(choice))
  const label = String(choice.label ?? choice.value ?? '')
  return {
    label,
    value: String(choice.value ?? label),
    color: choice.color || choice.hex,
    note: choice.note || choice.description || '',
    disabled: Boolean(choice.disabled),
  }
}).filter((choice) => choice.label)

const productProfile = computed(() => {
  const text = productText.value
  const is = (...terms) => terms.some((term) => text.includes(term))

  if (is('safety shoe', 'shoe', 'footwear')) {
    return {
      description: 'Protective everyday footwear designed for dependable grip, comfortable movement and practical use across demanding work environments.',
      overviewHeading: 'Protection, comfort and dependable everyday grip.',
      features: ['Slip-resistant outsole for steadier movement', 'Supportive fit for longer working hours', 'Durable upper designed for daily use'],
      optionGroups: [
        {
          key: 'colour', label: 'Colour', display: 'swatch',
          values: [colourChoice('Black', '#1d2228'), colourChoice('Black / Yellow', '#d8b600'), colourChoice('Graphite', '#555d66')],
        },
        {
          key: 'size', label: 'UK size', display: 'button', guideLabel: 'Size guide',
          guideCopy: 'Choose your normal UK shoe size. Select the larger size when you are between sizes or prefer extra room.',
          values: ['6', '7', '8', '9', '10', '11'].map((size) => textChoice(size, `UK size ${size}`)),
        },
        {
          key: 'fit', label: 'Fit', display: 'button',
          values: [textChoice('Regular', 'Standard everyday fit'), textChoice('Wide', 'Extra forefoot room')],
        },
      ],
      specs: [
        ['Product type', 'Protective safety footwear'], ['Upper', 'Durable synthetic leather'], ['Outsole', 'High-grip rubber'],
        ['Closure', 'Lace-up'], ['Fit', 'Regular or wide'], ['Recommended use', 'Workshop, warehouse and site work'],
      ],
    }
  }

  if (is('drill', 'grinder', 'power tool', 'brush cutter')) {
    const wattage = props.product.title.match(/\b\d{3,4}\s?W\b/i)?.[0] || 'Rated model'
    return {
      description: 'A practical power tool selected for reliable everyday performance, comfortable control and straightforward setup for home or professional tasks.',
      overviewHeading: 'Reliable power with a simple, work-ready setup.',
      features: ['Balanced handling for controlled operation', 'Built for common workshop and maintenance tasks', 'Accessory-ready design for easier setup'],
      optionGroups: [
        {
          key: 'package', label: 'Package', display: 'button', guideLabel: 'Compare packages',
          guideCopy: 'Choose the tool-only option when you already own compatible accessories, or select a kit for a ready-to-use setup.',
          values: [textChoice('Tool only', 'Main tool only'), textChoice('Essential kit', 'Tool with basic accessories'), textChoice('Complete kit', 'Tool, accessories and carry case')],
        },
      ],
      specs: [
        ['Rated output', wattage], ['Power supply', '220–240V AC'], ['Condition', 'Brand new'],
        ['Package choices', 'Tool only or accessory kit'], ['Recommended use', 'Home, workshop and maintenance'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('generator')) {
    return {
      description: 'A dependable portable power solution designed for backup use, job-site support and essential equipment during power interruptions.',
      overviewHeading: 'Practical backup power with clear configuration choices.',
      features: ['Stable output for essential equipment', 'Portable frame for easier positioning', 'Simple controls for everyday operation'],
      optionGroups: [
        {
          key: 'output', label: 'Rated output', display: 'button', guideLabel: 'Output guide',
          guideCopy: 'Select the output based on the combined wattage of the appliances or tools you plan to run.',
          values: [textChoice('2.5 kW', 'Lights and small appliances'), textChoice('3.5 kW', 'Mixed household essentials'), textChoice('5.0 kW', 'Higher-load equipment')],
        },
        { key: 'start', label: 'Start type', display: 'button', values: [textChoice('Recoil'), textChoice('Electric start')] },
      ],
      specs: [
        ['Product type', 'Portable generator'], ['Output range', '2.5–5.0 kW options'], ['Voltage', '220–240V'],
        ['Start options', 'Recoil or electric'], ['Recommended use', 'Backup and site power'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('phone', 'mobile')) {
    return {
      description: 'A modern smartphone configuration built around dependable daily performance, practical storage and a polished design for work and entertainment.',
      overviewHeading: 'Everyday performance, storage and connectivity in one device.',
      features: ['Responsive daily performance', 'Flexible storage configurations', 'Designed for calls, content and everyday apps'],
      optionGroups: [
        {
          key: 'colour', label: 'Colour', display: 'swatch',
          values: [colourChoice('Midnight Black', '#20242a'), colourChoice('Ocean Blue', '#315d82'), colourChoice('Silver', '#b7bdc5')],
        },
        { key: 'storage', label: 'Storage', display: 'button', values: [textChoice('128 GB'), textChoice('256 GB'), textChoice('512 GB')] },
      ],
      specs: [
        ['Product type', 'Smartphone'], ['Storage', '128 GB, 256 GB or 512 GB'], ['Network', '4G / 5G model dependent'],
        ['Condition', 'Brand new'], ['SIM', 'Dual SIM model dependent'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('tv', 'television')) {
    const statedSize = props.product.title.match(/\b\d{2}\s?(?:inch|\")/i)?.[0] || 'Selected size'
    return {
      description: 'A clean home-entertainment upgrade with sharp picture quality, smart streaming access and a refined design for modern living spaces.',
      overviewHeading: 'A sharper, smarter viewing experience for the home.',
      features: ['High-resolution picture for films and sport', 'Smart streaming and app access', 'Slim design suited to modern interiors'],
      optionGroups: [
        { key: 'screen', label: 'Screen size', display: 'button', values: [textChoice(statedSize), textChoice('55 inch'), textChoice('65 inch')] },
        { key: 'setup', label: 'Setup', display: 'button', values: [textChoice('Delivery only'), textChoice('Delivery + wall mount')] },
      ],
      specs: [
        ['Display type', 'Smart television'], ['Resolution', '4K UHD / model dependent'], ['Screen size', statedSize],
        ['Connectivity', 'HDMI, USB and wireless'], ['Setup option', 'Delivery or wall-mount setup'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('watch', 'wearable')) {
    return {
      description: 'A lightweight smart wearable for daily activity, notifications and everyday timekeeping in a clean, comfortable format.',
      overviewHeading: 'Daily tracking and notifications in a lightweight design.',
      features: ['Comfortable for all-day wear', 'Activity and notification support', 'Clean interface for quick everyday use'],
      optionGroups: [
        {
          key: 'strap', label: 'Strap colour', display: 'swatch',
          values: [colourChoice('Black', '#22262b'), colourChoice('Blue', '#365f82'), colourChoice('Rose', '#c68b91')],
        },
      ],
      specs: [
        ['Product type', 'Smart wearable'], ['Display', 'Colour touch display'], ['Connectivity', 'Bluetooth'],
        ['Strap', 'Replaceable strap'], ['Compatibility', 'Android and iOS model dependent'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('ssd', 'storage device', 'external storage')) {
    return {
      description: 'Fast portable storage for files, media and backups, designed for a compact setup and straightforward use across compatible devices.',
      overviewHeading: 'Fast, portable storage without unnecessary complexity.',
      features: ['Compact format for easier travel', 'Fast file transfer for everyday workflows', 'Useful for backup, media and project files'],
      optionGroups: [
        { key: 'capacity', label: 'Capacity', display: 'button', guideLabel: 'Capacity guide', guideCopy: 'Choose a larger capacity for photo, video and project archives.', values: [textChoice('500 GB'), textChoice('1 TB'), textChoice('2 TB')] },
      ],
      specs: [
        ['Product type', 'Portable solid-state storage'], ['Capacity', '500 GB, 1 TB or 2 TB'], ['Interface', 'USB high-speed connection'],
        ['Use', 'Backup and portable storage'], ['Condition', 'Brand new'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('cable', 'hdmi')) {
    return {
      description: 'A reliable connection accessory for clear signal transfer and clean setup across compatible home, office and entertainment devices.',
      overviewHeading: 'A clean, dependable connection for everyday setups.',
      features: ['Stable signal transfer', 'Flexible length choices', 'Designed for compatible display and media devices'],
      optionGroups: [
        { key: 'length', label: 'Cable length', display: 'button', guideLabel: 'Length guide', guideCopy: 'Measure the route between devices and allow a little extra length for cable management.', values: [textChoice('1 m'), textChoice('2 m'), textChoice('3 m'), textChoice('5 m')] },
      ],
      specs: [
        ['Product type', 'Connection cable'], ['Available lengths', '1–5 metres'], ['Signal support', 'Model dependent'],
        ['Connector', 'As listed for selected model'], ['Condition', 'Brand new'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('headphone', 'speaker', 'audio', 'earbud')) {
    return {
      description: 'Clear everyday audio in a refined format, designed for convenient listening at home, at work or while travelling.',
      overviewHeading: 'Comfortable, uncomplicated audio for everyday listening.',
      features: ['Balanced sound for music and calls', 'Convenient controls and connectivity', 'Designed for portable everyday use'],
      optionGroups: [
        {
          key: 'colour', label: 'Colour', display: 'swatch',
          values: [colourChoice('Black', '#202327'), colourChoice('White', '#e7e8ea'), colourChoice('Navy', '#2e4867')],
        },
        { key: 'connection', label: 'Connection', display: 'button', values: [textChoice('Wireless'), textChoice('Wired')] },
      ],
      specs: [
        ['Product type', 'Audio device'], ['Connection', 'Wireless or wired model dependent'], ['Use', 'Music, calls and media'],
        ['Controls', 'Integrated controls'], ['Condition', 'Brand new'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('keyboard', 'mouse', 'calculator', 'office')) {
    return {
      description: 'A practical office essential selected for a clean workspace, dependable daily operation and straightforward setup.',
      overviewHeading: 'A more organised, dependable everyday workspace.',
      features: ['Simple setup for daily use', 'Clean and practical form', 'Suitable for home, study or office work'],
      optionGroups: [
        { key: 'package', label: 'Package', display: 'button', values: [textChoice('Standard'), textChoice('With accessories'), textChoice('Office bundle')] },
      ],
      specs: [
        ['Product type', 'Office equipment'], ['Package', 'Standard or bundled'], ['Condition', 'Brand new'],
        ['Use', 'Home, study and office'], ['Compatibility', 'Model dependent'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('cleanser', 'serum', 'cream', 'lotion', 'skin care', 'beauty', 'personal care')) {
    return {
      description: 'A carefully selected personal-care essential designed to make a daily routine feel simple, considered and easy to maintain.',
      overviewHeading: 'A straightforward addition to a considered daily routine.',
      features: ['Easy to include in a daily routine', 'Practical size options for different usage needs', 'Clean presentation and straightforward application'],
      optionGroups: [
        { key: 'volume', label: 'Size', display: 'button', guideLabel: 'Usage guide', guideCopy: 'Choose a smaller size for trial or travel and a larger size for regular use.', values: [textChoice('50 ml', 'Trial or travel'), textChoice('100 ml', 'Regular use'), textChoice('150 ml', 'Longer-term use')] },
        { key: 'pack', label: 'Pack', display: 'button', values: [textChoice('Single'), textChoice('Duo pack')] },
      ],
      specs: [
        ['Product type', 'Personal-care product'], ['Available size', '50 ml, 100 ml or 150 ml'], ['Pack options', 'Single or duo'],
        ['Use', 'Daily routine'], ['Condition', 'Brand new'], ['Returns', 'Hygiene policy applies'],
      ],
    }
  }

  if (is('cushion', 'pillow', 'bedding')) {
    return {
      description: 'A soft home accent designed to add comfort, visual balance and a refined finish to everyday living or bedroom spaces.',
      overviewHeading: 'Soft comfort with a clean, considered finish.',
      features: ['Comfortable everyday fill', 'Versatile styling for modern interiors', 'Easy to layer with existing furnishings'],
      optionGroups: [
        {
          key: 'colour', label: 'Colour', display: 'swatch',
          values: [colourChoice('Natural', '#c7bba8'), colourChoice('Sage', '#7f927e'), colourChoice('Navy', '#344d67'), colourChoice('Clay', '#ae7567')],
        },
        { key: 'size', label: 'Size', display: 'button', guideLabel: 'Dimensions', guideCopy: 'Choose a size based on the seat, bed or layering arrangement.', values: [textChoice('40 × 40 cm'), textChoice('45 × 45 cm'), textChoice('50 × 50 cm')] },
      ],
      specs: [
        ['Product type', 'Cushion / pillow'], ['Available sizes', '40–50 cm'], ['Cover', 'Soft woven textile'],
        ['Use', 'Living room or bedroom'], ['Care', 'Follow product care label'], ['Condition', 'Brand new'],
      ],
    }
  }

  if (is('vase', 'lamp', 'decor', 'basket', 'tray', 'tableware', 'home accessories', 'home decor', 'storage')) {
    return {
      description: 'A modern home essential selected to bring practical use, visual balance and a refined finish to everyday spaces.',
      overviewHeading: 'A practical object with a clean, modern presence.',
      features: ['Versatile styling for modern spaces', 'Practical for everyday use', 'Easy to combine with existing interiors'],
      optionGroups: [
        {
          key: 'finish', label: 'Finish', display: 'swatch',
          values: [colourChoice('Natural', '#bba98f'), colourChoice('Black', '#26292d'), colourChoice('White', '#e7e7e4'), colourChoice('Sage', '#84927e')],
        },
        { key: 'size', label: 'Size', display: 'button', guideLabel: 'Dimensions', guideCopy: 'Compare the available sizes with your intended placement before ordering.', values: [textChoice('Small'), textChoice('Medium'), textChoice('Large')] },
      ],
      specs: [
        ['Product type', props.product.category || 'Home accessory'], ['Available sizes', 'Small, medium or large'], ['Finish', 'Selected finish options'],
        ['Use', 'Home and interior styling'], ['Condition', 'Brand new'], ['Care', 'Wipe clean with a soft cloth'],
      ],
    }
  }

  if (is('shirt', 'fashion', 'cloth', 'bag', 'backpack')) {
    return {
      description: 'A practical everyday style selected for comfortable use, straightforward pairing and a clean, versatile finish.',
      overviewHeading: 'Everyday utility with a clean, versatile design.',
      features: ['Comfortable for regular use', 'Easy to coordinate with everyday essentials', 'Practical construction and finish'],
      optionGroups: [
        {
          key: 'colour', label: 'Colour', display: 'swatch',
          values: [colourChoice('Black', '#25282d'), colourChoice('Navy', '#324a66'), colourChoice('Stone', '#a8a39a')],
        },
        { key: 'size', label: is('bag', 'backpack') ? 'Capacity' : 'Size', display: 'button', values: is('bag', 'backpack') ? [textChoice('18 L'), textChoice('24 L'), textChoice('30 L')] : ['S', 'M', 'L', 'XL'].map((size) => textChoice(size)) },
      ],
      specs: [
        ['Product type', props.product.category || 'Fashion item'], ['Colour options', 'Selected colours'], ['Condition', 'Brand new'],
        ['Use', 'Everyday use'], ['Care', 'Follow product care label'], ['Returns', 'Subject to store policy'],
      ],
    }
  }

  if (is('blender', 'shower', 'appliance', 'kitchen helper')) {
    return {
      description: 'A practical home appliance designed for straightforward everyday use, reliable operation and a clean fit within modern living spaces.',
      overviewHeading: 'Useful everyday performance without unnecessary complexity.',
      features: ['Simple controls for regular use', 'Practical size for the home', 'Designed for dependable everyday operation'],
      optionGroups: [
        { key: 'package', label: 'Package', display: 'button', values: [textChoice('Appliance only'), textChoice('With accessories'), textChoice('Complete set')] },
      ],
      specs: [
        ['Product type', 'Home appliance'], ['Power supply', '220–240V'], ['Package', 'Appliance only or accessory set'],
        ['Condition', 'Brand new'], ['Use', 'Household use'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  if (is('gaming', 'console', 'controller', 'ps5')) {
    return {
      description: 'A polished gaming product designed for responsive play, straightforward setup and dependable everyday entertainment.',
      overviewHeading: 'Responsive play and a cleaner gaming setup.',
      features: ['Designed for responsive everyday play', 'Straightforward setup with compatible systems', 'Comfortable controls and practical connectivity'],
      optionGroups: [
        { key: 'edition', label: 'Edition', display: 'button', values: [textChoice('Standard'), textChoice('Bundle'), textChoice('Gift set')] },
      ],
      specs: [
        ['Product type', 'Gaming product'], ['Edition', 'Standard or bundle'], ['Compatibility', 'Model dependent'],
        ['Condition', 'Brand new'], ['Use', 'Home gaming'], ['Warranty', warrantyLabel.value],
      ],
    }
  }

  return {
    description: 'A quality-selected product from ZappyMart with clear pricing, practical purchase information and dependable local support.',
    overviewHeading: 'A clear, practical choice for everyday use.',
    features: ['Quality-selected product', 'Straightforward ordering and payment', 'Islandwide delivery support'],
    optionGroups: props.product.options?.length ? [
      { key: 'option', label: props.product.optionLabel || 'Option', display: 'button', values: normalizeChoices(props.product.options) },
    ] : [],
    specs: [
      ['Brand', props.product.brand || 'ZappyMart Select'], ['Category', props.product.category || 'General'], ['Condition', 'Brand new'],
      ['Warranty', warrantyLabel.value], ['Delivery', 'Islandwide delivery available'], ['Returns', 'Subject to store return policy'],
    ],
  }
})

const optionGroups = computed(() => {
  const customGroups = props.product.optionGroups || props.product.variants
  if (Array.isArray(customGroups) && customGroups.length) {
    return customGroups.map((group, index) => {
      const values = normalizeChoices(group.values || group.options || [])
      return {
        key: group.key || `option-${index}`,
        label: group.label || group.name || `Option ${index + 1}`,
        display: group.display || (values.some((choice) => choice.color) ? 'swatch' : 'button'),
        guideLabel: group.guideLabel || '',
        guideCopy: group.guideCopy || '',
        values,
      }
    }).filter((group) => group.values.length)
  }

  return productProfile.value.optionGroups.map((group) => ({
    ...group,
    values: normalizeChoices(group.values),
  }))
})

const description = computed(() => props.product.description || productProfile.value.description)
const overviewHeading = computed(() => props.product.overviewHeading || productProfile.value.overviewHeading)
const features = computed(() => props.product.features || productProfile.value.features)
const specifications = computed(() => {
  if (Array.isArray(props.product.specifications) && props.product.specifications.length) return props.product.specifications
  return [
    { label: 'Brand', value: props.product.brand || 'ZappyMart Select' },
    ...productProfile.value.specs.map(([label, value]) => ({ label, value })),
    { label: 'Payment', value: 'Card, cash and instalment options' },
    { label: 'Delivery', value: 'Islandwide delivery available' },
  ]
})

const purchaseFacts = computed(() => [
  { label: 'Dispatch', value: isOutOfStock.value ? 'Unavailable' : '1–3 working days' },
  { label: 'Delivery', value: props.product.delivery || 'Islandwide' },
  { label: 'Warranty', value: warrantyLabel.value },
])

const assuranceItems = [
  { icon: 'fa-solid fa-shield-halved', title: 'Secure checkout', text: 'Protected payment experience' },
  { icon: 'fa-solid fa-rotate-left', title: 'Returns support', text: 'Help with eligible returns' },
  { icon: 'fa-solid fa-headset', title: 'Local support', text: 'Assistance before and after purchase' },
]

const galleryViews = computed(() => {
  const customGallery = [props.product.img, ...(props.product.gallery || [])].filter(Boolean)
  const uniqueGallery = [...new Set(customGallery)]

  if (uniqueGallery.length > 1) {
    return uniqueGallery.slice(0, 5).map((image, index) => ({ image, mode: 'full', label: `Product view ${index + 1}` }))
  }

  return [
    { image: props.product.img, mode: 'full', label: 'Full product view' },
    { image: props.product.img, mode: 'close', label: 'Closer product view' },
    { image: props.product.img, mode: 'detail', label: 'Detail view' },
  ]
})
const activeGalleryView = computed(() => galleryViews.value[activeViewIndex.value] || galleryViews.value[0])

const deliveryItems = [
  { icon: 'fa-solid fa-box', title: 'Careful packaging', text: 'Every order is checked and protected before dispatch.' },
  { icon: 'fa-solid fa-truck-fast', title: 'Islandwide delivery', text: 'Tracked delivery is available throughout Sri Lanka.' },
  { icon: 'fa-solid fa-clock', title: 'Fast dispatch', text: 'Most available products leave within 1–3 working days.' },
  { icon: 'fa-solid fa-rotate-left', title: 'Returns support', text: 'Our team will help with any eligible return request.' },
]

const selectedOptionsLabel = computed(() => {
  const values = optionGroups.value.map((group) => selectedOptions.value[group.key]).filter(Boolean)
  return values.length ? values.join(' · ') : 'Standard product'
})

watch(optionGroups, (groups) => {
  const next = {}
  groups.forEach((group) => {
    const available = group.values.filter((choice) => !choice.disabled)
    const current = selectedOptions.value[group.key]
    next[group.key] = available.some((choice) => choice.value === current) ? current : available[0]?.value || ''
  })
  selectedOptions.value = next
}, { immediate: true, deep: true })

watch(() => props.product, () => {
  activeViewIndex.value = 0
  activeTab.value = 'Overview'
  quantity.value = 1
  showZoom.value = false
  activeGuideGroup.value = null
  resetImageHoverZoom()
}, { deep: false })

const handleImageHoverZoom = (event) => {
  if (!event?.currentTarget) return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100))
  const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100))

  imageHoverOrigin.value = `${x.toFixed(2)}% ${y.toFixed(2)}%`
  imageHoverZoom.value = true
}

const resetImageHoverZoom = () => {
  imageHoverZoom.value = false
  imageHoverOrigin.value = '50% 50%'
}

const selectOption = (key, choice) => {
  if (choice.disabled) return
  selectedOptions.value = { ...selectedOptions.value, [key]: choice.value }
}

const openGuide = (group) => {
  activeGuideGroup.value = group
}

const selectedPayload = () => {
  const colourGroup = optionGroups.value.find((group) => /colou?r|finish|strap/i.test(group.key) || /colou?r|finish|strap/i.test(group.label))
  const firstGroup = optionGroups.value[0]

  return {
    product: {
      ...props.product,
      selectedOptions: { ...selectedOptions.value },
      selectedOption: firstGroup ? selectedOptions.value[firstGroup.key] : undefined,
      selectedColor: colourGroup ? selectedOptions.value[colourGroup.key] : undefined,
    },
    quantity: quantity.value,
  }
}

const addSelectedQuantity = () => {
  if (isOutOfStock.value) return
  emit('add-to-cart', selectedPayload())
}

const buySelectedQuantity = () => {
  if (isOutOfStock.value) return
  emit('buy-now', selectedPayload())
}

const scrollToInformation = (tab) => {
  activeTab.value = tab
  requestAnimationFrame(() => informationSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const shareProduct = async () => {
  const shareData = { title: props.product.title, text: description.value, url: window.location.href }

  try {
    if (navigator.share) await navigator.share(shareData)
    else await navigator.clipboard.writeText(window.location.href)
    shareLabel.value = navigator.share ? 'Shared' : 'Link copied'
  } catch (error) {
    if (error?.name === 'AbortError') return
    shareLabel.value = 'Copy failed'
  }

  clearTimeout(shareTimer)
  shareTimer = setTimeout(() => { shareLabel.value = 'Share' }, 2200)
}

const submitReview = () => {
  showReviewForm.value = false
  reviewSubmitted.value = true
  reviewText.value = ''
  clearTimeout(reviewTimer)
  reviewTimer = setTimeout(() => { reviewSubmitted.value = false }, 3500)
}

const handleKeydown = (event) => {
  if (event.key !== 'Escape') return
  showZoom.value = false
  activeGuideGroup.value = null
  showReviewForm.value = false
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  clearTimeout(reviewTimer)
  clearTimeout(shareTimer)
})
</script>
