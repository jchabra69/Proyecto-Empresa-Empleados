class Empleado {
    #id;
    #nombre;
    #email;
    #puesto;
    #fechaContratacion;
    #idEmpresa;

    constructor(id, nombre, email, puesto, fechaContratacion, idEmpresa) {
        this.#id = id;
        this.#nombre = nombre;
        this.#email = email;
        this.#puesto = puesto;
        this.#fechaContratacion = fechaContratacion;
        this.#idEmpresa = idEmpresa;
    }


    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    getEmail() {
        return this.#email;
    }

    getPuesto() {
        return this.#puesto;
    }

    getFechaContratacion() {
        return this.#fechaContratacion;
    }

    getIdEmpresa() {
        return this.#idEmpresa;
    }

    // Métodos para modificar los valores de los atributos (setters)
    setNombre(nombre) {
        this.#nombre = nombre;
    }

    setEmail(email) {
        this.#email = email;
    }

    setPuesto(puesto) {
        this.#puesto = puesto;
    }

    setFechaContratacion(fechaContratacion) {
        this.#fechaContratacion = fechaContratacion;
    }

    setIdEmpresa(idEmpresa) {
        this.#idEmpresa = idEmpresa;
    }
}
