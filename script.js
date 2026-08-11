document.addEventListener('DOMContentLoaded', () => {
  // --- Hero Slideshow Handler ---
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000); // Transitions every 4 seconds
  }

  // --- Dynamic Search/Booking Form Handler ---
  const bookingForm = document.querySelector('.booking-bar');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Checking availability for your selected dates...');
    });
  }

  // --- Smooth Scroll Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Suite Slider Navigation (For Accommodations Page) ---
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');
  const sliderTrack = document.querySelector('.slider-track');

  if (sliderPrev && sliderNext && sliderTrack) {
    sliderNext.addEventListener('click', () => {
      sliderTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
    sliderPrev.addEventListener('click', () => {
      sliderTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }
});