import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/confetti.css");
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
let daysString = document.querySelector("span[data-days]");
let hoursString = document.querySelector("span[data-hours]");
let minutesString = document.querySelector("span[data-minutes]");
let secondsString = document.querySelector("span[data-seconds]");

const currentDate = new Date();

startBtn.disabled = true;
 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < currentDate ) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
        }
    },
};
flatpickr(input, options);


let timerId;
startBtn.addEventListener("click", convertMs);
function convertMs(ms) {
    timerId = setInterval(() => {
        const ms = new Date(input.value) - new Date();
        if (ms <= 0) {
            clearInterval(timerId);
            Notiflix.Notify.info('Time is over');
        } else {
            startBtn.disabled = true;
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

       
            const days = Math.floor(ms / day);
            const hours = Math.floor((ms % day) / hour);
            const minutes = Math.floor(((ms % day) % hour) / minute);
            const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
            const daysForm = `${days}`.length === 2 ? days : `${days}`.padStart(2, '0');
            const secondsForm = `${seconds}`.length === 2 ? seconds : `${seconds}`.padStart(2, '0');
            const minutesForm = `${minutes}`.length === 2 ? minutes : `${minutes}`.padStart(2, '0');
            const hoursForm = `${hours}`.length === 2 ? hours : `${hours}`.padStart(2, '0');

            const renderTimer = () => {
                daysString.textContent = daysForm;
                hoursString.textContent = hoursForm;
                minutesString.textContent = minutesForm;
                secondsString.textContent = secondsForm;
            }
            renderTimer();
        }
    }, 1000)
    }



