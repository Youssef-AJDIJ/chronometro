// Cronometro
const displayCrono = document.getElementById("cronometro");
const btnCrono = document.getElementById("onoff_crono");
const btnReset = document.getElementById("reset_crono");
const reloj = document.getElementById("reloj");

let temporizadorActual = null;


window.addEventListener('load', () => {
    cronometro1.reset();
    displayTemp.textContent = `00 : 00 : 00`;
    btnReset.textContent = "stop";
    btnResetTemp.textContent = "stop";
    if (cronometro1.activado) {
        btnCrono.textContent = "pause";
        btnTemp.textContent = "pause";

    } else {
        btnCrono.textContent = "start";
        btnTemp.textContent = "start";
    }

    if (temporizadorActual.activado) {
        btnTemp.textContent = "pause";
    } else {
        btnTemp.textContent = "start";
    }
});

class Cronometro {
    constructor(hora, minuto, segundos) {
        this.hora = hora;
        this.minuto = minuto;
        this.segundos = segundos;
        this.activado = false;
        this.intervalId = null;
    }
    // Método para el despertador, lo que puede hacer
    activar() {
        this.activado = true;

        this.intervalId = setInterval(() => {
            if (this.segundos !== 59) {
                this.segundos++;
                this.mostrarHora();
            } else if (
                (this.segundos == 59 && this.minuto == 0) || // 00:00:59
                (this.segundos == 59 && this.minuto != 0 && this.minuto < 59) || // 00:01:00
                (this.segundos == 59 && this.minuto == 0 && this.hora != 0) || // 00:00:01
                (this.segundos == 59 && this.minuto != 0 && this.hora != 0)
            ) {
                // 00:01:01
                // reiniciar los segundos
                this.segundos = 0;
                // aumentar un minuto
                this.minuto++;
                this.mostrarHora();
            } else if (this.minuto == 59 && this.segundos == 59) {
                // reiniciar los minutos
                this.minuto = 0;

                this.hora++;
                this.mostrarHora();
            }
        }, 1000); // 1 segundo
    }

    desactivar() {
        if (!this.activado) return;
        this.activado = false;

        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    reset() {

        this.desactivar();
        this.hora = 0;
        this.minuto = 0;
        this.segundos = 0;

        displayCrono.textContent = `00 : 00 : 00`;
    }
    mostrarHora() {
        let segundos = this.segundos < 10 ? '0' + this.segundos : this.segundos;
        let minutos = this.minuto < 10 ? '0' + this.minuto : this.minuto;
        let horas = this.hora < 10 ? '0' + this.hora : this.hora;

        displayCrono.textContent = `${horas} : ${minutos} : ${segundos}`
    }

    mostrarHoraLocal() {
        setInterval(() => {
            actualizarReloj();
        }, 1000);

        function actualizarReloj() {

            const tiempoActual = new Date();
            let hora = tiempoActual.getHours();
            let minuto = tiempoActual.getMinutes();
            let segundos = tiempoActual.getSeconds();

            reloj.textContent = `${hora < 10 ? '0' + hora : hora} : ${minuto < 10 ? '0' + minuto : minuto} : ${segundos < 10 ? '0' + segundos : segundos}`;

        }
    }
}
// Objeto cronometro
const cronometro1 = new Cronometro(0, 0, 0);
cronometro1.activar();
cronometro1.mostrarHoraLocal();





// Evento para el botón de iniciar y detener el cronometro

btnReset.addEventListener('click', () => {
    cronometro1.reset();
    btnCrono.textContent = "start";

});


btnCrono.addEventListener('click', () => {

    if (cronometro1.activado) {
        btnCrono.textContent = "start";
        cronometro1.desactivar();
    } else {
        btnCrono.textContent = "pause";
        cronometro1.activar();
    }
});


class Temporizador {
    constructor(hora, minuto, segundos) {
        this.hora = hora;
        this.minuto = minuto;
        this.segundos = segundos;
        this.activado = false;
        this.intervalId = null;
    }
    // Método para el despertador, lo que puede hacer
    activar() {
        this.activado = true;
        this.intervalId = setInterval(() => {
            if (this.segundos !== 0 && this.activado) {
                this.segundos--;
            } else if (this.segundos == 0 && this.minuto != 0 && this.activado) {
                this.segundos = 59;
                this.minuto--;
            } else if (this.segundos == 0 && this.minuto == 0 && this.hora != 0 && this.activado) {
                this.segundos = 59;
                this.minuto = 59;
                this.hora--;
            }
            this.mostrarHora();
        }, 1000); // 1 segundo
    }
    desactivar() {
        if (!this.activado) return;
        this.activado = false;
        clearInterval(this.intervalId);
        this.intervalId = null;

    }
    reset() {
        this.desactivar();
        this.hora = 0;
        this.minuto = 0;
        this.segundos = 0;
        displayTemp.textContent = `00 : 00 : 00`;

    }
    mostrarHora() {
        let segundos = this.segundos < 10 ? '0' + this.segundos : this.segundos;
        let minutos = this.minuto < 10 ? '0' + this.minuto : this.minuto;
        let horas = this.hora < 10 ? '0' + this.hora : this.hora;

        displayTemp.textContent = `${horas} : ${minutos} : ${segundos}`

    }
}
// Objeto temporizador


// Referencias a los botones y el input
const displayTemp = document.getElementById("temporizador");
const btnTemp = document.getElementById("onoff_temp");
const btnResetTemp = document.getElementById("reset_temp");
const temporizadorInput = document.getElementById("temporizador_input");

// 1. Declarar la variable del temporizador en el alcance global/de módulo
//    para que ambos botones (Start/Pause y Reset) puedan acceder a ella.


// 🚀 Evento para el botón de INICIAR / PAUSAR
btnTemp.addEventListener('click', () => {
    // Si NO hay un temporizador o si está detenido (reseteado)
    if (!temporizadorActual) {
        // Obtenemos el valor del input y lo convertimos a número (parseInt)
        const inputValue = parseInt(temporizadorInput.value) || 0;

        // 2. Creamos una NUEVA instancia de Temporizador
        temporizadorActual = new Temporizador(0, inputValue, 0);
        
        // Lo iniciamos
        temporizadorActual.activar();
        btnTemp.textContent = "Pause"; // Cambiamos la etiqueta del botón
        
    } else if (temporizadorActual.activado) {
        // Si el temporizador ya existe y está ACTIVO (Corriendo): Pausar
        temporizadorActual.desactivar();
        btnTemp.textContent = "Start";
        
    } else {
        // Si el temporizador ya existe pero está PAUSADO: Reanudar
        temporizadorActual.activar();
        btnTemp.textContent = "Pause";
    }
});


// 🔄 Evento para el botón de RESET
btnResetTemp.addEventListener('click', () => {
    // Verificamos que exista un temporizador antes de intentar resetear
    if (temporizadorActual) {
        temporizadorActual.reset();
        
        // 3. Después de resetear, también borramos la referencia al objeto
        //    para que el próximo click en 'btnTemp' cree una nueva cuenta regresiva 
        //    basada en el input.
        temporizadorActual = null;
        
        btnTemp.textContent = "Start";
    }
});
























// btnTemp.addEventListener('click', () => {
//     const inputValue = document.getElementById("temporizador_input").value;

//     const temporizador1 = new Temporizador(0, inputValue, 0);
// temporizador1.activar();

//     if (temporizador1.activado) {
//         btnTemp.textContent = "start";
//         temporizador1.desactivar();
//     } else {
//         btnTemp.textContent = "pause";
//         temporizador1.activar();
//     }
// });

// btnResetTemp.addEventListener('click', () => {
//     temporizador1.reset();
//     btnTemp.textContent = "start";
// });
