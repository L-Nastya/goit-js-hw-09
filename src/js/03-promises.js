import Notiflix from 'notiflix';

const form = document.querySelector(".form");


form.addEventListener("submit", submitInput);

function submitInput(e) {
     e.preventDefault();
  let amount = Number(e.currentTarget.amount.value);
  let step = Number(e.currentTarget.step.value);
  let delay = Number(e.currentTarget.delay.value);
  
for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
 

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
      }, delay)
    })
}


  