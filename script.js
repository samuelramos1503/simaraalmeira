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

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
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
  const track = document.getElementById('galleryTrack');
  const slides = document.querySelectorAll('.gallery-slide');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const btnPrev = document.getElementById('galleryPrev');
  const btnNext = document.getElementById('galleryNext');

  if (!slides || slides.length === 0) return;

  let currentSlide = 0;
  let autoSlideTimer = null;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    // Rolagem horizontal fluida do carrossel
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    thumbs.forEach((thumb, i) => {
      if (i === currentSlide) {
        thumb.style.borderColor = 'var(--color-gold)';
        thumb.style.opacity = '1';
        thumb.style.transform = 'scale(1.05)';
      } else {
        thumb.style.borderColor = 'transparent';
        thumb.style.opacity = '0.55';
        thumb.style.transform = 'scale(1)';
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
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
      showSlide(idx);
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
