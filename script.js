/**
 * Simara Almeida — Nutrição Funcional & Gastroenterologia
 * WhatsApp: (33) 99978-3832 (5533999783832)
 * Instagram: @simaraalmeidanutri
 * Lógica do Menu Mobile, FAQ Sanfona, Status de Atendimento e Links do WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navCloseBtn = document.getElementById('navCloseBtn');
  const navOverlay = document.getElementById('navOverlay');

  function openNav() {
    if (nav) nav.classList.add('open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (navOverlay) navOverlay.classList.add('active');
  }

  function closeNav() {
    if (nav) nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (navOverlay) navOverlay.classList.remove('active');
  }

  if (burger && nav) {
    burger.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (navCloseBtn) navCloseBtn.addEventListener('click', closeNav);
    if (navOverlay) navOverlay.addEventListener('click', closeNav);

    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Gallery Slider for Dra. Simara (Section #sobre)
  initDoctorGallery();

  // Check Live Status
  updateConsultationStatus();
});

function initDoctorGallery() {
  const slides = document.querySelectorAll('.gallery-slide');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const btnPrev = document.getElementById('galleryPrev');
  const btnNext = document.getElementById('galleryNext');

  if (!slides || slides.length === 0) return;

  let currentSlide = 0;
  let autoSlideTimer = null;

  function showSlide(index, direction = 'next') {
    if (index === currentSlide && slides[currentSlide].classList.contains('active')) return;

    const previousSlide = currentSlide;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.style.transition = 'none';
        slide.style.transform = direction === 'next' ? 'translateX(30px)' : 'translateX(-30px)';
        slide.style.opacity = '0';
        slide.style.visibility = 'visible';

        void slide.offsetWidth; // Força repaint

        slide.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        slide.classList.add('active');
        slide.style.transform = 'translateX(0)';
        slide.style.opacity = '1';
      } else if (i === previousSlide) {
        slide.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        slide.style.transform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)';
        slide.style.opacity = '0';
        setTimeout(() => {
          if (i !== currentSlide) {
            slide.classList.remove('active');
            slide.style.visibility = 'hidden';
          }
        }, 350);
      } else {
        slide.classList.remove('active');
        slide.style.visibility = 'hidden';
        slide.style.opacity = '0';
      }
    });

    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1, 'next');
  }

  function prevSlide() {
    showSlide(currentSlide - 1, 'prev');
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      const dir = idx >= currentSlide ? 'next' : 'prev';
      showSlide(idx, dir);
      resetTimer();
    });
  });

  function startTimer() {
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    startTimer();
  }

  startTimer();
}

function updateConsultationStatus() {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusTitle = document.getElementById('statusTitle');

  if (!statusIndicator || !statusTitle) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Dom, 1 = Seg ... 6 = Sáb
  const hours = now.getHours();

  // Atendimento: Seg a Sex das 08h às 18h
  let isOpen = false;
  if (day >= 1 && day <= 5 && hours >= 8 && hours < 18) {
    isOpen = true;
  }

  if (isOpen) {
    statusIndicator.className = 'pulse-dot';
    statusTitle.textContent = 'Consultório Aberto • Agendamentos Disponíveis no WhatsApp';
    statusTitle.style.color = '#10b981';
  } else {
    statusIndicator.className = 'status-indicator';
    statusIndicator.style.backgroundColor = '#fbbf24';
    statusTitle.textContent = 'Agendamentos Online Disponíveis 24h no WhatsApp';
    statusTitle.style.color = '#fbbf24';
  }
}
