(function () { emailjs.init("2LZf8M0Y4LPrjdtne"); })();

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-card, .proj-card, .svc-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '54px';
    ring.style.height = '54px';
    ring.style.borderColor = 'rgba(0,229,255,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(0,229,255,0.5)';
  });
});

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticle() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1
  };
}
for (let i = 0; i < 120; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > W) p.dx *= -1;
    if (p.y < 0 || p.y > H) p.dy *= -1;
  });
  //  connecting lines between nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== TYPEWRITER EFFECTS =====
const roles = ['WEBSITES.', 'EXPERIENCES.', 'INTERFACES.', 'THE FUTURE.'];
let ri = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed-role');

function typeRole() {
  const current = roles[ri];
  if (!deleting) {
    typed.textContent = current.substring(0, ci + 1);
    ci++;
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
    setTimeout(typeRole, 80);
  } else {
    typed.textContent = current.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 45);
  }
}
setTimeout(typeRole, 1000);

// ===== TIME-BASED GREETING =====
const hour = new Date().getHours();
const greetEl = document.getElementById('time-greeting');
if (greetEl) {
  if (hour < 12) greetEl.textContent = 'Good Morning ☀️';
  else if (hour < 18) greetEl.textContent = 'Good Afternoon 🌤️';
  else greetEl.textContent = 'Good Evening 🌙';
}

// ===== NAV SCROLL SHRINK =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('visible');
  }
});

// ===== HAMBURGER MENU =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ===== SKILL BARS ON SCROLL =====
const skillsGrid = document.getElementById('skills-grid');
let filled = false;

function fillSkills() {
  if (filled || !skillsGrid) return;
  const rect = skillsGrid.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    document.querySelectorAll('.skill-card').forEach(card => {
      const level = card.dataset.level;
      card.querySelector('.sk-fill').style.width = level + '%';
    });
    filled = true;
  }
}
window.addEventListener('scroll', fillSkills);
fillSkills();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.proj-card, .svc-card, .skill-card, .edu-item, .highlight-item, .c-link');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 60 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

// ===== CONTACT FORM =====
function submitForm() {
  const fname = document.getElementById('cf-fname').value.trim();
  const lname = document.getElementById('cf-lname').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value || 'General Enquiry';
  const message = document.getElementById('cf-message').value.trim();

  if (!fname || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const btn = document.getElementById('form-btn');
  btn.disabled = true;
  btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

  const templateParams = {
    from_name: fname + ' ' + lname,
    from_email: email,
    subject: subject,
    message: message
  };

  emailjs.send("service_9i1h09r", "template_q3ybokh", templateParams)
    .then(() => {
      btn.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      document.getElementById('contact-form').reset();
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      alert('Failed to send. Please email puse.madisha@gmail.com directly.');
    });
}

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
  });
});
