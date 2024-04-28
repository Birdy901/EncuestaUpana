document.addEventListener('DOMContentLoaded', function () {
const formulario = document.getElementById('form');
const Lista = document.getElementById('vista');
let todos = []

// Cargar encuestas guardadas en el Local Storage al iniciar la página
cargarDatos();

// Función para cargar encuestas guardadas en el Local Storage
function cargarDatos() {
    let cargarTodos = JSON.parse(localStorage.getItem('todo')) || [];
    cargarTodos.forEach(element => {
        agregarElementosALista(element)
    });
}
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const satisfaccion = document.getElementById('satisfaccion').value.trim();
    const servicios = document.getElementById('servicios').value.trim();

    // Verificar si se han respondido todas las preguntas
    if (nombre && satisfaccion && servicios) {
        // Crear objeto de encuesta
        const datosEncuesta = {
            nombre,
            satisfaccion,
            servicios
        };

        // Agregar encuesta a la lista de visualización y guardar en Local Storage
        agregarElementosALista(datosEncuesta);
        guardarLista(datosEncuesta);
        todos.push(datosEncuesta);

        // Limpiar formulario
        formulario.reset();
    } else {
        alert('Por favor responde todas las preguntas.');
    }
});

// Función para agregar una encuesta a la lista de visualización
function agregarElementosALista(datos) {
    const Elementos = document.createElement('div');
    Elementos.classList.add('elemento');
    Elementos.innerHTML = `
    <p>Nombre: ${datos.nombre}</p>
    <p>Satisfaccion cursos: ${datos.satisfaccion}</p>
    <p>Satisfaccion de servicios: ${datos.servicios}</p>
    <button class="delete-btn">Eliminar</button>
    `;
    Lista.appendChild(Elementos);

    // Agregar evento de click al botón de eliminar
    const deleteBtn = Elementos.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        Lista.removeChild(Elementos);
        // Eliminar encuesta del Local Storage
        eliminarElemento(datos);
    });
}

// Función para guardar una encuesta en el Local Storage
function guardarLista(datos) {
    localStorage.setItem('todo', JSON.stringify(todos));
}

// Función para eliminar una encuesta del Local Storage
function eliminarElemento(datos) {
    let listas = JSON.parse(localStorage.getItem('surveys')) || [];
    listas = listas.filter(function (elemento) {
        return elemento.nombre !== datos.nombre ||
            elemento.satisfaccion !== datos.satisfaccion ||
            elemento.servicios !== datos.servicios;
    });
    localStorage.setItem('surveys', JSON.stringify(listas));
}
});
