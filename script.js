let weather = {
  APIKey: "9a90bf5a763788cadcaf74b35809d1ca"
};

let cityName;
let searchButton = document.getElementById("search-button");
let city = document.getElementById("current-city");
let date = document.getElementById("current-date");
let temperature = document.getElementById("current-temperature");
let humidity = document.getElementById("current-humidity");
let windSpeed = document.getElementById("current-wind-speed");
let icon = document.getElementById("current-icon");
let forecastContainer = document.getElementById("forecast-container");
let searchHistory =[];
function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

var currentDate = dayjs().format("dddd, MMMM D, YYYY");

searchButton.addEventListener("click", function () {
  let input = document.getElementById("city-input");
  cityName = input.value;
  console.log(cityName);
  //fetch current weather
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + weather.APIKey)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      date.textContent = currentDate;
      city.textContent = cityName.charAt(0).toUpperCase() + cityName.slice(1);
      temperature.textContent = kelvinToFahrenheit(data.main.temp);
      humidity.textContent = data.main.humidity;
      windSpeed.textContent = data.wind.speed;
      icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

      // Fetch 5-day weather forecast
      fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + weather.APIKey)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          forecastContainer.innerHTML = ''; 

          for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const forecastDate = dayjs(forecast.dt_txt).format("dddd, MMMM D, YYYY");
            const forecastTemp = kelvinToFahrenheit(forecast.main.temp) + "°F";
            const forecastIcon = "http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";

            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-container");

            forecastCard.innerHTML = `
              <p class="forecast-date">${forecastDate}</p>
              <img class="forecast-icon" src="${forecastIcon}" alt="Weather Icon">
              <p class="forecast-temperature">${forecastTemp}</p>
            `;

            forecastContainer.appendChild(forecastCard); 
          }
        })
        .catch(error => console.error('Error fetching forecast:', error));
    })
    .catch(error => console.error('Error fetching current weather:', error));
});
 