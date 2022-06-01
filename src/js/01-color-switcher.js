
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector("body");
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');


let intervalId;
startBtn.addEventListener("click", () => {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor(body);
    }, 1000);
    startBtn.disabled = true;
})

stopBtn.addEventListener("click", () => {
   clearInterval(intervalId);
     startBtn.disabled = false;
})

