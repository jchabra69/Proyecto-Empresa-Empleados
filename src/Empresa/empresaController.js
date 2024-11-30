document.addEventListener('DOMContentLoaded', function () {
    // Expresiones regulares para validar los campos del formulario
    const regExpr = {
        nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,  // Validar solo letras y espacios
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Validar correo electrónico
        ubicacion: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]+$/,  // Letras, números y algunos caracteres especiales
        fechaFundacion: /^\d{4}-\d{2}-\d{2}$/,  // Validar fecha en formato yyyy-mm-dd
    };

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

    // Función para validar el formulario
    function validarFormulario() {
        let esValido = true;
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const fechaFundacion = document.getElementById('fechaFundacion').value;

        if (!regExpr.nombre.test(nombre)) {
            mostrarError('nombre', 'El nombre solo puede contener letras y espacios');
            esValido = false;
        } else {
            mostrarExito('nombre');
        }

        if (!regExpr.email.test(email)) {
            mostrarError('email', 'Por favor, ingrese un correo electrónico válido');
            esValido = false;
        } else {
            mostrarExito('email');
        }

        if (!regExpr.ubicacion.test(ubicacion)) {
            mostrarError('ubicacion', 'La ubicación solo puede contener letras, números y caracteres especiales');
            esValido = false;
        } else {
            mostrarExito('ubicacion');
        }

        if (!regExpr.fechaFundacion.test(fechaFundacion)) {
            mostrarError('fechaFundacion', 'Por favor, ingrese una fecha válida en formato YYYY-MM-DD');
            esValido = false;
        } else {
            mostrarExito('fechaFundacion');
        }

        return esValido;
    }

    // Función para mostrar los errores de validación
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

    // Función para mostrar los mensajes de éxito
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

    // Función para eliminar una empresa
    function eliminarEmpresa(id) {
        empresas = empresas.filter(e => e.id !== id);
        mostrarEmpresas();
    }

    // Función para mostrar las empresas en la lista de selección
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
                    <button class="btn btn-danger btn-sm" data-id="${empresa.id}">Eliminar</button>
                </div>
            `;
            listaEmpresas.appendChild(div);
        });

        listaEmpresas.addEventListener('click', function(e) {
            if (e.target && e.target.matches('button.btn-danger')) {
                const empresaId = e.target.getAttribute('data-id');
                eliminarEmpresa(empresaId);
            } else if (e.target && e.target.matches('button.btn-primary')) {
                const empresaId = e.target.getAttribute('data-id');
                editarEmpresa(empresaId);
            }
        });
    }

    // Función para editar una empresa
    function editarEmpresa(id) {
        const empresa = empresas.find(e => e.id === id);
        if (empresa) {
            document.getElementById('empresa-id').value = empresa.id;
            document.getElementById('nombre').value = empresa.nombre;
            document.getElementById('email').value = empresa.email;
            document.getElementById('ubicacion').value = empresa.ubicacion;
            document.getElementById('fechaFundacion').value = empresa.fechaFundacion;

            document.getElementById('editar-empresa-form').style.display = 'block';
            document.getElementById('volver-lista-button').style.display = 'none';
            document.getElementById('seleccionar-empresa').style.display = 'none';
        }
    }

    // Función para manejar el envío del formulario de edición
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

    // Función para cargar empresas desde un archivo JSON
    const loadButton = document.getElementById('load-button');
    const fileInput = document.getElementById('file-input');

    if (loadButton && fileInput) {
        loadButton.addEventListener('click', function () {
            const file = fileInput.files[0];
            if (file) {
                cargarEmpresasDesdeArchivo(file);
            } else {
                alert("Por favor, seleccione un archivo JSON.");
            }
        });
    }

    // Función para cargar las empresas desde un archivo JSON
    function cargarEmpresasDesdeArchivo(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data)) {
                    empresas = data;  // Guardamos las empresas cargadas
                    mostrarEmpresas();  // Actualizamos la lista de empresas
                    cargarEmpresasEnSelector();  // Actualizamos el selector de empresa
                } else {
                    // Si el formato no es correcto, no hacer nada (o puedes agregar un log opcional)
                    console.log("El archivo JSON no tiene el formato correcto.");
                }
            } catch (e) {
                // Aquí se elimina el alert innecesario
                console.log("Error al leer el archivo JSON."); // Si quieres solo un log, de lo contrario, no pongas nada
            }
        };
        reader.readAsText(file);
    }


    // Función para cargar las empresas en el selector
    function cargarEmpresasEnSelector() {
        const empresaSelector = document.getElementById('empresa-lista');
        const mensajeNoEmpresas = document.getElementById('mensaje-no-empresas');
        const empresaSelectorContainer = document.getElementById('empresa-selector');

        if (empresas.length > 0) {
            empresaSelectorContainer.style.display = 'block';
            mensajeNoEmpresas.style.display = 'none';

            empresaSelector.innerHTML = '';
            empresas.forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa.id;
                option.textContent = empresa.nombre;
                empresaSelector.appendChild(option);
            });

            const editarButton = document.getElementById('editar-button');
            editarButton.disabled = false;
        } else {
            empresaSelectorContainer.style.display = 'none';
            mensajeNoEmpresas.style.display = 'block';
        }
    }

    // Evento para el botón "Volver a la Lista de Empresas"
    const volverListaButton = document.getElementById('volver-lista-button');
    if (volverListaButton) {
        volverListaButton.addEventListener('click', function () {
            // Se muestra el selector de empresas y el botón de volver
            document.getElementById('editar-empresa-form').style.display = 'none';
            document.getElementById('volver-lista-button').style.display = 'none';
            document.getElementById('seleccionar-empresa').style.display = 'block';
        });
    }

    // Evento para el botón "Editar Empresa"
    const editarButton = document.getElementById('editar-button');
    if (editarButton) {
        editarButton.addEventListener('click', function () {
            const empresaId = document.getElementById('empresa-lista').value;
            if (empresaId) {
                editarEmpresa(empresaId);
            }
        });
    }

    // Cargar empresas al inicio si ya se han cargado previamente
    cargarEmpresasEnSelector();
});
