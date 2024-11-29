document.addEventListener('DOMContentLoaded', function () {
    // Expresiones regulares para validar los campos del formulario
    const regExpr = {
        nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,  // Validar solo letras y espacios
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Validar correo electrónico
        ubicacion: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]+$/,  // Letras, números y algunos caracteres especiales
        fechaFundacion: /^\d{4}-\d{2}-\d{2}$/,  // Validar fecha en formato yyyy-mm-dd
    };

    // Lista para guardar las empresas
    let empresas = [];

    // Función para generar un ID único para cada empresa
    function generarId() {
        return 'empresa-' + Math.floor(Math.random() * 1000000);  // Generar un número aleatorio
    }

    // Función para guardar las empresas en un archivo JSON
    function guardarEmpresasEnJSON() {
        const blob = new Blob([JSON.stringify(empresas, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'empresas.json';
        link.click();
    }

    // Validación de los campos del formulario
    function validarFormulario() {
        let esValido = true;

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const fechaFundacion = document.getElementById('fechaFundacion').value;

        // Comprobamos que el nombre solo tenga letras y espacios
        if (!regExpr.nombre.test(nombre)) {
            mostrarError('nombre', 'El nombre solo puede contener letras y espacios');
            esValido = false;
        } else {
            mostrarExito('nombre');
        }

        // Validar si el email es correcto
        if (!regExpr.email.test(email)) {
            mostrarError('email', 'Por favor, ingrese un correo electrónico válido');
            esValido = false;
        } else {
            mostrarExito('email');
        }

        // Validar si la ubicación solo tiene caracteres permitidos
        if (!regExpr.ubicacion.test(ubicacion)) {
            mostrarError('ubicacion', 'La ubicación solo puede contener letras, números y caracteres especiales');
            esValido = false;
        } else {
            mostrarExito('ubicacion');
        }

        // Validar la fecha de fundación
        if (!regExpr.fechaFundacion.test(fechaFundacion)) {
            mostrarError('fechaFundacion', 'Por favor, ingrese una fecha válida en formato YYYY-MM-DD');
            esValido = false;
        } else {
            mostrarExito('fechaFundacion');
        }

        return esValido;
    }

    // Mostrar error si hay problemas en el campo
    function mostrarError(campo, mensaje) {
        const input = document.getElementById(campo);
        const error = input.nextElementSibling;
        if (error) {
            error.textContent = mensaje;
            error.style.display = 'block';
        }
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    // Mostrar mensaje de éxito si la validación pasó
    function mostrarExito(campo) {
        const input = document.getElementById(campo);
        const error = input.nextElementSibling;
        if (error) {
            error.textContent = '';
            error.style.display = 'none';
        }
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }

    // Editar los datos de una empresa
    function editarEmpresa(id) {
        console.log("Editar empresa con ID:", id);
        const empresa = empresas.find(e => e.id === id);
        if (empresa) {
            document.getElementById('empresa-id').value = empresa.id;
            document.getElementById('nombre').value = empresa.nombre;
            document.getElementById('email').value = empresa.email;
            document.getElementById('ubicacion').value = empresa.ubicacion;
            document.getElementById('fechaFundacion').value = empresa.fechaFundacion;
        }
        window.location.href = 'editarEmpresa.html';
    }

    // Eliminar una empresa
    function eliminarEmpresa(id) {
        console.log("Eliminar empresa con ID:", id);
        const confirmacion = confirm('¿Está seguro de que desea eliminar esta empresa?');
        if (confirmacion) {
            empresas = empresas.filter(e => e.id !== id);
            guardarEmpresasEnJSON();
            mostrarEmpresas();
        }
    }

    // Mostrar todas las empresas en la lista
    function mostrarEmpresas() {
        const listaEmpresas = document.getElementById('empresa-lista');
        listaEmpresas.innerHTML = '';

        empresas.forEach((empresa) => {
            const div = document.createElement('div');
            div.classList.add('empresa-card');
            div.innerHTML = `
            <h5 class="card-title">${empresa.nombre}</h5>
            <p class="card-text">ID: ${empresa.id}</p>
            <p class="card-text">Email: ${empresa.email}</p>
            <p class="card-text">Ubicación: ${empresa.ubicacion}</p>
            <p class="card-text">Fecha de Fundación: ${empresa.fechaFundacion}</p>
            <div class="text-center mt-2">
                <button class="btn btn-warning btn-sm" onclick="editarEmpresa('${empresa.id}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarEmpresa('${empresa.id}')">Eliminar</button>
            </div>
        `;
            listaEmpresas.appendChild(div);
        });
    }

    // Si estamos en listaEmpresas.html, mostramos las empresas
    if (window.location.pathname.includes('listaEmpresas.html')) {
        mostrarEmpresas();
    }

    // Guardamos los cambios al editar una empresa
    const formEditar = document.getElementById('editar-empresa-form');
    if (formEditar) {
        formEditar.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                const id = document.getElementById('empresa-id').value;
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
                const ubicacion = document.getElementById('ubicacion').value;
                const fechaFundacion = document.getElementById('fechaFundacion').value;

                const empresa = empresas.find(e => e.id === id);
                if (empresa) {
                    empresa.nombre = nombre;
                    empresa.email = email;
                    empresa.ubicacion = ubicacion;
                    empresa.fechaFundacion = fechaFundacion;
                }

                guardarEmpresasEnJSON();
                window.location.href = 'listaEmpresas.html';
            } else {
                alert('Por favor, corrija los errores antes de enviar el formulario.');
            }
        });
    }

    // Crear una nueva empresa
    const formCrear = document.getElementById('crear-empresa-form');
    if (formCrear) {
        formCrear.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
                const ubicacion = document.getElementById('ubicacion').value;
                const fechaFundacion = document.getElementById('fechaFundacion').value;

                const nuevaEmpresa = {
                    id: generarId(),
                    nombre,
                    email,
                    ubicacion,
                    fechaFundacion
                };

                empresas.push(nuevaEmpresa);
                guardarEmpresasEnJSON();
                window.location.href = 'listaEmpresas.html';
            } else {
                alert('Por favor, corrija los errores antes de enviar el formulario.');
            }
        });
    }

    // Función para cargar empresas desde un archivo JSON
    function cargarEmpresasDesdeArchivo(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data)) {
                    empresas = data;
                    mostrarEmpresas();
                } else {
                    alert("El archivo JSON no tiene el formato correcto.");
                }
            } catch (e) {
                alert("Error al leer el archivo JSON.");
            }
        };
        reader.readAsText(file);
    }

    const loadButton = document.getElementById('load-button');
    const fileInput = document.getElementById('file-input');
    if (loadButton && fileInput) {
        loadButton.addEventListener('click', function() {
            const file = fileInput.files[0];
            if (file) {
                cargarEmpresasDesdeArchivo(file);
            } else {
                alert("Por favor, seleccione un archivo JSON.");
            }
        });
    }
});
