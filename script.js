document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
      }
    });
  });
});
