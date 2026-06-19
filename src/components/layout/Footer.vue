<template>
  <footer class="modern-footer" id="footer">
    <div class="container-fluid px-4 px-lg-5">
      <div class="modern-footer-top">
        <div class="modern-footer-brand">
          <a class="footer-brand" href="#">lksh<span>o</span>p</a>
          <p>Premium ecommerce experience for electronics, appliances, lifestyle products and daily essentials.</p>
          <div class="footer-socials">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>

        <div class="modern-footer-links">
          <div class="footer-link-col">
            <h5>Shop</h5>
            <a href="#electronics">Electronics</a>
            <a href="#home-appliances">Home Appliances</a>
            <a href="#home-accessories">Home Accessories</a>
            <a href="#best-week">Latest Products</a>
          </div>
          <div class="footer-link-col">
            <h5>Support</h5>
            <a href="#">Help Center</a>
            <a href="#">Delivery Information</a>
            <a href="#">Returns & Refunds</a>
            <a href="#">Warranty Support</a>
          </div>
          <div class="footer-link-col">
            <h5>Company</h5>
            <a href="#">About LK Shop</a>
            <a href="#">Careers</a>
            <a href="#">Partner With Us</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div class="footer-newsletter-card">
          <span>Stay updated</span>
          <h4>Get new deals first</h4>
          <p>Subscribe for weekly offers, new arrivals and limited product drops.</p>
          <form class="footer-newsletter-form" @submit.prevent="subscribeUser">
            <input v-model="newsletterEmail" type="email" placeholder="Email address" />
            <button type="submit"><i class="fa-solid fa-arrow-right"></i></button>
          </form>
        </div>
      </div>

      <div class="modern-footer-bottom">
        <span>Copyright © 2026 LK Shop. All Rights Reserved.</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const newsletterEmail = ref('')

const subscribeUser = () => {
  if (!newsletterEmail.value) {
    alert('Please enter your email address.')
    return
  }

  alert(`Thank you for subscribing: ${newsletterEmail.value}`)
  newsletterEmail.value = ''
}
</script>
