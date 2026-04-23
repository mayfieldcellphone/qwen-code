document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const accordionToggles = document.querySelectorAll('.accordion-toggle');

  accordionToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const item = toggle.closest('.accordion-item');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (item) {
        item.classList.toggle('open', !expanded);
        toggle.setAttribute('aria-expanded', String(!expanded));
      }
    });
  });
});
