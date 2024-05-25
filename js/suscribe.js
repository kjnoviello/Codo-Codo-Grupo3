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
document.querySelector("#form-story").addEventListener("submit", (e) => {

    const inputEmail = document.getElementById('story-email').value.trim()
    const emailError = document.querySelector("#contact-emailError");
    emailError.textContent = "";
    
    if (inputEmail === "") {
        e.preventDefault();
        emailError.textContent = "El correo es obligatorio.";
        emailError.classList.add("error");
        setTimeout(() => {
            emailError.textContent = "";
            emailError.classList.remove("error");
        }, 2000);
    } else if (!validateEmail(inputEmail)) {
        e.preventDefault();
        emailError.textContent = "El correo no es válido.";
        emailError.classList.add("error");
        setTimeout(() => {
            emailError.textContent = "";
            emailError.classList.remove("error");
        }, 2000);
    }
})

