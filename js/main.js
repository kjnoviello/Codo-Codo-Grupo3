// toogle menu hamburguesa en responsive

const hamburgerEl = document.querySelector(".nav__button-menu");
const menuEl = document.getElementById("nav__menu");

hamburgerEl.addEventListener("click", () => {
  menuEl.classList.toggle("active");
});


// toggle modal reservacion

const btnReservacionResp = document.querySelector(".openReservacionResp");
const btnReservacion = document.querySelector(".openReservacion");
const showReservacion = document.getElementById("openReservacion");
const btnCloseReservation = document.getElementById("closeReservation");

btnReservacionResp.addEventListener("click", () => {
  showReservacion.classList.toggle("hideReservacion");
});
btnReservacion.addEventListener("click", () => {
  showReservacion.classList.toggle("hideReservacion");
});
btnCloseReservation.addEventListener("click", () => {
  showReservacion.classList.toggle("hideReservacion");
});
