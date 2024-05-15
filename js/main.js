const bodyEl = document.body;
const hamburgerEl = document.querySelector('.nav__button-menu');
const menuEl = document.getElementById('nav__menu');

hamburgerEl.addEventListener('click', () => {
    menuEl.classList.toggle('active');
});
