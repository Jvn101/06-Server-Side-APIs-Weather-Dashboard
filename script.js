var results = document.querySelector("#result-content");

//Global variables
var APIKey = "72491726dc9772e5242c3f9cf4114a9e";
var lat = "";
var lon = "";
var days = document.querySelector(".days");
var cityName = document.querySelector("#search-input");
var saveSearch = document.querySelector("#previous-searches");

cityName.addEventListener("input", function(event) {
  const inputValue = event.target.value

  if (/\d/.test(inputValue)) {
    alert('please user letters only')
    event.target.value = inputValue.replace(/\d/g, '')
  }
})

function getCoords(event) {
  event.preventDefault();
  var cityName = document.querySelector("#search-input").value;


  var cityURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=" +
    APIKey;
  

  fetch(cityURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        const city = {name: data[0].name, lat: data[0].lat, lon: data[0].lon}
        console.log(city)
        //if (city == null){
          //window.alert("City is invalid");
          
      //}
      getWeather(city.lat, city.lon);
      saveToLocalStorage(city);
      
    })
    .catch((error) => {
      console.error("error:", error);
    });
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

function displayWeather(weather) {
  //var weather = JSON.parse(localStorage.getItem("weatherData"))
  //console.log(weather);
  //forecastTable.innerHTML = "";

  days.innerHTML = "";
  for (var i = 0; i < weather.list.length; i = i + 8) {
    //(`date-${[i]}`);
    //let array = []
    
    var date = document.createElement("h3");
    var weatherIconImage = document.createElement("img");
    var temp = document.createElement("p");
    var humidity = document.createElement("p");
    var wind = document.createElement("p");
    var link =
      "https://openweathermap.org/img/wn/" +
      weather.list[i].weather[0].icon +
      ".png";
     
    
     date.textContent = moment(weather.list[i].dt_txt).format(
        "DD/MM/YYYY"
      );
      weatherIconImage.setAttribute("src", link);
      temp.textContent =
        "Temp: " + weather.list[i].main.temp + "°C     ";
      humidity.textContent =
        "Humidity: " + weather.list[i].main.humidity + "%";
      wind.textContent =
        "Wind: " + weather.list[i].wind.speed + "m/s    ";
        
      var weatherCard = document.createElement("div")  
        weatherCard.appendChild(date)
        weatherCard.appendChild(weatherIconImage)
        weatherCard.appendChild(temp)
        weatherCard.appendChild(humidity)
        weatherCard.appendChild(wind)

        days.appendChild(weatherCard)





      
    //forecastTable.appendChild(forecastObject);
    //var forecastTable = JSON.parse(localStorage.getItem("Hours")) || {}
    //var saveSearch = document.querySelector("#previous-searches");

  
  }
}

//var saveSearch = document.querySelector("#previous-searches");
function saveToLocalStorage(city) {
  //var forecastTable = localStorage.setItem("weather", JSON.stringify(forecastTable));
  //console.log(localStorage.setItem("weather", JSON.stringify(forecastTable)));
  // var cityarray = JSON.parse(localStorage.getItem("cities"))

 //make sure city deosn't exist before pushing
 // if city array exists, return else 


  // savedCities.push(city)
  // localStorage.setItem("cities", JSON.stringify(savedCities))

  createButton(city)
  
}

// on refresh populate local storage
function createButton(city) {
  var savedCities = JSON.parse(localStorage.getItem('cities')) || [];

  savedCities.push(city)


  localStorage.setItem('cities', JSON.stringify(savedCities))

  savedCities.forEach(city => {
    var button = document.createElement("button");
    button.textContent= city.name
    button.dataset.lat = city.lat
    button.dataset.lon = city.lon
  
    saveSearch.appendChild(button)
  })
  // have a function that renders whats in teh lcoal storage
  // have a function that updates the local storage
  //uder input, add and display
  //document.body.appendChild(button);
  //savedCities = JSON.parse(localStorage.getItem(cityName));
  //button.textContent = savedCities

  //button.textContent = JSON.parse(localStorage.getItem("cityNames"))
  //console.log(savedCities)
  //console.log(button)
}

function getHistory (event) {
   
    getWeather(event.target.dataset.lat, event.target.dataset.lon)
    console.log("click")
}

document.querySelector(".btn-info").addEventListener("click", getCoords);
saveSearch.addEventListener("click", getHistory)

//if (issues.length === 0) {
// results.textContent = weather.main
//for (var i = 0; i < weather.list.length; i = i + 8) {
// var icon = weather.list[i].weather[0].icon;
//console.log(weather.list[i].weather[0].icon);
//}

//need to turn weather[0] into for loop
//var iconURL = "https://openweathermap.org/img/wn/" + icon + ".png";
//console.log(iconURL);
//console.log(icon);

//var array = [{}]

//temperature
//icon.appendChild(img);

//iconURL = "https://openweathermap.org/img/wn/" + weather.list[i].weather[0].icon + ".png",

// array.push([ moment(weather.list[i].dt_txt).format("DD/MM/YYYY"),
//             weatherIconImage.src = "https://openweathermap.org/img/wn/" + weather.list[i].weather[0].icon + ".png",
//             "Temp: " + weather.list[i].main.temp + "°C     ",  //document.write("\n")//,
//              "Humidity: " + weather.list[i].main.humidity + "%     ", //+ document.write("\n"),
//              "Wind: " + weather.list[i].wind.speed + "m/s    ",]) //+ document.write("\n")])
// }
//             console.log(array) //why is 0 a blank object??????
//             console.log(array[1])
//             console.log(array[2])
//             console.log(array[3])
//             console.log(array[4])
//             console.log(array[5])

//             var WeatherObject = {
//             document.querySelector(".day1").textContent += array[1];
//             document.querySelector(".day2").textContent += array[2];
//             document.querySelector(".day3").textContent += array[3];
//             document.querySelector(".day4").textContent += array[4];
//             document.querySelector(".day5").textContent += array[5];
//             };

//console.log(weatherObject);
// set up individual sections and add them to thei respective section
//document.getElementById(eval("section" + i))

// //humidity
// for (var i=0; i<weather.list.length; i = i + 8) {
// results.textContent += weather.list[i].main.humidity + ' %'
// console.log(weather.list[i].main.humidity + ' %')
// }
// //wind-speed
// for (var i=0; i<weather.list.length; i= i + 8) {
//     results.textContent += weather.list[i].wind.speed + ' m/s'
// console.log(weather.list[i].wind.speed + ' m/s')
// //convert wind to km/hour
// }

//weather icon -- doesn't work but was working previously on for the first array

//.main.temp
//.main
//.main/humidity + '%'
//.main.pressure (convert to km/h)
//[0].main);
//return;
//}

// function printResults(resultObj) {
//   console.log(resultObj);

//   if (resultObj.lon) {
//     bodyContentEl.innerHTML +=
//       "<strong>Subjects:</strong> " + resultObj.subject.join(", ") + "<br/>";
//   }
// }

//.siblings('.textVal').val().trim();

//localStorage.setItem("city", JSON.stringify(cityName));

//function getWeatherToday() {
//requestUrl;

//fetch(requestUrl).then(function (response) {
// if (response.ok) {
// response.json().then(function (data) {
//  displayWeather(data);
//});
// }
// });
//}

// console.log(getWeatherToday);

// var displayWeather = function (Weather) {
//   if (issues.length === 0) {
//     issueContainerEl.textContent = "This repo has no open issues!";
//     return;
//   }

//   for (var i = 0; i < issues.length; i++) {
//     var issueEl = document.createElement("a");
//     issueEl.classList = "list-item flex-row justify-space-between align-center";
//     issueEl.setAttribute("href", issues[i].html_url);
//     issueEl.setAttribute("target", "_blank");

//     var titleEl = document.createElement("span");
//     titleEl.textContent = issues[i].title;
//     issueEl.appendChild(titleEl);

//     var typeEl = document.createElement("span");

//     if (issues[i].pull_request) {
//       typeEl.textContent = "(Pull request)";
//     } else {
//       typeEl.textContent = "(Issue)";
//     }

//     issueEl.appendChild(typeEl);

//     issueContainerEl.appendChild(issueEl);
//   }
// };

//fetch(locQueryUrl)
//.then(function (response) {
//if (!response.ok) {
// throw response.json();
//}

//return response.json();
//})
//.then(function (locRes) {
// write query to page so user knows what they are viewing
// resultTextEl.textContent = locRes.search.query;

//console.log(locRes);
//});

//Run getCoords function when search button is clicked

//const para = document.createElement("p").textContent.weather.list[i].main.temp + ' °C';
//results.appendChild(para);

//getelementid("wind"+count)
// results.textContent += weather.list[i].main.temp + ' °C'

// results.textContent += weather.list[i].main.humidity + '%'

// results.textContent += weather.list[i].wind.speed + ' m/s'
// console.log(weather.list[i].main.temp + ' °C')

//   $.ajax({
//     url: city,
//     method: "GET",
//   }).then((response) => {
//     //calls getWeather function and returns lat and lon from city name entered
//     console.log(response);
//     getWeather(response[0].lat, response[0].lon);
//     displayWeather(weather);
// });
// }
