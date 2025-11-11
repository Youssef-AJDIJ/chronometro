// Cronometro
const displayCrono = document.getElementById("cronometro");
const btnCrono = document.getElementById("onoff_crono");
const btnReset = document.getElementById("reset_crono");
const reloj = document.getElementById("reloj");

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


if (cronometro1.activado) {
    btnCrono.textContent = "stop";

} else {
    btnCrono.textContent = "start";
}


btnCrono.addEventListener('click', () => {

    if (cronometro1.activado) {
        btnCrono.textContent = "start";
        cronometro1.desactivar();
    } else {
        btnCrono.textContent = "stop";
        cronometro1.activar();
    }
});
