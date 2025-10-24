
document.addEventListener('DOMContentLoaded', () => {
  const textSection = document.getElementById('text-section');
  const profilePic = document.getElementById('profile-pic');
  const roleText = document.getElementById('role');
  const hiText = document.getElementById('hi');
  const nameEl = document.getElementById('name');
  const skillsSection = document.getElementById('languages');
  const progressBars = document.querySelectorAll('.progress');
  const skillCards = document.querySelectorAll('.skill');
  

  if (hiText) {
    const hour = new Date().getHours();
    if (hour < 12) hiText.textContent = 'Good Morning ☀️';
    else if (hour < 18) hiText.textContent = 'Good Afternoon 🌤️';
    else hiText.textContent = 'Good Evening 🌙';
  }

  if (textSection) {
    textSection.style.opacity = 0;
    textSection.style.transform = 'translateY(40px)';
    setTimeout(() => {
      textSection.style.transition = 'all 3.5s ease-in-out';
      textSection.style.opacity = 1;
      textSection.style.transform = 'translateY(0)';
    }, 300);
  }

  if (profilePic) {
    profilePic.style.opacity = 0;
    profilePic.style.transform = 'translateX(100px) scale(0.5)';
    setTimeout(() => {
      profilePic.style.opacity = 1;
      profilePic.style.transform = 'translateX(0) scale(1)';
    }, 500);

  
    const MAX_TILT = 15;
    const SCALE_HOVER = 1.06;

    const shine = document.createElement('div');
    shine.style.position = 'absolute';
    shine.style.pointerEvents = 'none';
    shine.style.width = '20%';
    shine.style.height = '20%';
    shine.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)';
    shine.style.borderRadius = '50%';
    shine.style.top = '-10%';
    shine.style.left = '-10%';
    shine.style.opacity = '0';
    shine.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    profilePic.parentElement.style.position = 'relative';
    profilePic.parentElement.appendChild(shine);

    profilePic.addEventListener('mousemove', (e) => {
      const rect = profilePic.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateY = x * MAX_TILT * -1;
      const rotateX = y * MAX_TILT;

      profilePic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE_HOVER})`;
      profilePic.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';

      const shineX = 50 + x * -50;
      const shineY = 50 + y * -50;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)`;
      shine.style.opacity = '1';
    });

    profilePic.addEventListener('mouseleave', () => {
      profilePic.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      profilePic.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
      shine.style.opacity = '0';
    });
  }

  if (roleText) {
    const fullText = roleText.textContent;
    roleText.textContent = ' ';
    let i = 0;
    (function type() {
      if (i < fullText.length) {
        roleText.textContent += fullText.charAt(i);
        i++;
        setTimeout(type, 250);
      }
    })();
  }

  if (nameEl) {
    nameEl.addEventListener('mouseenter', () => {
      nameEl.style.textShadow = '0 0 20px gold, 0 0 40px orange';
    });
    nameEl.addEventListener('mouseleave', () => {
      nameEl.style.textShadow = 'none';
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (nameEl) nameEl.style.transform = `translateY(${scrollY * 0.06}px)`;
    if (roleText) roleText.style.transform = `translateY(${scrollY * 0.06}px)`;
    if (scrollY > 120) {
      if (nameEl) nameEl.style.textShadow = '0 0 25px gold';
      if (roleText) roleText.style.textShadow = '0 0 18px #ffd700';
    } else {
      if (nameEl) nameEl.style.textShadow = 'none';
      if (roleText) roleText.style.textShadow = 'none';
    }
  });


 (function() {
    emailjs.init("2LZf8M0Y4LPrjdtne"); 
  })();

  const form = document.getElementById("contact-form");
  const popup = document.getElementById("contact-popup");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_9i1h09r", "template_q3ybokh", form)
      .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);

        popup.classList.add("show");
        setTimeout(() => {
          popup.classList.remove("show");
          setTimeout(() => popup.style.display = "none", 500);
        }, 3000);

        form.reset();
      })
      .catch(function(error) {
        console.error("FAILED...", error);
        alert("❌ Failed to send message. Please try again.");
      });
  });
  
  const banner = document.querySelector('.picture');
  const numStars = 25;
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    resetStar(star);
    banner.appendChild(star);
    stars.push(star);
  }

  function resetStar(star) {
    const x = Math.random() * banner.offsetWidth;
    const y = Math.random() * banner.offsetHeight;
    const scale = 0.5 + Math.random() * 1;
    const delay = Math.random() * 2;
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.transform = `scale(${scale})`;
    star.style.animationDelay = delay + 's';
    star.dataset.speedX = (Math.random() - 0.5) * 0.4;
    star.dataset.speedY = (Math.random() - 0.5) * 0.4;
  }

  function animateStars() {
    stars.forEach(star => {
      let x = parseFloat(star.style.left);
      let y = parseFloat(star.style.top);
      x += parseFloat(star.dataset.speedX);
      y += parseFloat(star.dataset.speedY);

      if (x < 0 || x > banner.offsetWidth) star.dataset.speedX *= -1;
      if (y < 0 || y > banner.offsetHeight) star.dataset.speedY *= -1;

      star.style.left = x + 'px';
      star.style.top = y + 'px';
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();

   const skillLevels = {
    html: 95,
    css: 90,
    javascript: 50,
    react: 75,
    python: 35
  };

  let barsFilled = false;

  function fillBar(bar) {
    const skillClass = Array.from(bar.classList).find(cls => skillLevels[cls]);
    if (skillClass) {
      bar.style.width = skillLevels[skillClass] + '%';
      bar.classList.add('fill'); 
    }
  }

  function fillBarsOnScroll() {
    const rect = skillsSection.getBoundingClientRect();
    if (!barsFilled && rect.top < window.innerHeight - 100) {
      progressBars.forEach(fillBar);
      barsFilled = true;
    }
  }

  window.addEventListener('scroll', fillBarsOnScroll);
  fillBarsOnScroll(); 

  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const bar = card.querySelector('.progress');
      if (bar) fillBar(bar);
    });
  });

const footer = document.querySelector('.footer');
if (footer) {
  const numFooterStars = 20; 
  const footerStars = [];

  for (let i = 0; i < numFooterStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    resetFooterStar(star);
    footer.appendChild(star);
    footerStars.push(star);
  }

  function resetFooterStar(star) {
    const x = Math.random() * footer.offsetWidth;
    const y = Math.random() * footer.offsetHeight;
    const scale = 0.5 + Math.random() * 1;
    const delay = Math.random() * 2;
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.transform = `scale(${scale})`;
    star.style.animationDelay = delay + 's';
    star.dataset.speedX = (Math.random() - 0.5) * 0.3;
    star.dataset.speedY = (Math.random() - 0.5) * 0.3;
  }

  function animateFooterStars() {
    footerStars.forEach(star => {
      let x = parseFloat(star.style.left);
      let y = parseFloat(star.style.top);
      x += parseFloat(star.dataset.speedX);
      y += parseFloat(star.dataset.speedY);

      if (x < 0 || x > footer.offsetWidth) star.dataset.speedX *= -1;
      if (y < 0 || y > footer.offsetHeight) star.dataset.speedY *= -1;

      star.style.left = x + 'px';
      star.style.top = y + 'px';
    });
    requestAnimationFrame(animateFooterStars);
  }

  animateFooterStars();
  
}

});
