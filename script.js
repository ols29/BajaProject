// Scroll fade-in
const sections = document.querySelectorAll('section');
const options = { threshold:0.2 };
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, options);
sections.forEach(section => observer.observe(section));

// Galeria
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

function showGallery(index){
  galleryItems.forEach(item=>item.classList.remove('active'));
  galleryItems[index].classList.add('active');
}
prevBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex -1 + galleryItems.length)%galleryItems.length;
  showGallery(currentIndex);
});
nextBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex +1)%galleryItems.length;
  showGallery(currentIndex);
});
// Auto-slide
setInterval(()=>{ nextBtn.click(); },5000);

// Three.js - Veículo 3D
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
let camera = new THREE.PerspectiveCamera(45, window.innerWidth/500, 0.1, 1000);
camera.position.set(3,2,5);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,500);
document.getElementById('vehicle-3d').appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luzes
let light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,10,7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Chassi
let chassi = new THREE.Mesh(new THREE.BoxGeometry(2,0.3,1), new THREE.MeshStandardMaterial({color:0xff0000}));
chassi.position.y = 0.3;
scene.add(chassi);

// Rodas giratórias
function createWheel(x,z){
  let wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,0.2,32), new THREE.MeshStandardMaterial({color:0x000000}));
  wheel.rotation.z = Math.PI/2;
  wheel.position.set(x,0,z);
  scene.add(wheel);
  return wheel;
}
let wheels = [
  createWheel(-0.7,0.6), createWheel(-0.7,-0.6),
  createWheel(0.7,0.6), createWheel(0.7,-0.6)
];

function animate(){
  requestAnimationFrame(animate);
  wheels.forEach(w=>w.rotation.x +=0.05); // girar rodas
  controls.update();
  renderer.render(scene,camera);
}
animate();

// Animação de fade-in para a seção de orçamento
document.addEventListener('DOMContentLoaded', function() {
  const budgetSection = document.getElementById('budget');
  function showBudgetOnScroll() {
    const rect = budgetSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      budgetSection.classList.add('visible');
      window.removeEventListener('scroll', showBudgetOnScroll);
    }
  }
  window.addEventListener('scroll', showBudgetOnScroll);
  showBudgetOnScroll();
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


// Responsividade
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/500;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,500);
});
