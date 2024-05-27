// Validacion del formualario de Reserva

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

    // Para aplicar los estilos
    document.head.appendChild(style);

    const form = document.getElementById('reservationForm');

    // Obtiene la fecha de hoy y la del input
    const today = new Date().toISOString().split('T')[0];
    const fechaInput = document.getElementById('fecha');
    fechaInput.setAttribute('min', today);

    // Se define un array de objetos con los campos del formulario. Cada uno con su id, mensaje de error y validación
    const campos = [
        { id: 'nombres', message: 'Por favor, ingrese su nombre completo.', regex: /^(?=.{2,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+){0,4}$/ },
        { id: 'telefono', message: 'Por favor, ingrese un número de 6 a 10 dígitos', regex: /^[0-9]{6,10}$/ },
        { id: 'fecha', message: 'Por favor, seleccione una fecha.', validate: value => new Date(value) >= new Date(today)  },
        { id: 'email', message: 'Por favor, ingrese una dirección de correo electrónico válida.', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        { id: 'comensales', message: 'Por favor, ingrese el número de personas.'},
        { id: 'horario', message: 'Por favor, seleccione un horario entre las 8 y las 23hs.'},
    ];

    // Almacenar los placeholders originales. Si aparece un error, poder volver a mostrar el placeholder
    const originalPlaceholders = {};
    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        originalPlaceholders[campo.id] = input.placeholder;
    });

    // Con el forEach se itera por cada uno de los campos y agrega eventos de input y click
    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        input.classList.add('form-control');

        // Si el campo es de email, se cambia el tipo de entrada a 'text' para deshabilitar la validación del navegador
        if (campo.id === 'email') {
            input.setAttribute('type', 'text');
        }

        // Se agrega un evento para validar el campo en tiempo real
        input.addEventListener('input', function () {
            validarCampo(input, campo);
        });

        // El evento click permite limpiar los mensajes de error al hacer click en el campo a corregir/completar, sin tener que esperar que el mensaje desaparezca
        input.addEventListener('click', function () {
            limpiarMensajesError();
        });
    });

    // Se crea un <div> para mostrar el mensaje de éxito y el estilo
    const mensajeExitoso = document.createElement('div');
    mensajeExitoso.classList.add('mensaje-exitoso');
    mensajeExitoso.id = 'mensaje-exitoso';
    mensajeExitoso.textContent = 'Formulario enviado con éxito.';
    // Agrega el mensaje
    form.appendChild(mensajeExitoso);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let esValido = true;

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            // si un campo no es válido, establece esValido en false y enfoca el campo
            if (!validarCampo(input, campo)) {
                esValido = false;
                input.focus();
            }
        });

        //Si todos los campos son válidos, limpia los campos y muestra el mensaje de éxito
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
            }, 3000);
        }
    });


    function validarCampo(input, campo) {
        // obtiene y recorta el valor del campo
        const value = input.value.trim();
        // limpia los mensajes de errores anteriores
        input.classList.remove('error-placeholder');
        input.placeholder = '';

        // si el valor es vacío o no cumple la validación, muestra el mensaje de error
        if (value === '' || (campo.regex && !campo.regex.test(value)) || (campo.validate && !campo.validate(value))) {
            input.classList.add('invalido');
            input.placeholder = campo.message;
            input.classList.add('error-placeholder');

            // elimina el mensaje de error despues del tiempo establecido
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