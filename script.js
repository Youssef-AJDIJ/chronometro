// DOM manipulation for chronometer UI
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const chronometerDisplay = document.getElementById("chronometer");
// const inputMinutes = document.getElementById("inputMinutes");

class Reloj {
    constructor(hours, minutes, seconds) {
    
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = this.minutes !== 0 ? 60 : seconds;

    }


    chronometer() {
        setInterval(() => {
            this.seconds++;
            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }
            if (this.minutes === 60) {
                this.minutes = 0;
                this.hours++;
                
            }
            chronometerDisplay.textContent = `${this.hours}:${this.minutes}:${this.seconds}`;
        }, 1000);

        
    }
    cuentaRegresiva() {
       setInterval(() => {
            if (this.seconds === 0 && this.minutes === 0 && this.hours === 0) {
                this.seconds = 0;
                this.minutes = 0;
                this.hours = 0;
                console.log("¡Tiempo terminado!");
                return;
            }
            if (this.seconds === 0 && this.minutes !== 0) {
                this.seconds = 60;
                this.minutes--;
                if (this.minutes === 0 && this.hours !== 0) {
                    this.seconds = 60;
                    this.hours--;
                }
            }
            
           this.seconds--; 

            console.log(this.hours , ":", this.minutes, ":", this.seconds);
            chronometerDisplay.textContent = `${this.hours}:${this.minutes}:${this.seconds}`;

       }, 1000);
    }
    reset() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        chronometerDisplay.textContent = `00:00:00`;
    }
}

const reloj = new Reloj(0, 0, 0);
// reloj.chronometer();
const reloj2 = new Reloj(0, 0, 5);
reloj2.cuentaRegresiva();
resetBtn.addEventListener("click", () => {
    // Toggle start/stop functionality here
    reloj2.reset();
});

