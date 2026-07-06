const apiKey = "c8ae3246f739084cf82c1eb6788b55c5";

async function getWeather() {

    const city = document.getElementById("city").value;

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").innerHTML =
            data.name + ", " + data.sys.country;

        document.getElementById("temp").innerHTML =
            data.main.temp + " °C";

        document.getElementById("condition").innerHTML =
            "Condition : " + data.weather[0].main;

        document.getElementById("humidity").innerHTML =
            "Humidity : " + data.main.humidity + "%";

        document.getElementById("wind").innerHTML =
            "Wind Speed : " + data.wind.speed + " m/s";

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }
    catch(error){

        alert(error.message);

    }

}