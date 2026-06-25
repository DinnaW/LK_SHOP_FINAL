<template>
  <footer class="premium-footer-showcase" id="footer">
    <div class="premium-footer-shell">
      <div class="premium-footer-top-row">
        <div class="premium-footer-newsletter-block">
          <h2>Sign up to the LKSHOP newsletter for 10% off your next purchase</h2>

          <form class="premium-footer-newsletter-form" @submit.prevent="subscribeUser">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Your Email"
              aria-label="Your Email"
            />

            <button type="submit" aria-label="Subscribe to newsletter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </button>
          </form>
        </div>

        <div class="premium-footer-link-columns">
          <div v-for="column in footerColumns" :key="column.title" class="premium-footer-link-col">
            <h5>{{ column.title }}</h5>
            <a v-for="link in column.links" :key="link.label" :href="link.href">{{ link.label }}</a>
          </div>
        </div>
      </div>

      <div class="premium-footer-bottom-row">
        <span>© 2026 LK Shop All Rights Reserved</span>

        <div class="premium-footer-legal-links">
          <a v-for="link in legalLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
        </div>
      </div>

      <div class="premium-footer-watermark" aria-hidden="true">LKSHOP</div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const newsletterEmail = ref('')

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'Electronics', href: '#electronics' },
      { label: 'Home Appliances', href: '#home-appliances' },
      { label: 'Home Accessories', href: '#home-accessories' },
      { label: 'Latest Products', href: '#best-week' },
      { label: 'Deals & Offers', href: '#best-week' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Products', href: '#' },
      { label: 'Cart', href: '#' },
      { label: 'Checkout', href: '#' },
      { label: 'My account', href: '#' },
      { label: 'Returns Policy', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About LK Shop', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
]

const legalLinks = [
  { label: 'Accessibility', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
]

const subscribeUser = () => {
  if (!newsletterEmail.value) {
    alert('Please enter your email address.')
    return
  }

  alert(`Thank you for subscribing: ${newsletterEmail.value}`)
  newsletterEmail.value = ''
}
</script>
