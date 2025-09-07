// Efeito de Fundo - Partículas
document.addEventListener('DOMContentLoaded', () => {
  const section = document.body;

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 8 + 5;
    particle.style.animation = `float-up ${duration}s infinite linear`;

    section.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  }

  setInterval(createParticle, 300);
});

// Scroll fade-in
const sections = document.querySelectorAll('section');
const options = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, options);
sections.forEach(section => observer.observe(section));

// Galeria
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

function showGallery(index) {
  galleryItems.forEach(item => item.classList.remove('active'));
  galleryItems[index].classList.add('active');
}
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showGallery(currentIndex);
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showGallery(currentIndex);
});
// Auto-slide
setInterval(() => { nextBtn.click(); }, 5000);

// Animação de fade-in para a seção de orçamento
document.addEventListener('DOMContentLoaded', function() {
  const budgetSection = document.getElementById('budget');
  if (budgetSection) { // Verifica se o elemento existe antes de adicionar o evento
    function showBudgetOnScroll() {
      const rect = budgetSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        budgetSection.classList.add('visible');
        window.removeEventListener('scroll', showBudgetOnScroll);
      }
    }
    window.addEventListener('scroll', showBudgetOnScroll);
    showBudgetOnScroll();
  }
});

function toggleValue(element) {
  const valueSpan = element.querySelector("#total-value");
  const eyeIcon = element.querySelector("#eye-icon");

  if (valueSpan.dataset.visible === "true") {
    valueSpan.textContent = "••••••";
    valueSpan.dataset.visible = "false";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  } else {
    valueSpan.textContent = "R$8.100,00"; 
    valueSpan.dataset.visible = "true";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  }
}