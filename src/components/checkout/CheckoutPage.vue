<template>
  <div class="zm-checkout-page">
    <header class="zm-checkout-header">
      <button class="zm-checkout-brand" type="button" aria-label="Return to ZappyMart" @click="$emit('continue-shopping')">
        <img :src="logoUrl" alt="ZappyMart" />
      </button>

      <div class="zm-checkout-header-actions">
        <span><PremiumIcon name="lock" aria-hidden="true" /> Secure checkout</span>
        <button type="button" @click="$emit('continue-shopping')">
          <PremiumIcon name="arrow-left" aria-hidden="true" />
          Continue shopping
        </button>
      </div>
    </header>

    <main class="zm-checkout-main">
      <section v-if="orderComplete" class="zm-checkout-success" aria-live="polite">
        <div class="zm-checkout-success-icon">
          <PremiumIcon name="check" aria-hidden="true" />
        </div>
        <span class="zm-checkout-eyebrow">Order confirmed</span>
        <h1>Thank you for your order.</h1>
        <p>
          Your order <strong>#{{ orderReference }}</strong> has been received. A confirmation will be sent to
          <strong>{{ completedOrder.email }}</strong>.
        </p>

        <div class="zm-checkout-success-grid">
          <article>
            <span>Order total</span>
            <strong>{{ formatPrice(completedOrder.total) }}</strong>
          </article>
          <article>
            <span>Delivery</span>
            <strong>{{ completedOrder.delivery }}</strong>
          </article>
          <article>
            <span>Payment</span>
            <strong>{{ completedOrder.payment }}</strong>
          </article>
        </div>

        <div class="zm-checkout-success-actions">
          <button class="zm-checkout-primary-btn" type="button" @click="$emit('continue-shopping')">
            Continue shopping
            <PremiumIcon name="arrow-right" aria-hidden="true" />
          </button>
          <button class="zm-checkout-secondary-btn" type="button" @click="printConfirmation">
            <PremiumIcon name="printer" aria-hidden="true" />
            Print confirmation
          </button>
        </div>
      </section>

      <template v-else>
        <div class="zm-checkout-title-row">
          <div>
            <span class="zm-checkout-eyebrow">Secure payment</span>
            <h1>Complete your order</h1>
            <p>Enter your details, choose a delivery method and review everything before placing the order.</p>
          </div>
          <span class="zm-checkout-order-count">{{ totalItemCount }} {{ totalItemCount === 1 ? 'item' : 'items' }}</span>
        </div>

        <nav class="zm-checkout-steps" aria-label="Checkout progress">
          <button
            v-for="step in steps"
            :key="step.number"
            type="button"
            :class="{ active: currentStep === step.number, complete: currentStep > step.number }"
            :disabled="step.number > highestAvailableStep"
            @click="goToStep(step.number)"
          >
            <span class="zm-checkout-step-number">
              <PremiumIcon v-if="currentStep > step.number" name="check" aria-hidden="true" />
              <PremiumIcon v-else :name="step.icon" aria-hidden="true" />
            </span>
            <span>
              <small>Step {{ step.number }}</small>
              <strong>{{ step.label }}</strong>
            </span>
          </button>
        </nav>

        <div v-if="cart.length" class="zm-checkout-layout">
          <section class="zm-checkout-content">
            <form v-if="currentStep === 1" class="zm-checkout-panel" @submit.prevent="nextStep">
              <CheckoutSectionHeading
                icon="user-round"
                eyebrow="Customer information"
                title="Contact and delivery details"
                description="We will use these details for delivery updates and your invoice."
              />

              <div class="zm-checkout-form-grid">
                <FormField label="First name" required :error="errors.firstName">
                  <input v-model.trim="form.firstName" type="text" autocomplete="given-name" placeholder="Dinura" />
                </FormField>
                <FormField label="Last name" required :error="errors.lastName">
                  <input v-model.trim="form.lastName" type="text" autocomplete="family-name" placeholder="Perera" />
                </FormField>
                <FormField label="Email address" required :error="errors.email">
                  <input v-model.trim="form.email" type="email" autocomplete="email" placeholder="name@example.com" />
                </FormField>
                <FormField label="Mobile number" required :error="errors.phone">
                  <div class="zm-checkout-phone-field">
                    <span>+94</span>
                    <input v-model.trim="form.phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="77 123 4567" />
                  </div>
                </FormField>
                <FormField class="full" label="Street address" required :error="errors.address">
                  <input v-model.trim="form.address" type="text" autocomplete="street-address" placeholder="House number and street name" />
                </FormField>
                <FormField class="full" label="Apartment, suite or landmark" :error="errors.apartment">
                  <input v-model.trim="form.apartment" type="text" autocomplete="address-line2" placeholder="Optional" />
                </FormField>
                <FormField label="City" required :error="errors.city">
                  <input v-model.trim="form.city" type="text" autocomplete="address-level2" placeholder="Colombo" />
                </FormField>
                <FormField label="District" required :error="errors.district">
                  <select v-model="form.district" autocomplete="address-level1">
                    <option value="" disabled>Select district</option>
                    <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
                  </select>
                </FormField>
                <FormField label="Postal code" required :error="errors.postalCode">
                  <input v-model.trim="form.postalCode" type="text" inputmode="numeric" autocomplete="postal-code" placeholder="00100" />
                </FormField>
                <FormField label="Order note" :error="errors.note">
                  <input v-model.trim="form.note" type="text" placeholder="Optional delivery instruction" />
                </FormField>
              </div>

              <label class="zm-checkout-check-row">
                <input v-model="form.saveDetails" type="checkbox" />
                <span>
                  <strong>Save these details for next time</strong>
                  <small>Your information will be stored securely on this device.</small>
                </span>
              </label>

              <CheckoutNavigation :is-first="true" @continue="nextStep" @back="$emit('continue-shopping')" />
            </form>

            <section v-else-if="currentStep === 2" class="zm-checkout-panel">
              <CheckoutSectionHeading
                icon="truck"
                eyebrow="Delivery method"
                title="How would you like to receive it?"
                description="Choose the option that works best for your location and schedule."
              />

              <div class="zm-checkout-option-list">
                <label
                  v-for="method in deliveryMethods"
                  :key="method.id"
                  class="zm-checkout-choice-card"
                  :class="{ selected: deliveryMethod === method.id }"
                >
                  <input v-model="deliveryMethod" type="radio" name="delivery" :value="method.id" />
                  <span class="zm-checkout-choice-icon"><PremiumIcon :name="method.icon" aria-hidden="true" /></span>
                  <span class="zm-checkout-choice-copy">
                    <span class="zm-checkout-choice-title">
                      <strong>{{ method.title }}</strong>
                      <em v-if="method.badge">{{ method.badge }}</em>
                    </span>
                    <small>{{ method.description }}</small>
                    <span>{{ method.time }}</span>
                  </span>
                  <strong class="zm-checkout-choice-price" :class="{ free: method.fee === 0 }">
                    {{ method.fee === 0 ? 'Free' : formatPrice(method.fee) }}
                  </strong>
                </label>
              </div>

              <div class="zm-checkout-info-card">
                <PremiumIcon name="map-pin" aria-hidden="true" />
                <div>
                  <strong>Delivering to {{ form.city }}, {{ form.district }}</strong>
                  <p>{{ form.address }}<template v-if="form.apartment">, {{ form.apartment }}</template></p>
                </div>
                <button type="button" @click="goToStep(1)">Edit</button>
              </div>

              <CheckoutNavigation @continue="nextStep" @back="previousStep" />
            </section>

            <section v-else-if="currentStep === 3" class="zm-checkout-panel">
              <CheckoutSectionHeading
                icon="credit-card"
                eyebrow="Payment"
                title="Choose a payment method"
                description="All payment information is protected during checkout."
              />

              <div class="zm-checkout-payment-grid">
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="zm-checkout-payment-option"
                  :class="{ selected: paymentMethod === method.id }"
                >
                  <input v-model="paymentMethod" type="radio" name="payment" :value="method.id" />
                  <span class="zm-checkout-payment-icon"><PremiumIcon :name="method.icon" aria-hidden="true" /></span>
                  <span>
                    <strong>{{ method.title }}</strong>
                    <small>{{ method.description }}</small>
                  </span>
                  <PremiumIcon name="circle-check" aria-hidden="true" />
                </label>
              </div>

              <div v-if="paymentMethod === 'card'" class="zm-checkout-card-form">
                <div class="zm-checkout-card-form-head">
                  <div>
                    <strong>Card information</strong>
                    <small>Visa and Mastercard accepted</small>
                  </div>
                  <div class="zm-checkout-card-brands" aria-label="Accepted card types">
                    <span>VISA</span>
                    <span class="mastercard"><i></i><i></i></span>
                  </div>
                </div>

                <div class="zm-checkout-form-grid">
                  <FormField class="full" label="Name on card" required :error="errors.cardName">
                    <input v-model.trim="card.name" type="text" autocomplete="cc-name" placeholder="Name shown on card" />
                  </FormField>
                  <FormField class="full" label="Card number" required :error="errors.cardNumber">
                    <div class="zm-checkout-card-number">
                      <input
                        :value="formattedCardNumber"
                        type="text"
                        inputmode="numeric"
                        autocomplete="cc-number"
                        maxlength="19"
                        placeholder="0000 0000 0000 0000"
                        @input="updateCardNumber"
                      />
                      <PremiumIcon name="credit-card" aria-hidden="true" />
                    </div>
                  </FormField>
                  <FormField label="Expiry date" required :error="errors.expiry">
                    <input
                      :value="card.expiry"
                      type="text"
                      inputmode="numeric"
                      autocomplete="cc-exp"
                      maxlength="5"
                      placeholder="MM/YY"
                      @input="updateExpiry"
                    />
                  </FormField>
                  <FormField label="Security code" required :error="errors.cvv">
                    <div class="zm-checkout-card-number">
                      <input v-model.trim="card.cvv" type="password" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="CVV" />
                      <PremiumIcon name="help-circle" aria-hidden="true" />
                    </div>
                  </FormField>
                </div>
              </div>

              <div v-else class="zm-checkout-payment-note">
                <PremiumIcon :name="selectedPayment.icon" aria-hidden="true" />
                <div>
                  <strong>{{ selectedPayment.noteTitle }}</strong>
                  <p>{{ selectedPayment.note }}</p>
                </div>
              </div>

              <label class="zm-checkout-check-row compact">
                <input v-model="billingSame" type="checkbox" />
                <span>
                  <strong>Billing address is the same as delivery address</strong>
                </span>
              </label>

              <CheckoutNavigation @continue="nextStep" @back="previousStep" />
            </section>

            <section v-else class="zm-checkout-panel">
              <CheckoutSectionHeading
                icon="clipboard-check"
                eyebrow="Final review"
                title="Review and place your order"
                description="Confirm your details before submitting the order."
              />

              <div class="zm-checkout-review-grid">
                <article>
                  <div class="zm-checkout-review-head">
                    <span><PremiumIcon name="user-round" aria-hidden="true" /> Contact</span>
                    <button type="button" @click="goToStep(1)">Edit</button>
                  </div>
                  <strong>{{ form.firstName }} {{ form.lastName }}</strong>
                  <p>{{ form.email }}<br />+94 {{ form.phone }}</p>
                </article>
                <article>
                  <div class="zm-checkout-review-head">
                    <span><PremiumIcon name="map-pin" aria-hidden="true" /> Delivery address</span>
                    <button type="button" @click="goToStep(1)">Edit</button>
                  </div>
                  <strong>{{ form.address }}</strong>
                  <p><template v-if="form.apartment">{{ form.apartment }}<br /></template>{{ form.city }}, {{ form.district }} {{ form.postalCode }}</p>
                </article>
                <article>
                  <div class="zm-checkout-review-head">
                    <span><PremiumIcon name="truck" aria-hidden="true" /> Delivery</span>
                    <button type="button" @click="goToStep(2)">Edit</button>
                  </div>
                  <strong>{{ selectedDelivery.title }}</strong>
                  <p>{{ selectedDelivery.time }}<br />{{ selectedDelivery.fee === 0 ? 'Free' : formatPrice(selectedDelivery.fee) }}</p>
                </article>
                <article>
                  <div class="zm-checkout-review-head">
                    <span><PremiumIcon name="credit-card" aria-hidden="true" /> Payment</span>
                    <button type="button" @click="goToStep(3)">Edit</button>
                  </div>
                  <strong>{{ selectedPayment.title }}</strong>
                  <p>{{ paymentSummary }}</p>
                </article>
              </div>

              <label class="zm-checkout-terms">
                <input v-model="acceptedTerms" type="checkbox" />
                <span>I agree to the terms of sale, privacy policy and returns policy.</span>
              </label>
              <p v-if="errors.terms" class="zm-checkout-global-error">{{ errors.terms }}</p>

              <div class="zm-checkout-final-action">
                <button class="zm-checkout-back-btn" type="button" @click="previousStep">
                  <PremiumIcon name="arrow-left" aria-hidden="true" />
                  Back
                </button>
                <button class="zm-checkout-place-order" type="button" :disabled="isSubmitting" @click="placeOrder">
                  <template v-if="isSubmitting">
                    <PremiumIcon class="is-spin" name="loader-circle" aria-hidden="true" />
                    Processing order
                  </template>
                  <template v-else>
                    <PremiumIcon name="lock" aria-hidden="true" />
                    Place order · {{ formatPrice(grandTotal) }}
                  </template>
                </button>
              </div>
            </section>
          </section>

          <aside class="zm-checkout-summary">
            <div class="zm-checkout-summary-card">
              <div class="zm-checkout-summary-head">
                <div>
                  <span class="zm-checkout-eyebrow">Your cart</span>
                  <h2>Order summary</h2>
                </div>
                <button type="button" @click="$emit('open-cart')">Edit</button>
              </div>

              <div class="zm-checkout-summary-items">
                <article v-for="(item, index) in cart" :key="`${item.title}-${index}`" class="zm-checkout-summary-item">
                  <div class="zm-checkout-summary-image">
                    <img :src="item.img" :alt="item.title" />
                    <span>{{ item.quantity }}</span>
                  </div>
                  <div class="zm-checkout-summary-copy">
                    <strong>{{ item.title }}</strong>
                    <small>{{ item.category || 'ZappyMart product' }}</small>
                    <div class="zm-checkout-summary-quantity">
                      <button type="button" aria-label="Decrease quantity" @click="changeQuantity(item, -1)">
                        <PremiumIcon name="minus" aria-hidden="true" />
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button type="button" aria-label="Increase quantity" @click="changeQuantity(item, 1)">
                        <PremiumIcon name="plus" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div class="zm-checkout-summary-price">
                    <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
                    <button type="button" aria-label="Remove product" @click="$emit('remove-item', index)">
                      <PremiumIcon name="trash-2" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </div>

              <form class="zm-checkout-promo" @submit.prevent="applyPromoCode">
                <label for="checkout-promo">Promo code</label>
                <div>
                  <input id="checkout-promo" v-model.trim="promoInput" type="text" placeholder="Enter code" />
                  <button type="submit">Apply</button>
                </div>
                <p v-if="promoMessage" :class="{ success: promoApplied }">{{ promoMessage }}</p>
              </form>

              <div class="zm-checkout-totals">
                <div><span>Subtotal</span><strong>{{ formatPrice(cartTotal) }}</strong></div>
                <div><span>Delivery</span><strong :class="{ free: shippingFee === 0 }">{{ shippingFee === 0 ? 'Free' : formatPrice(shippingFee) }}</strong></div>
                <div v-if="discountAmount"><span>Promo discount</span><strong class="discount">− {{ formatPrice(discountAmount) }}</strong></div>
                <div class="total"><span>Total</span><strong>{{ formatPrice(grandTotal) }}</strong></div>
              </div>

              <div class="zm-checkout-summary-trust">
                <span><PremiumIcon name="shield-check" aria-hidden="true" /> Secure checkout</span>
                <span><PremiumIcon name="rotate-ccw" aria-hidden="true" /> Easy returns</span>
                <span><PremiumIcon name="headset" aria-hidden="true" /> Local support</span>
              </div>
            </div>
          </aside>
        </div>

        <section v-else class="zm-checkout-empty">
          <span><PremiumIcon name="shopping-bag" aria-hidden="true" /></span>
          <h2>Your cart is empty</h2>
          <p>Add a few products before starting checkout.</p>
          <button class="zm-checkout-primary-btn" type="button" @click="$emit('continue-shopping')">
            Browse products
            <PremiumIcon name="arrow-right" aria-hidden="true" />
          </button>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue'
import logoUrl from '@/assets/ZappyMart Logo.svg'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  cart: { type: Array, required: true },
  cartTotal: { type: Number, required: true },
})

const emit = defineEmits([
  'continue-shopping',
  'open-cart',
  'update-quantity',
  'remove-item',
  'place-order',
])

const premiumIconNodes = {
  lock: () => [
    h('rect', { x: 5, y: 11, width: 14, height: 10, rx: 2 }),
    h('path', { d: 'M8 11V7a4 4 0 0 1 8 0v4' }),
  ],
  'arrow-left': () => [
    h('path', { d: 'M19 12H5' }),
    h('path', { d: 'm12 19-7-7 7-7' }),
  ],
  'arrow-right': () => [
    h('path', { d: 'M5 12h14' }),
    h('path', { d: 'm12 5 7 7-7 7' }),
  ],
  check: () => [h('path', { d: 'm5 12 4 4L19 6' })],
  printer: () => [
    h('path', { d: 'M6 9V2h12v7' }),
    h('path', { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' }),
    h('rect', { x: 6, y: 14, width: 12, height: 8, rx: 1 }),
  ],
  'user-round': () => [
    h('circle', { cx: 12, cy: 8, r: 4 }),
    h('path', { d: 'M4 21a8 8 0 0 1 16 0' }),
  ],
  truck: () => [
    h('path', { d: 'M10 17h4V5H2v12h3' }),
    h('path', { d: 'M14 9h4l4 4v4h-3' }),
    h('circle', { cx: 7.5, cy: 17.5, r: 2.5 }),
    h('circle', { cx: 16.5, cy: 17.5, r: 2.5 }),
  ],
  'map-pin': () => [
    h('path', { d: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z' }),
    h('circle', { cx: 12, cy: 10, r: 2.5 }),
  ],
  'credit-card': () => [
    h('rect', { x: 2, y: 5, width: 20, height: 14, rx: 2 }),
    h('path', { d: 'M2 10h20' }),
    h('path', { d: 'M6 15h4' }),
  ],
  'circle-check': () => [
    h('circle', { cx: 12, cy: 12, r: 9 }),
    h('path', { d: 'm8 12 2.6 2.6L16.5 9' }),
  ],
  'help-circle': () => [
    h('circle', { cx: 12, cy: 12, r: 9 }),
    h('path', { d: 'M9.5 9a2.7 2.7 0 1 1 4.4 2.1c-1 .7-1.9 1.3-1.9 2.9' }),
    h('path', { d: 'M12 18h.01' }),
  ],
  'clipboard-check': () => [
    h('rect', { x: 5, y: 4, width: 14, height: 17, rx: 2 }),
    h('path', { d: 'M9 4.5V3h6v1.5' }),
    h('path', { d: 'm9 13 2 2 4-4' }),
  ],
  minus: () => [h('path', { d: 'M5 12h14' })],
  plus: () => [
    h('path', { d: 'M5 12h14' }),
    h('path', { d: 'M12 5v14' }),
  ],
  'trash-2': () => [
    h('path', { d: 'M3 6h18' }),
    h('path', { d: 'M8 6V4h8v2' }),
    h('path', { d: 'm19 6-1 15H6L5 6' }),
    h('path', { d: 'M10 11v5M14 11v5' }),
  ],
  'shield-check': () => [
    h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' }),
    h('path', { d: 'm9 12 2 2 4-4' }),
  ],
  'rotate-ccw': () => [
    h('path', { d: 'M3 12a9 9 0 1 0 3-6.7L3 8' }),
    h('path', { d: 'M3 3v5h5' }),
  ],
  headset: () => [
    h('path', { d: 'M4 14a8 8 0 0 1 16 0' }),
    h('path', { d: 'M18 19h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1v7Z' }),
    h('path', { d: 'M6 19H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1v7Z' }),
    h('path', { d: 'M18 19a6 6 0 0 1-6 3' }),
  ],
  'shopping-bag': () => [
    h('path', { d: 'M6 8h12l1 13H5L6 8Z' }),
    h('path', { d: 'M9 8a3 3 0 0 1 6 0' }),
  ],
  zap: () => [h('path', { d: 'M13 2 3 14h8l-1 8 10-12h-8l1-8Z' })],
  store: () => [
    h('path', { d: 'M3 9 5 3h14l2 6' }),
    h('path', { d: 'M5 13v8h14v-8' }),
    h('path', { d: 'M9 21v-6h6v6' }),
    h('path', { d: 'M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0' }),
  ],
  banknote: () => [
    h('rect', { x: 2, y: 6, width: 20, height: 12, rx: 2 }),
    h('circle', { cx: 12, cy: 12, r: 2.5 }),
    h('path', { d: 'M6 10h.01M18 14h.01' }),
  ],
  landmark: () => [
    h('path', { d: 'm3 10 9-7 9 7' }),
    h('path', { d: 'M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M3 21h18' }),
  ],
  'loader-circle': () => [
    h('path', { d: 'M21 12a9 9 0 1 1-3.2-6.9' }),
  ],
}

const PremiumIcon = defineComponent({
  name: 'PremiumIcon',
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: null },
  },
  setup(iconProps, { attrs }) {
    return () => {
      const { class: className, ...restAttrs } = attrs
      const size = iconProps.size || undefined
      const nodes = premiumIconNodes[iconProps.name] || premiumIconNodes['circle-check']
      return h('svg', {
        ...restAttrs,
        class: ['zm-premium-icon', className],
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.85,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        focusable: 'false',
        'aria-hidden': restAttrs['aria-hidden'] ?? 'true',
      }, nodes())
    }
  },
})

const FormField = defineComponent({
  name: 'FormField',
  props: {
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    error: { type: String, default: '' },
  },
  setup(fieldProps, { slots, attrs }) {
    return () => h('label', { class: ['zm-checkout-field', attrs.class, { invalid: fieldProps.error }] }, [
      h('span', [fieldProps.label, fieldProps.required ? h('em', ' *') : null]),
      slots.default?.(),
      fieldProps.error ? h('small', fieldProps.error) : null,
    ])
  },
})

const CheckoutSectionHeading = defineComponent({
  name: 'CheckoutSectionHeading',
  props: {
    icon: { type: String, required: true },
    eyebrow: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  setup(headingProps) {
    return () => h('div', { class: 'zm-checkout-section-heading' }, [
      h('span', { class: 'zm-checkout-section-icon' }, [h(PremiumIcon, { name: headingProps.icon, 'aria-hidden': 'true' })]),
      h('div', [
        h('span', { class: 'zm-checkout-eyebrow' }, headingProps.eyebrow),
        h('h2', headingProps.title),
        h('p', headingProps.description),
      ]),
    ])
  },
})

const CheckoutNavigation = defineComponent({
  name: 'CheckoutNavigation',
  props: { isFirst: { type: Boolean, default: false } },
  emits: ['continue', 'back'],
  setup(navProps, { emit: navEmit }) {
    return () => h('div', { class: 'zm-checkout-navigation' }, [
      h('button', { class: 'zm-checkout-back-btn', type: 'button', onClick: () => navEmit('back') }, [
        h(PremiumIcon, { name: 'arrow-left', 'aria-hidden': 'true' }),
        navProps.isFirst ? 'Continue shopping' : 'Back',
      ]),
      h('button', { class: 'zm-checkout-primary-btn', type: 'button', onClick: () => navEmit('continue') }, [
        'Continue',
        h(PremiumIcon, { name: 'arrow-right', 'aria-hidden': 'true' }),
      ]),
    ])
  },
})

const steps = [
  { number: 1, label: 'Details', icon: 'user-round' },
  { number: 2, label: 'Delivery', icon: 'truck' },
  { number: 3, label: 'Payment', icon: 'credit-card' },
  { number: 4, label: 'Review', icon: 'clipboard-check' },
]

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara',
  'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
]

const deliveryMethods = [
  {
    id: 'standard',
    title: 'Standard delivery',
    description: 'Reliable islandwide delivery to your address.',
    time: '2–4 business days',
    fee: 650,
    icon: 'truck',
    badge: 'Most popular',
  },
  {
    id: 'express',
    title: 'Express delivery',
    description: 'Priority handling for selected urban locations.',
    time: 'Next business day',
    fee: 1200,
    icon: 'zap',
  },
  {
    id: 'pickup',
    title: 'Store pickup',
    description: 'Collect from the ZappyMart pickup point after confirmation.',
    time: 'Ready within 4 hours',
    fee: 0,
    icon: 'store',
    badge: 'Free',
  },
]

const paymentMethods = [
  {
    id: 'card',
    title: 'Credit or debit card',
    description: 'Visa and Mastercard',
    icon: 'credit-card',
    noteTitle: 'Pay securely by card',
    note: 'Your card will be charged after you confirm the order.',
  },
  {
    id: 'cod',
    title: 'Cash on delivery',
    description: 'Pay when your order arrives',
    icon: 'banknote',
    noteTitle: 'Pay at your doorstep',
    note: 'Please keep the exact amount ready. Cash on delivery availability may depend on location.',
  },
  {
    id: 'bank',
    title: 'Bank transfer',
    description: 'Transfer after placing order',
    icon: 'landmark',
    noteTitle: 'Complete a bank transfer',
    note: 'Bank details and your payment reference will appear in the order confirmation.',
  },
]

const currentStep = ref(1)
const highestAvailableStep = ref(1)
const deliveryMethod = ref('standard')
const paymentMethod = ref('card')
const billingSame = ref(true)
const acceptedTerms = ref(false)
const promoInput = ref('')
const promoApplied = ref(false)
const promoMessage = ref('')
const isSubmitting = ref(false)
const orderComplete = ref(false)
const orderReference = ref('')
const completedOrder = reactive({ email: '', total: 0, delivery: '', payment: '' })
const errors = reactive({})

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  apartment: '',
  city: '',
  district: '',
  postalCode: '',
  note: '',
  saveDetails: true,
})

const card = reactive({
  name: '',
  number: '',
  expiry: '',
  cvv: '',
})

const totalItemCount = computed(() => props.cart.reduce((total, item) => total + Number(item.quantity || 0), 0))
const selectedDelivery = computed(() => deliveryMethods.find((method) => method.id === deliveryMethod.value) || deliveryMethods[0])
const selectedPayment = computed(() => paymentMethods.find((method) => method.id === paymentMethod.value) || paymentMethods[0])
const shippingFee = computed(() => selectedDelivery.value.fee)
const discountAmount = computed(() => promoApplied.value ? Math.min(Math.round(props.cartTotal * 0.1), 5000) : 0)
const grandTotal = computed(() => Math.max(0, props.cartTotal + shippingFee.value - discountAmount.value))
const formattedCardNumber = computed(() => card.number.replace(/(\d{4})(?=\d)/g, '$1 '))
const paymentSummary = computed(() => {
  if (paymentMethod.value === 'card') return card.number ? `Card ending in ${card.number.slice(-4)}` : 'Credit or debit card'
  return selectedPayment.value.description
})

const clearErrors = () => Object.keys(errors).forEach((key) => delete errors[key])

const validateDetails = () => {
  clearErrors()
  if (!form.firstName) errors.firstName = 'Enter your first name.'
  if (!form.lastName) errors.lastName = 'Enter your last name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (form.phone.replace(/\D/g, '').length < 9) errors.phone = 'Enter a valid Sri Lankan mobile number.'
  if (!form.address) errors.address = 'Enter your street address.'
  if (!form.city) errors.city = 'Enter your city.'
  if (!form.district) errors.district = 'Select your district.'
  if (!/^\d{5}$/.test(form.postalCode)) errors.postalCode = 'Enter a valid 5-digit postal code.'
  return Object.keys(errors).length === 0
}

const validatePayment = () => {
  clearErrors()
  if (paymentMethod.value !== 'card') return true
  if (!card.name) errors.cardName = 'Enter the name shown on the card.'
  if (card.number.length < 15) errors.cardNumber = 'Enter a valid card number.'
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) errors.expiry = 'Use MM/YY format.'
  if (!/^\d{3,4}$/.test(card.cvv)) errors.cvv = 'Enter a valid security code.'
  return Object.keys(errors).length === 0
}

const nextStep = () => {
  if (!props.cart.length) return
  if (currentStep.value === 1 && !validateDetails()) return
  if (currentStep.value === 3 && !validatePayment()) return

  currentStep.value = Math.min(4, currentStep.value + 1)
  highestAvailableStep.value = Math.max(highestAvailableStep.value, currentStep.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const previousStep = () => {
  currentStep.value = Math.max(1, currentStep.value - 1)
  clearErrors()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToStep = (step) => {
  if (step > highestAvailableStep.value) return
  currentStep.value = step
  clearErrors()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const changeQuantity = (item, amount) => {
  const nextQuantity = Math.max(0, Number(item.quantity || 0) + amount)
  emit('update-quantity', { product: item, quantity: nextQuantity })
}

const updateCardNumber = (event) => {
  card.number = event.target.value.replace(/\D/g, '').slice(0, 16)
}

const updateExpiry = (event) => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
  card.expiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

const applyPromoCode = () => {
  const normalized = promoInput.value.trim().toUpperCase()
  if (!normalized) {
    promoApplied.value = false
    promoMessage.value = 'Enter a promo code first.'
    return
  }

  if (normalized === 'ZAPPY10') {
    promoApplied.value = true
    promoInput.value = normalized
    promoMessage.value = 'ZAPPY10 applied successfully.'
    return
  }

  promoApplied.value = false
  promoMessage.value = 'This promo code is not valid.'
}

const placeOrder = () => {
  clearErrors()
  if (!acceptedTerms.value) {
    errors.terms = 'Please accept the terms before placing the order.'
    return
  }
  if (!props.cart.length || isSubmitting.value) return

  isSubmitting.value = true
  const snapshot = props.cart.map((item) => ({ ...item }))

  window.setTimeout(() => {
    orderReference.value = `ZM${Date.now().toString().slice(-8)}`
    completedOrder.email = form.email
    completedOrder.total = grandTotal.value
    completedOrder.delivery = selectedDelivery.value.title
    completedOrder.payment = selectedPayment.value.title
    orderComplete.value = true
    isSubmitting.value = false

    emit('place-order', {
      reference: orderReference.value,
      customer: { ...form },
      delivery: selectedDelivery.value,
      payment: selectedPayment.value.id,
      items: snapshot,
      subtotal: props.cartTotal,
      shipping: shippingFee.value,
      discount: discountAmount.value,
      total: grandTotal.value,
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 900)
}

const printConfirmation = () => window.print()
</script>
