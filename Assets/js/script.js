var results = document.querySelector("#result-content");

//Global variables
var APIKey = "72491726dc9772e5242c3f9cf4114a9e";
var lat = "";
var lon = "";

function getCoords(event) {
  event.preventDefault();
  var cityName = document.querySelector("#search-input").value;
  var city =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=" +
    APIKey;

  $.ajax({
    url: city,
    method: "GET",
  }).then((response) => { 
    //calls getWeather function and returns lat and lon from city name entered
    console.log(response);
    getWeather(response[0].lat, response[0].lon);
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
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then((weather) => {
    console.log(weather);

    displayWeather(weather);
    
    //displayWeather()
    //saveToLs()
    //createButton()
  });
}

function displayWeather (weather) {
    //if (issues.length === 0) {
       // results.textContent = weather.main
      
      

        //temperature
       for (var i=0; i<weather.list.length; i = i + 8) {
        //const para = document.createElement("p").textContent.weather.list[i].main.temp + ' °C';
        //results.appendChild(para);

        results.textContent = weather.list[i].main.temp + ' °C'
        console.log(weather.list[i].main.temp + ' °C')
       }
        //humidity
        for (var i=0; i<weather.list.length; i = i + 8) {
        results.textContent = weather.list[i].main.humidity + ' %'
        console.log(weather.list[i].main.humidity + ' %')
        }
        //wind-speed
        for (var i=0; i<weather.list.length; i= i + 8) {
            results.textContent = weather.list[i].wind.speed + ' m/s'
        console.log(weather.list[i].wind.speed + ' m/s')
        //convert wind to km/hour
        }


        //weather icon -- doesn't work but was working previously on for the first array
        for (var i=0; i<weather.list.length; i = i + 8) {
        var icon = weather.list[i].weather[0].icon;
        console.log(weather.list[i].weather[0].icon);
        }
      

        //need to turn weather[0] into for loop
        var iconURL = "https://openweathermap.org/img/wn/" + icon + ".png"
          console.log(iconURL);
          console.log(icon);
        //.main.temp
        //.main
        //.main/humidity + '%'
        //.main.pressure (convert to km/h)
        //[0].main);
        //return;
      //}
      $.ajax({
        url: iconURL,
        method: "GET",
      }).then((icon) => {
    saveToLocalStorage();
})
}

function saveToLocalStorage () {
    //localStorage.setItem("weather", JSON.stringify(displayWeather));

    createButton();
}


function createButton () {

}


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
document.querySelector(".btn-info").addEventListener("click", getCoords);
