<template>
  <section class="modern-testimonials-section google-reviews-section" id="reviews">
    <div class="container-fluid px-4 px-lg-5">
      <div class="modern-testimonial-head google-review-head">
        <div>
          <span class="section-kicker">Verified feedback</span>
          <h2 class="section-title">Customer Reviews</h2>
          <p class="section-sub">Inspired by the clean, trusted feel of Google reviews.</p>
        </div>

        <div class="google-review-summary" aria-label="Google review rating summary">
          <div class="google-mark">G</div>
          <div>
            <span>Google Reviews</span>
            <div class="google-summary-row">
              <strong>4.9</strong>
              <div class="google-stars">★★★★★</div>
              <small>240+ reviews</small>
            </div>
          </div>
        </div>
      </div>

      <div class="modern-testimonial-grid">
        <article v-for="review in reviews" :key="review.name" class="modern-testimonial-card google-review-card">
          <div class="google-review-card-top">
            <div class="modern-testimonial-person">
              <div class="modern-avatar">{{ review.initial }}</div>
              <div>
                <h5>{{ review.name }}</h5>
                <small>{{ review.time }}</small>
              </div>
            </div>

            <div class="google-card-mark">G</div>
          </div>

          <div class="google-review-stars">★★★★★</div>
          <p class="modern-testimonial-text">{{ review.text }}</p>

          <div class="google-verified-line">
            <i class="fa-solid fa-circle-check"></i>
            Verified purchase
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  reviews: { type: Array, required: true },
})
</script>
