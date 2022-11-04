let searchBtn = document.querySelector("#search-btn");
let currentBtn = document.querySelector("#current-btn");
let cityName = document.querySelector("#city-name");

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  cityName.innerHTML = city;
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemprature);
  console.log(url);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  cityName.innerHTML = "Current location";
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemprature);
}

function showTemprature(response) {
  let weatherDescription = document.querySelector("#description");
  let temprature = document.querySelector("#degree");
  let temp = Math.round(response.data.main.temp);
  let weatherHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  temprature.innerHTML = `${temp}°C`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  weatherHumidity.innerHTML = `Humidity : ${humidity}%`;
  wind.innerHTML = `Wind : ${windSpeed} KM/H `;
}
function showDate() {
  let weekday = document.querySelector("#week-day");
  let date = new Date();

  let days = [
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  weekday.innerHTML = `${days[date.getDate()]} ${hour} : ${minute} `;
}

searchBtn.addEventListener("click", showCity);
currentBtn.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentLocation)
);
showDate();
