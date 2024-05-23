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

// toogle boton surscibir en nosotros

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

// toogle menu hamburguesa en responsive

const hamburgerEl = document.querySelector(".nav__button-menu");
const menuEl = document.getElementById("nav__menu");

hamburgerEl.addEventListener("click", () => {
  menuEl.classList.toggle("active");
});

//Validation form Contact
document.querySelector("#form-contact").addEventListener("submit", (e) => {
  e.preventDefault();

  const inputName = document.querySelector("#contact-name").value.trim();
  const inputPhone = document.querySelector("#contact-phone").value.trim();
  const inputEmail = document.querySelector("#contact-email").value.trim();
  const inputMessage = document.querySelector("#contact-message").value.trim();

  const nameError = document.querySelector("#contact-nameError");
  const phoneError = document.querySelector("#contact-phoneError");
  const emailError = document.querySelector("#contact-emailError");
  const messageError = document.querySelector("#contact-MessageError");

  nameError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  if (inputName === "") {
    nameError.textContent = "El nombre es obligatorio.";
    nameError.classList.add("error");
    setTimeout(() => {
      nameError.textContent = "";
      nameError.classList.remove("error");
    }, 2000);
  }

  if (inputPhone === "") {
    phoneError.textContent = "El teléfono es obligatorio.";
    phoneError.classList.add("error");
    setTimeout(() => {
      phoneError.textContent = "";
      phoneError.classList.remove("error");
    }, 2000);
  }

  if (inputEmail === "") {
    emailError.textContent = "El correo es obligatorio.";
    emailError.classList.add("error");
    setTimeout(() => {
      emailError.textContent = "";
      emailError.classList.remove("error");
    }, 2000);
  } else if (!validateEmail(inputEmail)) {
    emailError.textContent = "El correo no es válido.";
    emailError.classList.add("error");
    setTimeout(() => {
      emailError.textContent = "";
      emailError.classList.remove("error");
    }, 2000);
  }

  if (inputMessage === "") {
    messageError.textContent = "El mensaje es obligatorio.";
    messageError.classList.add("error");
    setTimeout(() => {
      messageError.textContent = "";
      messageError.classList.remove("error");
    }, 2000);
  }
});
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}
