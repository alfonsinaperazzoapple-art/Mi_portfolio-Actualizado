document.getElementById('year').textContent = new Date().getFullYear();

const btn = document.getElementById('btn-menu');
const nav = document.getElementById('nav');
btn.addEventListener('click', ()=> {
  if(nav.style.display === 'flex'){
    nav.style.display = '';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '12px';
  }
});

document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  alert('¡Mensaje enviado (simulado)!');
  e.target.reset();
});

