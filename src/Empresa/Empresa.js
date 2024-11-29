class Empresa {
    #id;
    #nombre;
    #email;
    #ubicacion;
    #fechaFundacion;

    constructor(id, nombre, email, ubicacion, fechaFundacion) {
        this.#id = id;
        this.#nombre = nombre;
        this.#email = email;
        this.#ubicacion = ubicacion;
        this.#fechaFundacion = fechaFundacion;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get email() {
        return this.#email;
    }

    get ubicacion() {
        return this.#ubicacion;
    }

    get fechaFundacion() {
        return this.#fechaFundacion;
    }

    set nombre(value) {
        this.#nombre = value;
    }

    set email(value) {
        this.#email = value;
    }

    set ubicacion(value) {
        this.#ubicacion = value;
    }

    set fechaFundacion(value) {
        this.#fechaFundacion = value;
    }

    toString() {
        return `Empresa: ${this.#nombre} (ID: ${this.#id}), Email: ${this.#email}, Ubicación: ${this.#ubicacion}, Fundación: ${this.#fechaFundacion}`;
    }
}
