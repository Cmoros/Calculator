const _display = document.querySelector("#display")

class Calculadora {
    pantalla = () => _display.innerHTML;
    modificar_pantalla(numero) {
        if (`${this.numero_actual[0]}`.length > 7 && !this.escribiendo_decimal) return;
        if (this.escribiendo_decimal) {
            _display.innerHTML += `${numero}`;
            this.numero_actual[0] = parseFloat(_display.innerHTML);
        } else if (this.operacion && this.segundo_numero[0] == null) {
            _display.innerHTML = `${numero}`;
            this.numero_actual[0] = numero;
        } else if (this.recien_mostrado) {
            this.numero_actual = this.primer_numero;
            _display.innerHTML = `${numero}`;
            this.numero_actual[0] = numero;
        } else if (this.pantalla() == "0") {
            _display.innerHTML = `${numero}`
            this.numero_actual[0] = numero;
        } else {
            if (this.segundo_numero[0] == 0) {
                _display.innerHTML = `${numero}`
                this.numero_actual[0] = numero;
            } else {
                _display.innerHTML += `${numero}`
                this.numero_actual[0] = parseFloat(`${this.numero_actual[0]}${numero}`);
            }
        }
        this.recien_mostrado = false
    }
    operacion = null;
    recien_mostrado = false;
    primer_numero = [0];
    segundo_numero = [null];
    numero_actual = this.primer_numero;
    escribiendo_decimal = false;

    igual() {
        if (this.operacion) {
            this.primer_numero[0] = this.operacion();
        }
        this.numero_actual = this.primer_numero;
        if (!`${this.numero_actual[0]}`.includes(".") && `${this.numero_actual[0]}`.length > 8) {
            _display.innerHTML = "OVERFLOW";
            this.primer_numero[0] = 0;
        } else {
            _display.innerHTML = `${this.numero_actual[0]}`.slice(0,8);
        }
        this.segundo_numero[0] = null;
        this.operacion = null;
        this.recien_mostrado = true;
        this.escribiendo_decimal = false;
    }

    suma = () => this.primer_numero[0] + this.segundo_numero[0];
    resta = () => this.primer_numero[0] - this.segundo_numero[0];
    multiplicar = () => this.primer_numero[0] * this.segundo_numero[0];
    dividir = () => this.primer_numero[0] / this.segundo_numero[0];
    raiz = () => Math.pow(this.primer_numero[0], 1/this.segundo_numero[0]);

    modificar_operacion(op) {
        if (this.operacion && this.segundo_numero[0] != null) {
            this.igual();
        }
        switch (op) {
            case "suma":
                this.operacion = this.suma;
                break;
            case "multiplicar":
                this.operacion = this.multiplicar;
                break;
            case "dividir":
                this.operacion = this.dividir;
                break;
            case "raiz":
                this.operacion = this.raiz;
                break;
            case "resta":
                this.operacion = this.resta;
                break;
            default:
                break;
        }
        this.numero_actual = this.segundo_numero;
        this.escribiendo_decimal = false;
    }

    reiniciar() {
        this.operacion = null;
        this.primer_numero = [0];
        this.segundo_numero = [null];
        this.numero_actual = this.primer_numero;
        _display.innerHTML = 0;
        this.recien_mostrado = false;
        this.escribiendo_decimal = false;
    }

    agregarComa() {
        if (!this.escribiendo_decimal && !_display.innerHTML.includes(".")) {
            _display.innerHTML += ".";
            this.recien_mostrado = false;
        } else if (this.recien_mostrado) {
            _display.innerHTML = "0.";
            this.recien_mostrado = false;
            this.primer_numero[0] = 0;
        }
        this.escribiendo_decimal = true;
    }

    cambiarSigno() {
        this.numero_actual[0] *= -1;
        _display.innerHTML = `${this.numero_actual[0]}`.slice(0,8);
    }

    borrar() {
        if (_display.innerHTML.length <= 1) {
            _display.innerHTML = "0"
        } else {
            if (_display.innerHTML[_display.innerHTML.length-2] === ".") {
                this.numero_actual[0] = parseFloat(_display.innerHTML.slice(0, _display.innerHTML.length - 2));
                this.escribiendo_decimal = true;
            } else {
                this.numero_actual[0] = parseFloat(_display.innerHTML.slice(0, _display.innerHTML.length - 1))
                this.escribiendo_decimal = false;
            }
            _display.innerHTML = _display.innerHTML.slice(0, _display.innerHTML.length - 1);
        }
        this.recien_mostrado = false;
    }
}

var calculadora = new Calculadora;

const listaTeclas = document.querySelectorAll(".tecla");
listaTeclas[0].addEventListener('click',() => calculadora.reiniciar());
listaTeclas[1].addEventListener('click',() => calculadora.cambiarSigno());

listaTeclas[18].addEventListener('click',() => calculadora.modificar_operacion("suma"));
listaTeclas[11].addEventListener('click',() => calculadora.modificar_operacion("resta"));
listaTeclas[7].addEventListener('click',() => calculadora.modificar_operacion("multiplicar"));
listaTeclas[3].addEventListener('click',() => calculadora.modificar_operacion("dividir"));
listaTeclas[2].addEventListener('click',() => calculadora.modificar_operacion("raiz"));

listaTeclas[4].addEventListener('click',() => calculadora.modificar_pantalla(7));
listaTeclas[5].addEventListener('click',() => calculadora.modificar_pantalla(8));
listaTeclas[6].addEventListener('click',() => calculadora.modificar_pantalla(9));
listaTeclas[8].addEventListener('click',() => calculadora.modificar_pantalla(4));
listaTeclas[9].addEventListener('click',() => calculadora.modificar_pantalla(5));
listaTeclas[10].addEventListener('click',() => calculadora.modificar_pantalla(6));
listaTeclas[12].addEventListener('click',() => calculadora.modificar_pantalla(1));
listaTeclas[13].addEventListener('click',() => calculadora.modificar_pantalla(2));
listaTeclas[14].addEventListener('click',() => calculadora.modificar_pantalla(3));
listaTeclas[15].addEventListener('click',() => calculadora.modificar_pantalla(0));

listaTeclas[17].addEventListener('click',() => calculadora.igual());
listaTeclas[16].addEventListener('click',() => calculadora.agregarComa());

const teclas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", ".", "Escape", "Enter", "Backspace"];

const eventos = [
    () => calculadora.modificar_pantalla(1),
    () => calculadora.modificar_pantalla(2),
    () => calculadora.modificar_pantalla(3),
    () => calculadora.modificar_pantalla(4),
    () => calculadora.modificar_pantalla(5),
    () => calculadora.modificar_pantalla(6),
    () => calculadora.modificar_pantalla(7),
    () => calculadora.modificar_pantalla(8),
    () => calculadora.modificar_pantalla(9),
    () => calculadora.modificar_pantalla(0),
    () => calculadora.modificar_operacion("suma"),
    () => calculadora.modificar_operacion("resta"),
    () => calculadora.modificar_operacion("multiplicar"),
    () => calculadora.modificar_operacion("dividir"),
    () => calculadora.agregarComa(),
    () => calculadora.reiniciar(),
    () => calculadora.igual(),
    () => calculadora.borrar()
];

// const eventos = [
//     listaTeclas[12].click,
//     listaTeclas[13].click,
//     listaTeclas[14].click,
//     listaTeclas[8].click,
//     listaTeclas[9].click,
//     listaTeclas[10].click,
//     listaTeclas[4].click,
//     listaTeclas[5].click,
//     listaTeclas[6].click,
//     listaTeclas[18].click,
//     listaTeclas[11].click,
//     listaTeclas[7].click,
//     listaTeclas[3].click,
//     listaTeclas[16].click,
//     listaTeclas[0].click,
//     listaTeclas[17].click,
//     () => calculadora.borrar()
// ]

document.addEventListener('keydown', e => {
    let index = teclas.indexOf(`${e.key}`);
    if (index >= 0) {
        eventos[index]();
    }
})