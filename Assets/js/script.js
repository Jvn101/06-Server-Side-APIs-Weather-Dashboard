//Global variables
var APIKey = "72491726dc9772e5242c3f9cf4114a9e";
var lat = "";
var lon = "";
var savedCities = [];
var days = document.querySelector(".days");
var cityName = document.querySelector("#search-input");
var saveSearch = document.querySelector("#previous-searches");
var displayToday = document.querySelector(".todayweather");
var deleteElement = document.querySelector("#delete");

async function getCoords(event) {
  event.preventDefault();
  var cityName = document.querySelector("#search-input").value;

  var cityURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=" +
    APIKey;
  const response = await fetch(cityURL);
  console.log("RESPONSE>>>", response);
  if (!response.ok) {
    alert("that is not a valid city");
    return;
  }
  const data = await response.json();
  console.log("DATA>>>", data);
  if (!data.length) {
    alert("input not valid");
    return;
  }
  const city = { name: data[0].name, lat: data[0].lat, lon: data[0].lon };
  console.log(city);

  getWeather(city.lat, city.lon);
  saveToLocalStorage(city);
}

function getWeather(lat, lon) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric" +
    "&appid=" +
    APIKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      displayWeather(weather);
    })
    .catch((error) => {
      console.error("error:", error);
    });
}

//Display weather in broswer
function displayWeather(weather) {
  days.innerHTML = "";
  displayToday.innerHTML = "";

  var link1 =
    "https://openweathermap.org/img/wn/" +
    weather.list[0].weather[0].icon +
    ".png";
  var date1 = document.createElement("h3");
  var day1 = document.createElement("h3");
  var icon1 = document.createElement("img");
  var temp1 = document.createElement("p");
  var humidity1 = document.createElement("p");
  var wind1 = document.createElement("p");

  console.log(weather.list[0].dt_txt);
  date1.textContent = moment(weather.list[0].dt_txt).format("DD/MM/YYYY");
  day1.textContent = moment(weather.list[0].dt_txt).format("dddd");
  icon1.setAttribute("src", link1);
  temp1.textContent = "Temp: " + weather.list[0].main.temp + "°C     ";
  humidity1.textContent = "Humidity: " + weather.list[0].main.humidity + "%";
  wind1.textContent = "Wind: " + weather.list[0].wind.speed + "m/s    ";

  var weatherCard1 = document.createElement("div");
  weatherCard1.appendChild(date1);
  weatherCard1.appendChild(day1);
  weatherCard1.appendChild(icon1);
  weatherCard1.appendChild(temp1);
  weatherCard1.appendChild(humidity1);
  weatherCard1.appendChild(wind1);

  displayToday.appendChild(weatherCard1);

  // forloop to display 5 day weather forecast
  for (var i = 7; i < weather.list.length; i = i + 8) {
    var date = document.createElement("h3");
    var day = document.createElement("h3");
    var weatherIconImage = document.createElement("img");
    var temp = document.createElement("p");
    var humidity = document.createElement("p");
    var wind = document.createElement("p");
    var link =
      "https://openweathermap.org/img/wn/" +
      weather.list[i].weather[0].icon +
      ".png";
    console.log(link);

    date.textContent = moment(weather.list[i].dt_txt).format("DD/MM/YYYY");
    day.textContent = moment(weather.list[i].dt_txt).format("dddd");
    weatherIconImage.setAttribute("src", link);
    temp.textContent = "Temp: " + weather.list[i].main.temp + "°C     ";
    humidity.textContent = "Humidity: " + weather.list[i].main.humidity + "%";
    wind.textContent = "Wind: " + weather.list[i].wind.speed + "m/s    ";

    var weatherCard = document.createElement("div");
    weatherCard.appendChild(date);
    weatherCard.appendChild(day);
    weatherCard.appendChild(weatherIconImage);
    weatherCard.appendChild(temp);
    weatherCard.appendChild(humidity);
    weatherCard.appendChild(wind);

    displayToday.appendChild(weatherCard);
  }
}

//saving city array to local storage
function saveToLocalStorage(city) {
  var cityarray = JSON.parse(localStorage.getItem("cities")) || [];

  if (!cityarray) {
    cityarray = [];
  }

  for (i = 0; i < cityarray.length; i++) {
    if (city.name == cityarray[i].name) {
      return;
    }
  }
  cityarray.push(city);
  localStorage.setItem("cities", JSON.stringify(cityarray));
  createButton(city);
}

function deleteButton() {
  console.log("just from loading");
  localStorage.setItem("cities", JSON.stringify([]));
  saveSearch.innerHTML = "";
  days.innerHTML = "";
  displayToday.innerHTML = "";
  deleteElement.classList.add("hidden");
}

function createButton(cityarray) {
  console.log(cityarray);
  var button = document.createElement("button");
  console.log(button);
  button.textContent = cityarray.name;
  button.dataset.lat = cityarray.lat;
  button.dataset.lon = cityarray.lon;
  saveSearch.appendChild(button);
  deleteElement.classList.remove("hidden");
}

function getHistory(event) {
  //event target for city button
  getWeather(event.target.dataset.lat, event.target.dataset.lon);
  console.log("click");
}

//Show saved cities on page refresh
window.onload = function buttonOnLoad(city) {
  var savedSearch = JSON.parse(localStorage.getItem("cities"));

  if (!savedSearch || !savedSearch.length) {
    return;
  }

  deleteElement.classList.remove("hidden");
  for (let i = 0; i < savedSearch.length; i++) {
    var button = document.createElement("button");
    button.textContent = savedSearch[i].name;
    button.dataset.lat = savedSearch[i].lat;
    button.dataset.lon = savedSearch[i].lon;
    saveSearch.appendChild(button);
  }
};

//event listeners
document.querySelector(".btn-info").addEventListener("click", getCoords);
saveSearch.addEventListener("click", getHistory);
deleteElement.addEventListener("click", deleteButton);
