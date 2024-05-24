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