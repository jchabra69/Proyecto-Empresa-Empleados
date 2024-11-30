document.addEventListener('DOMContentLoaded', function () {
    const regExpr = {
        nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,  // Valida solo letras y espacios
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Valida el formato correo
        telefono: /^[0-9]{10}$/,  // Valida un número de teléfono permitiendo hasta 10 dígitos
    };

    let empleados = [];

    // Función para generar un ID único para cada empleado
    function generarId() {
        return 'empleado-' + Math.floor(Math.random() * 1000000);  // lo haremos aleatoriamente
    }

    // Función para guardar los empleados en un archivo JSON
    function guardarEmpleadosEnJSON() {
        const blob = new Blob([JSON.stringify(empleados, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'empleados.json';
        link.click();
    }

    // Función para mostrar los empleados en la lista
    function mostrarEmpleados() {
        const listaEmpleados = document.getElementById('empleado-lista');
        listaEmpleados.innerHTML = '';

        empleados.forEach((empleado) => {
            const div = document.createElement('div');
            div.classList.add('col-12', 'col-md-6', 'col-lg-4');
            div.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${empleado.nombre}</h5>
                        <p class="card-text">ID: ${empleado.id}</p>
                        <p class="card-text">Email: ${empleado.email}</p>
                        <p class="card-text">Teléfono: ${empleado.telefono}</p>
                        <div class="text-center mt-2">
                            <button class="btn btn-danger btn-sm" data-id="${empleado.id}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            listaEmpleados.appendChild(div);
        });


        listaEmpleados.addEventListener('click', function(e) {
            if (e.target && e.target.matches('button.btn-danger')) {
                const empleadoId = e.target.getAttribute('data-id');
                eliminarEmpleado(empleadoId);
            } else if (e.target && e.target.matches('button.btn-warning')) {
                const empleadoId = e.target.getAttribute('data-id');
                editarEmpleado(empleadoId);
            }
        });
    }

    // Función para eliminar un empleado
    function eliminarEmpleado(id) {
        empleados = empleados.filter(e => e.id !== id);
        mostrarEmpleados();
    }

    // Función para editar un empleado
    function editarEmpleado(id) {
        const empleado = empleados.find(e => e.id === id);
        if (empleado) {
            document.querySelector('#empleado-id').value = empleado.id;
            document.querySelector('#nombre').value = empleado.nombre;
            document.querySelector('#email').value = empleado.email;
            document.querySelector('#telefono').value = empleado.telefono;

            document.querySelector('#editar-empleado-form').style.display = 'block';
        }
    }

    // Función para manejar el envío del formulario de creación de empleado
    const formCrear = document.getElementById('crear-empleado-form');
    if (formCrear) {
        formCrear.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = document.querySelector('#nombre').value;
            const email = document.querySelector('#email').value;
            const telefono = document.querySelector('#telefono').value;

            const nuevoEmpleado = {
                id: generarId(),
                nombre: nombre,
                email: email,
                telefono: telefono
            };
            empleados.push(nuevoEmpleado);
            mostrarEmpleados();
            guardarEmpleadosEnJSON();
            formCrear.reset();
        });
    }

    // Función para cargar empleados desde un archivo JSON
    const loadButton = document.getElementById('load-button');
    const fileInput = document.getElementById('file-input');
    if (loadButton && fileInput) {
        loadButton.addEventListener('click', function() {
            const file = fileInput.files[0];
            if (file) {
                cargarEmpleadosDesdeArchivo(file);
            } else {
                alert("Por favor, seleccione un archivo JSON.");
            }
        });
    }

    // Función para cargar los empleados desde un archivo JSON
    function cargarEmpleadosDesdeArchivo(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data)) {
                    empleados = data;
                    mostrarEmpleados();
                } else {
                    alert("El archivo JSON no tiene el formato correcto.");
                }
            } catch (e) {
                alert("Error al leer el archivo JSON.");
            }
        };
        reader.readAsText(file);
    }

    // Carga empleados al inicio si ya se han cargado previamente
    mostrarEmpleados();
});
