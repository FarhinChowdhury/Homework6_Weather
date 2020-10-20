$("#date").text(moment().format("MMM Do YYYY"));   
$("#time").text(moment().format("LT")); 

document.querySelector("#searchBtn").addEventListener("click", 
function(){
    cityName = document.querySelector("#city-input").value
     getWeatherData();
     saveHistory();})

//APIS
var apiKey = "91ef0707ae600515288304e8c5d926b3"
var cityName = ""
var lat = ""
var lon = ""
var searchHistory = []
function saveHistory(){
    var cityList = JSON.parse(localStorage.cityList || "[]")
    cityList.push(cityName)
    localStorage.cityList =JSON.stringify(cityList)
    searchHistory = JSON.parse(localStorage.cityList);
    document.querySelector("#cityHistory").innerHTML = ``;
  //create city history list
  for (var i = 0; i < searchHistory.length; i++) {
    document.querySelector("#cityHistory").innerHTML += `<a class="list-group-item list-group-item-action" onClick="buttonSearch('${searchHistory[i]}')">${searchHistory[i]}</a>`;
  }
}

function buttonSearch(city){
    cityName=city
    getWeatherData()
}
function defaultPage(){
    cityName="Toronto"
    getWeatherData()
}
defaultPage()

function getWeatherData(){
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        url: queryUrl,
        method: "GET",

    }).then(function (response){
        var temp = response.main.temp -273.15
        $("#temp").html(`Temp: ${(temp).toFixed(2)} \xB0C `);
        $(".city-name").html(`${response.name}`);
        $("#wind").html(`Wind: ${response.wind.speed} m/s `);
        $("#humid").html(`Humidity: ${response.main.humidity} %`);
        $("#icon").html(
      `<img class="ml-5" src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"/>`);
    
    lat = response.coord.lat
    lon=response.coord.lon
    var URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    $.ajax({
        url: URL2,
        method: "GET",

    }).then(function (response){
        $("#temp1").html(`Temp.: ${response.daily[1].temp.day} \xB0C`);
        $("#day1").text(moment().add(1, "days").format("MMMM Do YYYY"));
        $("#humid1").html(`Humd.: ${response.daily[1].humidity}%`);
        $("#img1").html(
        `<img src="https://openweathermap.org/img/wn/${response.daily[1].weather[0].icon}@2x.png"/>`);
        $("#uv1").html(`UV Index: ${response.daily[1].uvi}`);
        
      
      $("#temp2").html(`Temp.: ${response.daily[2].temp.day}`);
        $("#day2").text(moment().add(2, "days").format("MMMM Do YYYY"));
        $("#humid2").html(`Humid.: ${response.daily[2].humidity}%`);
        $("#img2").html(
        `<img src="https://openweathermap.org/img/wn/${response.daily[2].weather[0].icon}@2x.png"/>`);
        $("#uv2").html(`UV Index: ${response.daily[2].uvi}`);

      $("#temp3").html(`Temp.: ${response.daily[3].temp.day}`);
        $("#day3").text(moment().add(3, "days").format("MMMM Do YYYY"));
        $("#humid3").html(`Humid.: ${response.daily[3].humidity}%`);
        $("#img3").html(
        `<img src="https://openweathermap.org/img/wn/${response.daily[3].weather[0].icon}@2x.png"/>`);
        $("#uv3").html(`UV Index: ${response.daily[3].uvi}`);
      $("#temp4").html(`Temp.: ${response.daily[4].temp.day}`);
        $("#day4").text(moment().add(4, "days").format("MMMM Do YYYY"));
        $("#humid4").html(`Humid.: ${response.daily[4].humidity}%`);
        $("#img4").html(
        `<img src="https://openweathermap.org/img/wn/${response.daily[4].weather[0].icon}@2x.png"/>`);
        $("#uv4").html(`UV Index: ${response.daily[4].uvi}`);
      $("#temp5").html(`Temp.: ${response.daily[5].temp.day}`);
        $("#day5").text(moment().add(5, "days").format("MMMM Do YYYY"));
        $("#humid5").html(`Humid.: ${response.daily[5].humidity}%`);
        $("#img5").html(
        `<img src="https://openweathermap.org/img/wn/${response.daily[5].weather[0].icon}@2x.png"/>`);
        $("#uv5").html(`UV Index:${response.daily[5].uvi}`);

    })
    var url3 = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
    $.ajax({
        url:url3,
        method:"GET",
    }).then(function(response){
        
        console.log(response.value)
        if(response.value<2){
            document.querySelector("#uv").innerHTML = `<div id= "uv-card"class = "card" style="background-color:skyblue;">${response.value}</div>`
        } else if(response.value>=2 && response.value<=5){
            document.querySelector("#uv").innerHTML = `<div id = "uv-card"class = "card" style="background-color:yellow;">${response.value}</div>`
        }else if(response.value > 5 && response.value <= 7){
            document.querySelector("#uv").innerHTML = `<div id="uv-card"class = "card" style="background-color:orange;">${response.value}</div>`
        }else if(response.value >= 8 && response.value <= 10){
            document.querySelector("#uv").innerHTML = `<div id="uv-card"class = "card" style="background-color:red;">${response.value}</div>`
        }
    })



    })
}

