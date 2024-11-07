document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('GI2SIhLcqsGHQszQ3'); // Tu ID de usuario de EmailJS

    const btn = document.getElementById('button');
    
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        btn.innerText = 'Enviando...';
    
        const serviceID = 'default_service';
        const templateID = 'template_1x0ypsl';
    
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerText = 'Enviar correo';
                mostrarMensaje('¡Correo enviado con éxito!', 'success');
            }, (err) => {
                btn.innerText = 'Enviar correo';
                mostrarMensaje('Error: ' + JSON.stringify(err), 'error');
            });
    });
    
    function mostrarMensaje(mensaje, tipo) {
        const messageContainer = document.getElementById('message-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${tipo} show`;
        messageDiv.textContent = mensaje;
    
        messageContainer.appendChild(messageDiv);
    
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 3000);
    }
    


   // Selección de elementos
// Selección de elementos
const carrito = document.querySelector('.cart-dropdown');
const contenedorCarrito = document.querySelector('#cart-body');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Asignar el evento de click para agregar alfajores al carrito
    document.addEventListener('click', agregarAlfajor);
    carrito.addEventListener('click', eliminarAlfajor);
}

// Función para agregar un alfajor al carrito
function agregarAlfajor(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const alfajorSeleccionado = e.target.closest('.product');
        leerDatosAlfajor(alfajorSeleccionado);
    }
}

// Función para eliminar un alfajor del carrito
function eliminarAlfajor(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const alfajorId = e.target.getAttribute('data-id');

        // Buscar el curso en el carrito y eliminarlo o disminuir la cantidad
        const alfajorIndex = articulosCarrito.findIndex(alfajor => alfajor.id === alfajorId);

        if (alfajorIndex !== -1) {
            // Si el curso existe en el carrito
            if (articulosCarrito[alfajorIndex].cantidad > 1) {
                // Si la cantidad es mayor a 1, disminuirla
                articulosCarrito[alfajorIndex].cantidad--;
            } else {
                // Si la cantidad es 1, eliminar el elemento del carrito
                articulosCarrito.splice(alfajorIndex, 1);
            }
            carritoHTML(); // Actualizar el HTML del carrito
        }
    }
}

// Función para leer los datos del alfajor
function leerDatosAlfajor(alfajor) {
    const infoAlfajor = {
        imagen: alfajor.querySelector('img').src,
        titulo: alfajor.querySelector('h3').textContent,
        precio: alfajor.querySelector('.price').textContent,
        id: alfajor.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    };

    // Verificar si el alfajor ya existe en el carrito
    const existe = articulosCarrito.some(alfajor => alfajor.id === infoAlfajor.id);
    if (existe) {
        // Actualizar la cantidad
        const alfajores = articulosCarrito.map(alfajor => {
            if (alfajor.id === infoAlfajor.id) {
                alfajor.cantidad++;
                return alfajor;
            }
            return alfajor;
        });
        articulosCarrito = [...alfajores];
    } else {
        // Agregar el alfajor al carrito
        articulosCarrito.push(infoAlfajor); // Se ha corregido la forma de agregar el elemento
    }

    carritoHTML(); // Actualizar el HTML del carrito
}

// Función para mostrar el carrito en el HTML
function carritoHTML() {
    limpiarHTML(); // Limpiar el HTML previo

    // Recorrer el carrito y generar el HTML para cada alfajor
    articulosCarrito.forEach(alfajor => {
        const { imagen, titulo, precio, id, cantidad } = alfajor;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    // Agregar el botón "Vaciar Carrito" al final del tbody
    if (articulosCarrito.length > 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" class="text-center">
                <button id="vaciar-carrito" class="boton-vaciar-carrito">Vaciar Carrito</button>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    }
}

// Función para limpiar el HTML del carrito
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

document.addEventListener('click', function(e) {
    if (e.target.id === 'vaciar-carrito') {
        e.preventDefault();
        articulosCarrito = []; // Vaciar el carrito
        carritoHTML(); // Actualizar el HTML del carrito
    }
});
  



const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
const userMessage = document.getElementById('user-message');
const submitRating = document.getElementById('submit-rating');
const ratingList = document.getElementById('rating-list');
let selectedRating = 0;

// Cargar valoraciones guardadas del localStorage
const valoracionesGuardadas = JSON.parse(localStorage.getItem('valoraciones')) || [];
mostrarValoraciones(valoracionesGuardadas);

// Muestra las valoraciones en la página
function mostrarValoraciones(valoraciones) {
    ratingList.innerHTML = ''; // Limpiar la lista de valoraciones
    valoraciones.forEach(valoracion => {
        const div = document.createElement('div');
        div.classList.add('rating-item');
        div.innerHTML = `
            <p><strong>Valoración:</strong> ${valoracion.rating} estrellas</p>
            <p><strong>Mensaje:</strong> ${valoracion.message}</p>
        `;
        ratingList.appendChild(div);
    });
}

// Manejar el clic en las estrellas
stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        ratingValue.textContent = selectedRating;

        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < selectedRating; i++) {
            stars[i].classList.add('selected');
        }
    });
});

// Enviar la valoración y guardarla en el localStorage
submitRating.addEventListener('click', function() {
    const message = userMessage.value.trim();
    if (selectedRating > 0 && message) {
        const nuevaValoracion = { rating: selectedRating, message: message };

        // Guardar la nueva valoración en el localStorage
        let valoracionesGuardadas = JSON.parse(localStorage.getItem('valoraciones')) || [];
        valoracionesGuardadas.push(nuevaValoracion);
        localStorage.setItem('valoraciones', JSON.stringify(valoracionesGuardadas));

        // Mostrar la alerta de éxito
        mostrarAlerta('¡Valoración enviada con éxito!', 'success');
        
        // Limpiar el formulario
        userMessage.value = '';
        stars.forEach(s => s.classList.remove('selected'));
        ratingValue.textContent = '0';
        selectedRating = 0;

        // Mostrar las valoraciones actualizadas
        mostrarValoraciones(valoracionesGuardadas);
    } else {
        mostrarAlerta('Por favor, selecciona una valoración y deja un mensaje.', 'error');
    }
});

// Mostrar alerta de éxito o error
function mostrarAlerta(mensaje, tipo) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = mensaje;

    if (tipo === 'success') {
        alert.classList.add('success');
    } else {
        alert.classList.add('error');
    }

    alertContainer.appendChild(alert);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alert.remove();
    }, 3000);
}



let currentSlide = 0;
const slideIntervalTime = 3500;
let slideInterval;

    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    slideInterval = setInterval(() => moveSlide(1), slideIntervalTime);

    function moveSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        const newTransformValue = -currentSlide * 100;
        document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
    }

    prevButton.addEventListener('click', function() {
        moveSlide(-1);
        clearInterval(slideInterval);
        slideInterval = setInterval(() => moveSlide(1), slideIntervalTime); // Restablecer el intervalo en el control manual
    });

    nextButton.addEventListener('click', function() {
        moveSlide(1);
        clearInterval(slideInterval);
        slideInterval = setInterval(() => moveSlide(1), slideIntervalTime); // Restablecer el intervalo en el control manual
    });












});

