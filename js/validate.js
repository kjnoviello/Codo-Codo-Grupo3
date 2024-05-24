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
function validatePhone(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}