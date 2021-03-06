console.log("Client side JS is run!");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const dataParagraph = document.querySelector("#result");
dataParagraph.textContent = "";

weatherForm.addEventListener("submit", evt => {
  evt.preventDefault();
  const { value = "" } = searchInput;
  fetch(`/weather?address=${value}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      const { error, placeName, summary, temperature, precipProbability } = res;
      if (error) {
        dataParagraph.textContent = error;
      } else {
        dataParagraph.textContent = `${placeName}. ${summary} It is ${temperature} degrees. Probability of rain is ${precipProbability}%`;
      }
    });
});
