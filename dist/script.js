document.
querySelector('.navbar-toggler').
addEventListener('click', toggleNavbar);

const navbarLinks = document.querySelectorAll('.navbar__link');
const navbarFirstLink = navbarLinks[0];
const navbarLastLink = navbarLinks[navbarLinks.length - 1];

navbarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    toggleNavbar();

    setTimeout(() => {
      const hash = e.target.getAttribute('href');
      const el = document.querySelector(hash);

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start' });

    }, 300);
  });

  link.addEventListener('keydown', e => {
    if (e.keyCode !== 9) return;

    if (e.shiftKey) {
      if (e.target == navbarFirstLink) {
        e.preventDefault();
        navbarLastLink.focus();
      }
    } else {
      if (e.target == navbarLastLink) {
        e.preventDefault();
        navbarFirstLink.focus();
      }
    }
  });
});

function toggleNavbar() {
  document.querySelector('.navbar').classList.toggle('-open');
  document.querySelector('.navbar-toggler').classList.toggle('-activated');

  navbarLinks.forEach(link => {
    link.tabIndex = link.tabIndex == '-1' ? '0' : '-1';
  });
}

function inViewport(el) {
  const rect = el.getBoundingClientRect();
  const buffer = 100;

  return rect.bottom - buffer <= window.innerHeight && rect.right - buffer <= window.innerWidth;
}

const elementsList = [...document.querySelectorAll('.section__title, .section__body, .avatar, .project-tile, .contact-info__link')];

function animateElements() {
  for (let i = 0; i < elementsList.length; i++) {
    const el = elementsList[i];

    if (inViewport(el)) {
      elementsList.splice(i, 1);
      i--;
      el.classList.add('-animated');
    }
  }
}

animateElements();
window.addEventListener('scroll', animateElements);