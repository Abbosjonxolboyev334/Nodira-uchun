/**
 * TUG'ILGAN KUN TABRIKNOMASI - NODIRA UCHUN
 * Fireworks, Candle Extinguish, Local Happy Birthday MP3 Audio & Ambient FX
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const startCelebrationBtn = document.getElementById('startCelebrationBtn');
  const giftBoxBtn = document.getElementById('giftBoxBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicController = document.getElementById('musicController');
  const vinylDisk = document.getElementById('vinylDisk');
  const musicStatusText = document.getElementById('musicStatusText');

  // Cake Elements
  const candles = [
    { candle: document.getElementById('candle1'), flame: document.getElementById('flame1'), smoke: document.getElementById('smoke1'), blown: false },
    { candle: document.getElementById('candle2'), flame: document.getElementById('flame2'), smoke: document.getElementById('smoke2'), blown: false },
    { candle: document.getElementById('candle3'), flame: document.getElementById('flame3'), smoke: document.getElementById('smoke3'), blown: false }
  ];
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const candleHintText = document.getElementById('candleHintText');
  const wishGrantedBanner = document.getElementById('wishGrantedBanner');
  const fireworksMoreBtn = document.getElementById('fireworksMoreBtn');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const polaroidCards = document.querySelectorAll('.polaroid-card');

  // Canvases
  const fwCanvas = document.getElementById('fireworksCanvas');
  const fwCtx = fwCanvas.getContext('2d');
  const spCanvas = document.getElementById('sparklesCanvas');
  const spCtx = spCanvas.getContext('2d');

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  function resizeCanvases() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    fwCanvas.width = windowWidth;
    fwCanvas.height = windowHeight;
    spCanvas.width = windowWidth;
    spCanvas.height = windowHeight;
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  /* ===================================================
     1. ROBUST AUDIO CONTROLLER (HAPPY BIRTHDAY MP3)
     =================================================== */
  let isPlaying = false;

  // Preload and configure audio
  bgMusic.volume = 0.85;

  function playMusic() {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        vinylDisk.classList.add('spinning');
        musicStatusText.textContent = 'Happy Birthday 🎵';
      }).catch((err) => {
        console.log("Audio play request waiting or blocked:", err);
        isPlaying = false;
        vinylDisk.classList.remove('spinning');
        musicStatusText.textContent = 'Musiqani yoqish 🎵';
      });
    }
  }

  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    vinylDisk.classList.remove('spinning');
    musicStatusText.textContent = 'Musiqa to\'xtatildi ⏸️';
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  musicController.addEventListener('click', toggleMusic);

  // START EXPERIENCE BUTTON (User Gesture triggers audio directly)
  function handleStartExperience() {
    welcomeOverlay.classList.add('hidden');
    playMusic();
    triggerCelebrationConfetti();
    launchMultipleFireworks(3);
  }

  startCelebrationBtn.addEventListener('click', handleStartExperience);
  giftBoxBtn.addEventListener('click', handleStartExperience);

  // Soft Chime Sound on Candle Blow using Web Audio
  let audioCtx = null;
  function playMagicChime() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.2);
      });
    } catch(e) {
      console.log(e);
    }
  }

  /* ===================================================
     2. AMBIENT PARTICLES (STARS & HEARTS)
     =================================================== */
  const ambientStarsContainer = document.getElementById('ambientStars');
  const floatingHeartsContainer = document.getElementById('floatingHearts');

  function createAmbientStars(count = 55) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      ambientStarsContainer.appendChild(star);
    }
  }
  createAmbientStars();

  const heartIcons = ['💖', '🌸', '✨', '💕', '🌷', '⭐', '🎀'];
  function spawnFloatingHeart() {
    if (document.hidden) return;
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${Math.random() * 95}%`;
    const duration = Math.random() * 8 + 8; // 8-16s
    heart.style.animationDuration = `${duration}s`;
    heart.style.fontSize = `${Math.random() * 16 + 14}px`;
    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }
  setInterval(spawnFloatingHeart, 1200);

  /* ===================================================
     3. CURSOR SPARKLE TRAIL
     =================================================== */
  const sparkleParticles = [];

  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 2;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = ['#ffd166', '#ff85a2', '#ffffff', '#fbcfe8'][Math.floor(Math.random() * 4)];
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.02;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function addSparkle(x, y) {
    for (let i = 0; i < 2; i++) {
      sparkleParticles.push(new Sparkle(x, y));
    }
  }

  window.addEventListener('mousemove', (e) => {
    addSparkle(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      addSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  function renderSparkles() {
    spCtx.clearRect(0, 0, windowWidth, windowHeight);
    for (let i = sparkleParticles.length - 1; i >= 0; i--) {
      const p = sparkleParticles[i];
      p.update();
      p.draw(spCtx);
      if (p.alpha <= 0) {
        sparkleParticles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderSparkles);
  }
  renderSparkles();

  /* ===================================================
     4. INTERACTIVE CANDLE BLOWING & CELEBRATION
     =================================================== */
  function extinguishSingleCandle(item) {
    if (item.blown) return;
    item.blown = true;
    item.flame.classList.add('extinguished');
    item.smoke.classList.add('active');
    playMagicChime();

    // Check if all candles are blown
    const allBlown = candles.every(c => c.blown);
    if (allBlown) {
      onAllCandlesExtinguished();
    }
  }

  // Allow clicking on individual candles
  candles.forEach(item => {
    item.candle.addEventListener('click', () => {
      extinguishSingleCandle(item);
    });
  });

  // Blow all candles button
  blowCandleBtn.addEventListener('click', () => {
    candles.forEach((item, index) => {
      setTimeout(() => {
        extinguishSingleCandle(item);
      }, index * 220);
    });
  });

  function onAllCandlesExtinguished() {
    candleHintText.textContent = 'Barcha shamlar o\'chirildi! Niyatlaringiz ijobat bo\'lsin! 🎂✨';
    blowCandleBtn.style.display = 'none';
    wishGrantedBanner.classList.add('show');

    // BIG CELEBRATION!
    triggerCelebrationConfetti();
    launchMultipleFireworks(10);

    // Continuous fireworks show for 6 seconds
    let fireworksTimer = setInterval(() => {
      launchMultipleFireworks(2);
    }, 800);

    setTimeout(() => {
      clearInterval(fireworksTimer);
    }, 6000);
  }

  fireworksMoreBtn.addEventListener('click', () => {
    launchMultipleFireworks(8);
    triggerCelebrationConfetti();
  });

  /* ===================================================
     5. FIREWORKS & CONFETTI ENGINE (HIGH FIDELITY)
     =================================================== */
  const fwParticles = [];

  class FireworkParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.color = color;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.012;
      this.gravity = 0.08;
      this.friction = 0.96;
      this.size = Math.random() * 3 + 2;
    }
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const fireworkColors = [
    '#ff6b95', '#ffd166', '#ff85a2', '#a855f7', '#38bdf8', '#fb7185', '#fef08a', '#ffffff'
  ];

  function createFireworkExplosion(x, y) {
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    const particleCount = 70;
    for (let i = 0; i < particleCount; i++) {
      fwParticles.push(new FireworkParticle(x, y, color));
    }
  }

  function launchMultipleFireworks(count = 3) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = Math.random() * (windowWidth * 0.8) + (windowWidth * 0.1);
        const y = Math.random() * (windowHeight * 0.5) + (windowHeight * 0.15);
        createFireworkExplosion(x, y);
      }, i * 320);
    }
  }

  function renderFireworks() {
    fwCtx.clearRect(0, 0, windowWidth, windowHeight);
    for (let i = fwParticles.length - 1; i >= 0; i--) {
      const p = fwParticles[i];
      p.update();
      p.draw(fwCtx);
      if (p.alpha <= 0) {
        fwParticles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderFireworks);
  }
  renderFireworks();

  // Falling Confetti Animation
  function triggerCelebrationConfetti() {
    const confettiColors = ['#ff6b95', '#ffd166', '#a855f7', '#ffffff', '#ff85a2', '#4ade80'];
    const totalConfetti = 95;

    for (let i = 0; i < totalConfetti; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.zIndex = '98';
      conf.style.top = '-20px';
      conf.style.left = `${Math.random() * 100}vw`;
      const size = Math.random() * 8 + 6;
      conf.style.width = `${size}px`;
      conf.style.height = `${size * (Math.random() > 0.5 ? 1.6 : 1)}px`;
      conf.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      conf.style.borderRadius = Math.random() > 0.4 ? '2px' : '50%';
      conf.style.opacity = Math.random() * 0.6 + 0.4;
      conf.style.pointerEvents = 'none';

      const duration = Math.random() * 3 + 3.5;
      const sway = (Math.random() - 0.5) * 200;

      conf.animate([
        { transform: 'translateY(0) rotate(0deg) translateX(0)', opacity: 1 },
        { transform: `translateY(${windowHeight + 40}px) rotate(${Math.random() * 720}deg) translateX(${sway}px)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }).onfinish = () => conf.remove();

      document.body.appendChild(conf);
    }
  }

  /* ===================================================
     6. POLAROID LIGHTBOX MODAL
     =================================================== */
  polaroidCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.polaroid-caption');
      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightboxModal.classList.add('active');
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Random gentle sparkle firework every 9 seconds
  setInterval(() => {
    if (!document.hidden && Math.random() > 0.5) {
      launchMultipleFireworks(1);
    }
  }, 9000);
});
