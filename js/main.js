// display del mapa en contacto

document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([-34.601242, -58.392862], 13); // Coordenadas para la Avenida 9 de Julio 2444

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);

  var marker = L.marker([-34.601242, -58.392862], { draggable: false }).addTo(
    map
  ); // Crear un marcador en la ubicación deseada
  marker.bindPopup("Avenida 9 de Julio 2444, Buenos Aires").openPopup();

  marker.on("dragend", function (event) {
    // Evento para actualizar la posición del marcador al arrastrarlo
    var marker = event.target;
    var position = marker.getLatLng();
    map.panTo(new L.LatLng(position.lat, position.lng));
  });
});

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
