document.addEventListener('DOMContentLoaded', () => {
  // Hero Slideshow Controller – speed set to 2500ms (faster)
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 2500);
  }

  // Booking Bar
  const bookingBar = document.querySelector('.booking-bar');
  if (bookingBar) {
    bookingBar.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Checking availability for your selected dates...');
    });
  }

  // Init all features
  initScrollHighlight();
  initMobileMenu();
  initBookingModal();
  initGalleryLightbox();
  initContactForm();
  initAIConcierge();

  // ========== NAVIGATION SCROLL HIGHLIGHT ==========
  function initScrollHighlight() {
    const sections = ['home', 'about', 'rooms', 'amenities', 'spa', 'location', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let currentActive = 'home';
      const scrollPos = window.scrollY + 120;

      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          currentActive = section;
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentActive}` || href === `index.html#${currentActive}` || (href === 'index.html' && currentActive === 'home')) {
          link.classList.add('active');
        }
      });
    });
  }

  // ========== MOBILE MENU ==========
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-menu-drawer');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const links = document.querySelectorAll('.mobile-nav-link');

    function openDrawer() {
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
    }
    function closeDrawer() {
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
    }

    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    links.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // ========== BOOKING MODAL ==========
  function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('booking-modal-close');
    const roomSelect = document.getElementById('booking-room-select');
    const form = document.getElementById('booking-form');
    const formScreen = document.getElementById('booking-form-screen');
    const successScreen = document.getElementById('booking-success-screen');
    const successGuestName = document.getElementById('success-guest-name');
    const successRoomName = document.getElementById('success-room-name');
    const successResetBtn = document.getElementById('booking-success-reset');

    function openModal(roomId) {
      if (modal) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden';
        if (roomId && roomSelect) {
          roomSelect.value = roomId;
        }
      }
    }

    function closeModal() {
      if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
        setTimeout(() => {
          formScreen.classList.remove('hidden');
          successScreen.classList.add('hidden');
          if (form) form.reset();
        }, 300);
      }
    }

    // Expose globally
    window.triggerBooking = openModal;

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const guestName = document.getElementById('booking-name')?.value || 'Guest';
        const roomVal = roomSelect?.value || 'standard';
        const roomNames = { standard: 'Standard Room', deluxe: 'Deluxe Room', executive: 'Executive Room', twin: 'Twin Room', family: 'Family Room' };
        if (successGuestName) successGuestName.textContent = guestName;
        if (successRoomName) successRoomName.textContent = roomNames[roomVal] || 'Room';
        formScreen.classList.add('hidden');
        successScreen.classList.remove('hidden');
      });
    }
    if (successResetBtn) successResetBtn.addEventListener('click', closeModal);
  }

  // ========== GALLERY LIGHTBOX ==========
  function initGalleryLightbox() {
    const GALLERY_ITEMS = [
      { id: 'gal1', title: 'Aerial Drone Overview', category: 'outdoor', imageUrl: 'Assets/images/Hotel Frontside.jpeg', description: 'Aerial perspective of our elegant red-tiled villa.' },
      { id: 'gal2', title: 'Executive Charcoal Room', category: 'rooms', imageUrl: 'Assets/images/bedroom_charcoal_1786019277132.jpg', description: 'The exquisite contrast of the charcoal accent feature wall.' },
      { id: 'gal3', title: 'Deluxe Twin Room Beds', category: 'rooms', imageUrl: 'Assets/images/bedroom_grey_1786019310867.jpg', description: 'Sophisticated twin setup featuring high button-tufted grey headboards.' },
      { id: 'gal4', title: 'Signature Chardonnay Service', category: 'details', imageUrl: 'Assets/images/wine_bucket_1786019349266.jpg', description: 'Babylonstoren Chardonnay in a chilled acrylic ice bucket.' },
      { id: 'gal5', title: 'Patio Veranda Seating', category: 'dining', imageUrl: 'Assets/images/patio_dining_1786019388827.jpg', description: 'Our covered glass-top table dining area looking out to the swimming pool.' },
      { id: 'gal6', title: 'Checkerboard Poolside Paving', category: 'pool', imageUrl: 'Assets/images/poolside_loungers_1786019428811.jpg', description: 'Premium grey lounge chairs set on checkerboard paving.' },
      { id: 'gal7', title: 'Blyde River Canyon Vistas', category: 'lifestyle', imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80', description: 'Spectacular green canyon scenery of the nearby Blyde River Canyon.' },
      { id: 'gal8', title: 'Therapeutic Hot Stones', category: 'lifestyle', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80', description: 'Our relaxing wellness spa treatment using basalt rocks.' },
    ];

    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const grid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCat = document.getElementById('lightbox-cat');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentCategory = 'all';
    let activeIndex = 0;

    function renderGallery() {
      if (!grid) return;
      grid.innerHTML = '';
      const items = currentCategory === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === currentCategory);
      items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'group relative overflow-hidden rounded-xl bg-gray-50 aspect-4/3 cursor-pointer border border-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md';
        card.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" referrerpolicy="no-referrer" />
          <div class="absolute inset-0 gallery-card-vignette opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span class="text-[9px] font-montserrat tracking-widest text-[#C6A76C] uppercase mb-1">${item.category}</span>
            <h4 class="font-playfair text-lg text-white font-medium">${item.title}</h4>
            <p class="text-xs text-gray-300 font-inter mt-1.5 line-clamp-2">${item.description}</p>
          </div>
        `;
        card.addEventListener('click', () => {
          const globalIndex = GALLERY_ITEMS.findIndex(g => g.id === item.id);
          if (globalIndex !== -1) openLightbox(globalIndex);
        });
        grid.appendChild(card);
      });
    }

    function openLightbox(index) {
      activeIndex = index;
      updateLightbox();
      if (lightbox) {
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
      }
    }
    function closeLightbox() {
      if (lightbox) lightbox.classList.add('opacity-0', 'pointer-events-none');
    }
    function updateLightbox() {
      const item = GALLERY_ITEMS[activeIndex];
      if (lightboxImg) lightboxImg.src = item.imageUrl;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxDesc) lightboxDesc.textContent = item.description;
      if (lightboxCat) lightboxCat.textContent = item.category;
    }
    function nextImage() { activeIndex = (activeIndex + 1) % GALLERY_ITEMS.length; updateLightbox(); }
    function prevImage() { activeIndex = (activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length; updateLightbox(); }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => { b.classList.remove('bg-[#2C2C2C]', 'text-white', 'border-[#2C2C2C]'); b.classList.add('border-gray-200', 'text-gray-500'); });
        btn.classList.add('bg-[#2C2C2C]', 'text-white', 'border-[#2C2C2C]');
        btn.classList.remove('border-gray-200', 'text-gray-500');
        currentCategory = btn.getAttribute('data-filter-val') || 'all';
        renderGallery();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    renderGallery();
  }

  // ========== CONTACT FORM ==========
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const fields = document.getElementById('contact-form-fields');
    const success = document.getElementById('contact-success-screen');
    const nameSpan = document.getElementById('contact-success-name');
    const phoneSpan = document.getElementById('contact-success-phone');
    const emailSpan = document.getElementById('contact-success-email');
    const resetBtn = document.getElementById('contact-success-reset');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const email = document.getElementById('contact-email').value;
        if (nameSpan) nameSpan.textContent = name;
        if (phoneSpan) phoneSpan.textContent = phone;
        if (emailSpan) emailSpan.textContent = email;
        if (fields) fields.classList.add('hidden');
        if (success) success.classList.remove('hidden');
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (fields) fields.classList.remove('hidden');
        if (success) success.classList.add('hidden');
        if (form) form.reset();
      });
    }
  }

  // ========== AI CONCIERGE ==========
  function initAIConcierge() {
    const drawer = document.getElementById('concierge-drawer');
    const backdrop = document.getElementById('concierge-backdrop');
    const closeBtn = document.getElementById('concierge-close');
    const input = document.getElementById('concierge-input');
    const sendBtn = document.getElementById('concierge-send');
    const logs = document.getElementById('concierge-chat-logs');
    const chips = document.querySelectorAll('.concierge-action-chip');

    const AI_KNOWLEDGE = {
      rooms: `We offer five beautifully curated rooms:\n• Standard: R800/night (Queen, 28m²)\n• Deluxe: R950/night (King, 34m²)\n• Executive: R1289/night (King, 42m²)\n• Twin: R1300/night (2 x Twin, 38m²)\n• Family: R1450/night (King + Twin, 52m²)`,
      spa: `Our spa offers:\n• Hot Stone Massage – R650 (60m)\n• Aromatherapy – R550 (60m)\n• Deep Tissue – R700 (60m)`,
      attractions: `Nearby attractions:\n• Blyde River Canyon (95km)\n• Three Rondavels (88km)\n• Echo Caves (35km)`,
      amenities: `Amenities: Pool, Lapa, Wi-Fi, secure parking, air conditioning.`,
      default: `I'm happy to help! Ask me about rooms, spa, attractions, or amenities.`
    };

    function openConcierge(initialMsg) {
      if (drawer) {
        drawer.classList.remove('translate-x-full');
        if (backdrop) backdrop.classList.remove('opacity-0', 'pointer-events-none');
        if (input) setTimeout(() => input.focus(), 400);
        if (initialMsg) handleUserMessage(initialMsg);
      }
    }
    function closeConcierge() {
      if (drawer) drawer.classList.add('translate-x-full');
      if (backdrop) backdrop.classList.add('opacity-0', 'pointer-events-none');
    }

    window.triggerConcierge = openConcierge;

    if (closeBtn) closeBtn.addEventListener('click', closeConcierge);
    if (backdrop) backdrop.addEventListener('click', closeConcierge);

    function appendBubble(sender, text) {
      if (!logs) return;
      const wrapper = document.createElement('div');
      wrapper.className = sender === 'user' ? 'flex justify-end' : 'flex justify-start';
      const bubble = document.createElement('div');
      bubble.className = `max-w-[85%] text-xs p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
        sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant shadow-sm'
      }`;
      bubble.textContent = text;
      wrapper.appendChild(bubble);
      logs.appendChild(wrapper);
      logs.scrollTop = logs.scrollHeight;
    }

    function resolveAI(query) {
      const q = query.toLowerCase();
      if (q.includes('room') || q.includes('rate') || q.includes('price')) return AI_KNOWLEDGE.rooms;
      if (q.includes('spa') || q.includes('massage') || q.includes('stone')) return AI_KNOWLEDGE.spa;
      if (q.includes('attraction') || q.includes('blyde') || q.includes('canyon')) return AI_KNOWLEDGE.attractions;
      if (q.includes('amenity') || q.includes('pool') || q.includes('wifi')) return AI_KNOWLEDGE.amenities;
      return AI_KNOWLEDGE.default;
    }

    function handleUserMessage(msg) {
      if (!msg.trim()) return;
      appendBubble('user', msg);
      const loadingWrapper = document.createElement('div');
      loadingWrapper.className = 'flex justify-start';
      const loadingBubble = document.createElement('div');
      loadingBubble.className = 'chat-bubble-assistant max-w-[85%] text-[10px] font-montserrat tracking-widest uppercase text-gray-400 p-3.5 rounded-2xl';
      loadingBubble.innerHTML = 'Concierge is typing<span class="animate-pulse">...</span>';
      loadingWrapper.appendChild(loadingBubble);
      logs.appendChild(loadingWrapper);
      logs.scrollTop = logs.scrollHeight;

      setTimeout(() => {
        loadingWrapper.remove();
        const answer = resolveAI(msg);
        appendBubble('assistant', answer);
      }, 800 + Math.random() * 500);
    }

    if (sendBtn) sendBtn.addEventListener('click', () => { const txt = input.value; if (txt.trim()) { handleUserMessage(txt); input.value = ''; } });
    if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const txt = input.value; if (txt.trim()) { handleUserMessage(txt); input.value = ''; } } });
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-query-text') || '';
        if (text) handleUserMessage(text);
      });
    });
  }
});
