document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.innerHTML = `
        .error-mensaje {
            color: red;
            font-size: 0.9em;
            display: none
        }
        .form-control.invalido {
            border-color: red;
        }
        .form-control.error-placeholder::placeholder {
            color: red;
            font-size: 0.9em;
        }
        .mensaje-exitoso {
            color: green;
            font-size: 1em;
            display: none;
            margin-top: 10px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 40px;
            border: 1px solid green;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    `;

    document.head.appendChild(style);

    const form = document.getElementById('reservationForm');

    const campos = [
        { id: 'nombres', message: 'Por favor, ingrese su nombre completo.', regex: /^(?=.{2,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+){0,4}$/ },
        { id: 'telefono', message: 'Por favor, ingrese un número de teléfono válido.', regex: /^[0-9]{6,10}$/ },
        { id: 'fecha', message: 'Por favor, seleccione una fecha.' },
        { id: 'email', message: 'Por favor, ingrese una dirección de correo electrónico válida.', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        { id: 'comensales', message: 'Por favor, ingrese el número de personas.', validate: value => value > 0 },
        { id: 'horario', message: 'Por favor, seleccione un horario.' },
        { id: 'contact-message', message: 'Por favor, ingrese un mensaje.' }
    ];

    // Almacenar los placeholders originales
    const originalPlaceholders = {};
    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        originalPlaceholders[campo.id] = input.placeholder;
    });

    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        input.classList.add('form-control');

        if (campo.id === 'email') {
            input.setAttribute('type', 'text');
        }

        input.addEventListener('input', function () {
            validarCampo(input, campo);
        });

        input.addEventListener('click', function () {
            limpiarMensajesError();
        });
    });

    const mensajeExitoso = document.createElement('div');
    mensajeExitoso.classList.add('mensaje-exitoso');
    mensajeExitoso.id = 'mensaje-exitoso';
    mensajeExitoso.textContent = 'Formulario enviado con éxito.';

    form.appendChild(mensajeExitoso);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let esValido = true;

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            if (!validarCampo(input, campo)) {
                esValido = false;
                input.focus();
            }
        });

        if (esValido) {
            campos.forEach(campo => {
                const input = document.getElementById(campo.id);
                input.classList.remove('invalido');
                input.classList.remove('error-placeholder');
                input.placeholder = '';  
            });

            form.reset();
            mensajeExitoso.style.display = 'block';

            setTimeout(() => {
                mensajeExitoso.style.display = 'none';
            }, 2000);
        }
    });


    function validarCampo(input, campo) {
        const value = input.value.trim();
        input.classList.remove('error-placeholder');
        input.placeholder = '';

        if (value === '' || (campo.regex && !campo.regex.test(value)) || (campo.validate && !campo.validate(value))) {
            input.classList.add('invalido');
            input.placeholder = campo.message;
            input.classList.add('error-placeholder');

            setTimeout(() => {
                input.placeholder = originalPlaceholders[campo.id];
                input.classList.remove('error-placeholder');
            }, 3000);
            return false;
        }
        input.classList.remove('invalido');

        return true;
    }


    function limpiarMensajesError() {
        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            input.classList.remove('invalido');
            input.classList.remove('error-placeholder');
            input.placeholder = originalPlaceholders[campo.id];
        });
    }


});