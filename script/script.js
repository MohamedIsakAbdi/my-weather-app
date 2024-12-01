document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetch-button");
  const locationInput = document.getElementById("location-input");
  const weatherInfo = document.getElementById("weather-info");
  const loadingMessage = weatherInfo.querySelector(".loading-message");

  function updateWeatherUI(location, temperature, condition, windSpeed) {
      const body = document.querySelector("body");
      body.className = ""; // Clear existing classes
      if (condition.includes("rain")) {
          body.classList.add("images/rainy-background");
      } else if (condition.includes("sun") || condition.includes("clear")) {
          body.classList.add("images/sunny-background");
      } else if (condition.includes("cloud")) {
          body.classList.add("images/cloudy-background");
      }

      while (weatherInfo.firstChild) {
          weatherInfo.removeChild(weatherInfo.firstChild);
      }

      const locationElement = document.createElement("p");
      locationElement.textContent = `Location: ${location}`;

      const temperatureElement = document.createElement("p");
      temperatureElement.textContent = `Temperature: ${temperature}°C`;

      const conditionElement = document.createElement("p");
      conditionElement.textContent = `Condition: ${condition}`;

      const windSpeedElement = document.createElement("p");
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;

      weatherInfo.appendChild(locationElement);
      weatherInfo.appendChild(temperatureElement);
      weatherInfo.appendChild(conditionElement);
      weatherInfo.appendChild(windSpeedElement);
  }

  function fetchWeatherData(location) {
      // Use backend URL instead of OpenWeatherMap API directly
      fetch(`https://mohamed2026.pythonanywhere.com/weather?location=${encodeURIComponent(location)}`)

          .then((response) => response.json())
          .then((data) => {
              if (data.error) {
                  console.error("Backend error:", data.error);
                  weatherInfo.textContent = `Error: ${data.error}`;
              } else {
                  const temperature = data.main.temp;
                  const condition = data.weather[0].description;
                  const windSpeed = data.wind.speed;

                  updateWeatherUI(location, temperature, condition, windSpeed);
              }

              weatherInfo.style.display = "block";
              loadingMessage.style.display = "none";
          })
          .catch((error) => {
              console.error("Error fetching weather data:", error);
              weatherInfo.textContent = "Error fetching weather data";
              weatherInfo.style.display = "block";
              loadingMessage.style.display = "none";
          });
  }

  fetchButton.addEventListener("click", function () {
      const location = locationInput.value.trim();
      if (location === "") {
          return;
      }

      loadingMessage.style.display = "block";
      weatherInfo.style.display = "none";

      fetchWeatherData(location);
  });
});
