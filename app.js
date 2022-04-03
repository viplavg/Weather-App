
//trigger this function on page onload
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    let lat = crd.latitude;
    let long = crd.longitude;

    const locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=992f755ab51c4b3e88fa787acb7e89be`;

    fetch(locationURL).then(res => res.json()).then(data => {
        let location = data.results[0].components.state_district;

        getData(location);
    });

  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
function defaultCity(){
    navigator.geolocation.getCurrentPosition(success, error, options);
}
//<<<<<---- onload functionality ends here ---->>>>>


function getData(location){
    let city = null;

    if(document.getElementById("inp").value === ""){
        city = location;
    } else {
        city = document.getElementById("inp").value;
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22dad53282ea80111b9ba1e8d74d515c&units=metric`;

    fetch(url).then(res => res.json()).then( (data) =>  {

        let temperature_details = {
            city_name: data.name,
            temperature: data.main.temp,
            max_temp: data.main.temp_max,
            min_temp: data.main.temp_min,
            humidity: data.main.humidity,
            feelsLike: data.main.feels_like,
            type: data.weather[0].main,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            wind_speed: Math.round(data.wind.speed)
        };

        const date_data = generateDate();

        //set the temperature in html
        document.getElementById("temperature").innerText = Math.round(temperature_details.temperature) + '\u00B0';

        //set the city name in html
        document.getElementById("city").innerText = city;

        //set the date in html
        document.getElementById("date_details").innerText = 
        `${date_data.hours}:${date_data.minutes} - ${date_data.day}, ${date_data.date} ${date_data.month}'${date_data.year}`;
        
        //set the type in html
        document.getElementById("type").innerText = temperature_details.type;
        
        //set the icon in the html as per the type of temperature
       document.getElementById("icon").src = `http://openweathermap.org/img/w/${temperature_details.icon}.png`;
    
       //set the humidity in html
       document.getElementById("humidity").innerText = temperature_details.humidity+"%";

       //set the max temperature in html
       document.getElementById("max_temp").innerText = temperature_details.max_temp+"\u00B0"+"C";

        //set the min temperature in html
        document.getElementById("min_temp").innerText = temperature_details.min_temp+"\u00B0"+"C";

        //set the feels like in html
        document.getElementById("feels_like").innerText = temperature_details
        .feelsLike+"\u00B0"+"C";

        //set the description in html
        document.getElementById("description").innerText = temperature_details.desc;

        //set the wind in html
        document.getElementById("wind").innerText = temperature_details.wind_speed+" km/h";

        document.getElementById("inp").value = "";

    });

}

function generateDate(){
    const date = new Date();

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let date_data = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        date: date.getDate(),
        day: dayNames[date.getDay()],
        month: monthNames[date.getMonth()],
        year: Number(date.getFullYear().toLocaleString().substr(3,4))
    }

    return date_data;
}
