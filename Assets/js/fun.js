
var APIKey = "72491726dc9772e5242c3f9cf4114a9e";
var cityName = "London"

var city = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid='+ APIKey;


$.ajax({
    url: city,
       method: 'GET',
   }).then((response)=>{
console.log(response)



   })


