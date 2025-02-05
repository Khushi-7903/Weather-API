const form = document.querySelector("form");
const input = document.querySelector("input");
const mainCard = document.querySelector(".main-card");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const cityName = input.value.trim();
    const api = `https://api.weatherapi.com/v1/current.json?key=ededa1d6d2cb4d1f86b151320242512&q=${cityName}&aqi=yes`;
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            const getApi = document.querySelector(".getApi");
            const temperature = data.current.temp_c;
            // Update the weather card
            let result = `
             <div class="card card-items shadow overflow-hidden d-flex flex-column justify-content-center align-items-center w-lg-100">
                <h2 class="text-center">${data.location.name}</h2>
                <img src="${data.current.condition.icon}" alt="Weather Icon" class="img-fluid" style="max-width: 150px;">
                <div class="degDate d-flex justify-content-between w-100 mt-3 align-items-center">
                    <h3 class="ms-3">${temperature}<sup>°C</sup></h3>
                    <p class="me-3 mt-3">${data.location.localtime}</p>
                </div>
            </div>
            `;
            getApi.innerHTML = result;
            input.value = "";

            if (temperature < 15) {
                mainCard.style.backgroundImage = "url('img/2.jpg')";
            } else {
                mainCard.style.backgroundImage = "url('img/5.jpg')";
            }
        })
        .catch((error) => {
            console.error("Error fetching the weather data:", error);
        });
});
