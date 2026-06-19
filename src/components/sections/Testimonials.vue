<template>
  <section class="modern-testimonials-section" id="reviews">
    <div class="container-fluid px-4 px-lg-5">
      <div class="modern-testimonial-head">
        <div>
          <span class="section-kicker">Customer stories</span>
          <h2 class="section-title">Customer Testimonials</h2>
          <p class="section-sub">Real shopping experiences from customers who trust LK Shop.</p>
        </div>
        <a href="#deals" class="view-link">Shop customer picks <i class="fa-solid fa-arrow-right ms-1"></i></a>
      </div>

      <div class="modern-testimonial-grid">
        <article v-for="review in reviews" :key="review.name" class="modern-testimonial-card">
          <div class="testimonial-quote-icon"><i class="fa-solid fa-quote-left"></i></div>
          <div class="modern-rating">★★★★★</div>
          <p class="modern-testimonial-text">{{ review.text }}</p>

          <div class="modern-testimonial-person">
            <div class="modern-avatar">{{ review.initial }}</div>
            <div>
              <h5>{{ review.name }}</h5>
              <small>{{ review.time }}</small>
            </div>
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
