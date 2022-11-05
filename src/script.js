let datePlace = document.querySelector("#current-date");
let now = new Date();
let celsuis = document.querySelector("#cel");
let farenhait = document.querySelector("#far");
let searchBtn = document.querySelector("#search-btn");
let currentBtn = document.querySelector("#current-btn");
let cityName = document.querySelector("#city-name");

//
// show the full date
function showDate(currentTime) {
  let days = ["Mon", "Tues", "Wedn", "Thur", "Fri", "Sat", "Sun"];
  let weekDay = days[currentTime.getDate()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];
  let month = months[currentTime.getMonth()];
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  let day = currentTime.getDay() - 1;
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }

  datePlace.innerHTML = `${weekDay}, ${month} ${day} ${hour}:${minute}`;
}
// show the name of the city in H1
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
//
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  cityName.innerHTML = "Current location";
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemprature);
}
//
function showTemprature(response) {
  let weatherDescription = document.querySelector("#description");
  let temprature = document.querySelector("#show-degree");
  let temp = Math.round(response.data.main.temp);
  let weatherHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  temprature.innerHTML = `${temp}°C`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  weatherHumidity.innerHTML = `Humidity : ${humidity}%`;
  wind.innerHTML = `Wind: ${windSpeed}KM/H `;
}
//

//

searchBtn.addEventListener("click", showCity);
currentBtn.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentLocation)
);
showDate(now);
