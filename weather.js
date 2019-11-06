
window.addEventListener('load', () => {
    let lat;
    let long;
    const module = document.querySelector(".weather");
    const celsiusButton = document.querySelector("#Button");
    const temp = document.querySelector('#temp');
    const humid = document.querySelector('#humidity');
    const forecast = document.querySelector('#forecast');
    const timeZone = document.querySelector('#location');
    var skycons = new Skycons({"monochrome": false,
    "color": {"sun" : "#F00"}});


    function populate(errorMsg) {
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const API =`${cors}https://api.darksky.net/forecast/5da8d867cfc8f3f7a644644fe4cd0577/${lat},${long}`;
    fetch(API)
    .then(response => {
       if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
              $(".weather").toggleClass("hideWeather",true);
              //PUT here message that server is not available
        
            return;
       }
        return response.json();
    })
    .then(data => {
        console.log(data);
    const {temperature, humidity, icon} = data.currently;
    let summary = data.daily.summary;
    window.apiForecast = summary;

    console.log(summary);

    window.globalTemp = temperature;
    let mIcon = icon.replace(/-/g,"_").toUpperCase();
   
    skycons.color.light_cloud = "#00BFFF";

    //console.log(skycons.color);
    
    skycons.play();
    //console.log(mIcon);
    skycons.add("icon1",mIcon);
    if (errorMsg) {
    timeZone.textContent = errorMsg;
    }
    else {
    let zzz = data.timezone;
    zzz = zzz.replace(/_/g," ");
    zzz = zzz.replace(/\//g,":");
    timeZone.textContent = zzz;
    }
    temp.textContent = Math.ceil(temperature) + "°F";
    humid.textContent = Math.round((humidity * 100)) + "%";
    forecast.textContent = summary;


    })
}

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(position =>{
lat = position.coords.latitude ;
long = position.coords.longitude;
populate();
celsiusButton.addEventListener("change", () => {
    if (celsiusButton.checked) { 
        temp.textContent = Math.floor((globalTemp - 32) * (5/9)) + "°C";
        let convertedForecast = apiForecast.split(" ");
        for(let i = 0;i <convertedForecast.length;i++)
            {   
              if (convertedForecast[i].includes("°F"))
              {
                let convertedT = convertedForecast[i].substr(0,convertedForecast[i].indexOf("°F"));
                convertedT = Math.floor((convertedT- 32) * (5/9)) + "°C";
                convertedForecast[i] = convertedT;
           console.log(convertedT);
              }
            }
            forecast.textContent = convertedForecast.join(" ");


    }
    else {
        temp.textContent = Math.ceil(globalTemp) + "°F" ;

    }
})

},fail => {
    lat = 43.653908;
    long = -79.384293;
    errorMsg = "Location could not be determined Default city: Toronto";
    populate(errorMsg);
    celsiusButton.addEventListener("change", () => {
        if (celsiusButton.checked) {
            temp.textContent = Math.floor((globalTemp - 32) * (5/9)) + "°C";
            let convertedForecast = apiForecast.split(" ");
            for(let i = 0;i <convertedForecast.length;i++)
                {   
                  if (convertedForecast[i].includes("°F"))
                  {
                    let convertedT = convertedForecast[i].substr(0,convertedForecast[i].indexOf("°F"));
                    convertedT = Math.floor((convertedT- 32) * (5/9)) + "°C";
                    convertedForecast[i] = convertedT;
               console.log(convertedT);
                  }
                }
    forecast.textContent = convertedForecast.join(" "); 
        }
        else {
            temp.textContent = Math.ceil(globalTemp) + "°F";
            forecast.textContent = apiForecast;
        } 
    })
},{maximumAge:60000, timeout:5000, enableHighAccuracy:true}
);
}
});