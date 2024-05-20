
document.addEventListener("DOMContentLoaded", function () {
  const check = document.querySelector("#terms");
  const buttom = document.querySelector("#submit");
  check.addEventListener("change", () => {
    if (check.checked) {
      buttom.disabled = false;
    } else {
      buttom.disabled = true;
    }
  });
});

const bodyEl = document.body;
const hamburgerEl = document.querySelector('.nav__button-menu');
const menuEl = document.getElementById('nav__menu');

hamburgerEl.addEventListener('click', () => {
    menuEl.classList.toggle('active');

});
