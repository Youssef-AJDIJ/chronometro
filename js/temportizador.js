// Clase Despertador
 class Temporizador {
    constructor(hora, minuto, segundos) {
        this.hora = hora;
        this.minuto = minuto;
        this.segundos = segundos;
        this.activado = false;
    }
    // Método para el despertador, lo que puede hacer
    activar() {
        this.activado = true;

        // Necesito dejar a cero los minutos
        // 30 minutos que ha puesto el usuario
        // this.minuto = 30;
        // hacer un decremento de minutos
        // this.minuto--
        // cada minuto son 60 segundos
        // si hablamos de milisengunos 1 minuto son 60000 milisegundos
        console.log(`Minutos restantes ${this.minuto - 1}`);
        this.segundos = 10;
        // crono de minutos
        // setInterval(() => {
        //     if (this.minuto != 0) {
        //         this.minuto--;
        //         this.segundos = 60;
        //     }
        //     console.log(`Minutos restantes ${this.minuto}`);
        // }, 60000);
        // // crono de segundos
        // setInterval(() => {
        //     if (this.segundos != 0 && this.minuto != 0) {
        //         this.segundos--;
        //     }
        //     console.log(`Segundos restantes ${this.segundos}`);
        // }, 1000);

        setInterval(() => {
            if (this.segundos !== 0) {
                this.segundos--;
                console.log(`Segundos ${this.segundos}, Minutos ${this.minuto}, Horas ${this.hora}`);
            } else if 
            (this.segundos == 0 && this.minuto != 0 || this.segundos == 0 && this.minuto != 0 && this.hora != 0) 
            {
                // reactivar los segundos
                this.segundos = 60;
                // restar un minuto
                this.minuto--;
                console.log(`Segundos ${this.segundos}, Minutos ${this.minuto}, Horas ${this.hora}`);
            } else if (this.minuto == 0) {
                this.hora--;
                console.log(`Segundos ${this.segundos}, Minutos ${this.minuto}, Horas ${this.hora}`);
            }
        }, 1000); // 1 segundo
    }

    desactivar() {
        this.activado = false;
        console.log("Cronometro desactivado");
    }
    mostrarHora() {
        console.log(
            `La hora del cronometro es ${this.hora}:${this.minuto}:${this.segundos}`
        );
    }
}

// Crear una instancia de Despertador
const cronometro30 = new Temporizador(1, 1, 0);
cronometro30.activar();
