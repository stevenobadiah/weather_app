//const zipInput = document.getElementById('zipInput')
//const zipError = document.getElementById('zipError');
//const countryInput = document.getElementById('countryInput')
//const countryError = document.getElementById('countryError');
const cityInput = document.getElementById('cityInput')
const cityError = document.getElementById('cityError');
const unitsInput = document.getElementById('unitsInput')
const errorMessage = document.getElementById('errorMessage')
const sunIcon = document.getElementById('sunLoader')

//let zipValue = zipInput.value
//let countryValue = countryInput.value

const city = document.getElementById('city')
const timezone = document.getElementById('timezone')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const longitude = document.getElementById('longitude')
const latitude = document.getElementById('latitude')
const temp = document.getElementById('temp')
const feelsLike = document.getElementById('feelsLike')
const tempMin = document.getElementById('tempMin')
const tempMax = document.getElementById('tempMax')
const visibility = document.getElementById('visibility')
const windspeed = document.getElementById('windspeed')

/*
zipInput.addEventListener('input', function (event) {
    if (zipInput.validity.valid) {
      zipError.textContent = '';
      zipError.className = 'error';
      zipValue.className = '';
    } else {
      zipError.className = 'error active';
      zipValue.className = 'invalid';
      showZipError();
    }
});

function showZipError() {
    if (zipInput.validity.valueMissing) {
      zipError.textContent = 'You need to enter a zipcode.';
    } else if (zipInput.validity.tooShort) {
      zipError.textContent = `Zipcode should be at least ${ zipInput.minLength } characters; you entered ${ zipInput.value.length }.`;
    } else if (zipInput.validity.tooLong) {
      zipError.textContent = `Zipcode should be less than ${ zipInput.maxLength } characters; you entered ${ zipInput.value.length }.`;
    }
  
    // Set the styling appropriately
    if (!zipValue.checkValidity()) {
      zipError.className = 'error active';
    }
}

countryInput.addEventListener('input', function (event) {
    if (countryInput.validity.valid) {
      countryError.textContent = '';
      countryError.className = 'error';
      countryInput.className = '';
    } else {
      countryError.className = 'error active';
      countryInput.className = 'invalid';
      showCountryError();
    }
});

function showCountryError() {
    if (countryInput.validity.valueMissing) {
      countryError.textContent = 'You need to enter a country.';
    } else if (countryInput.validity.tooShort || countryInput.validity.tooLong) {
      countryError.textContent = `Country Code should be 2-3 characters; you entered ${ countryInput.value.length }.`;
    }
  
    // Set the styling appropriately
    if (!countryInput.checkValidity()) {
      countryError.className = 'error active';
    }
}
*/

cityInput.addEventListener('input', function (event) {
    if (cityInput.validity.valid) {
      cityError.textContent = '';
      cityError.className = 'error';
      cityInput.className = '';
    } else {
      cityError.className = 'error active';
      cityInput.className = 'invalid';
      showCityError();
    }
});

function showCityError() {
    if (cityInput.validity.valueMissing) {
      cityError.textContent = 'You need to enter a city.';
    } else if (cityInput.validity.tooShort || cityInput.validity.tooLong) {
      cityError.textContent = `Country Code should be 3-15 characters; you entered ${ cityInput.value.length }.`;
    }
  
    // Set the styling appropriately
    if (!cityInput.checkValidity()) {
      cityError.className = 'error active';
    }
}

function timeConverter(timeString) {
    var date = new Date(timeString * 1000);
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}


function visualizeCurrentData(data){
    city.textContent = data.name + ', ' + data.sys.country  
    timezone.textContent = 'Timezone: ' + data.timezone
    sunrise.textContent = 'Sunrise: ' + timeConverter(data.sys.sunrise)
    sunset.textContent = 'Sunset: ' + timeConverter(data.sys.sunset)
    longitude.textContent = 'Longitude: ' + data.coord.lon
    latitude.textContent = 'Latitude: ' + data.coord.lat
    temp.textContent = 'Temperature: ' + data.main.temp
    feelsLike.textContent = 'Feels Like: ' + data.main.feels_like
    tempMin.textContent = 'Temp Min: ' + data.main.temp_min
    tempMax.textContent = 'Temp Max: ' + data.main.temp_max
    pressure.textContent = 'Pressure: ' + data.main.pressure
    visibility.textContent = 'Visibility: ' + data.visibility
    windspeed.textContent = 'Windspeed: ' + data.wind.speed

}

function visualizeForecastData(data){
    let i = 1;
    for (let day of data.daily) {
        let dayCardStats = document.getElementById('day' + i).children
        dayCardStats[1].textContent = day.weather[0].description
        dayCardStats[2].textContent = day.temp.min
        dayCardStats[3].textContent = day.temp.max
        i++;
        if (i === 7) {
            break
        }
    }
}

async function fetchCurrentWeather() {
    try {
        sunLoader.className = 'rotate';
        document.getElementById('errorMessage').textContent = ''
        //let zipInputValue = zipInput.value
        //let countryInputValue = countryInput.value
        let cityInputValue = cityInput.value
        let unitsInputValue = unitsInput.value
        //const response = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zipInputValue + ',' + countryInputValue + '&units=' + unitsInputValue + '&appid=dbf09f59c541573ac0445dba3f01eb0b', {mode: 'cors'});
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInputValue + '&units=' + unitsInputValue + '&appid=dbf09f59c541573ac0445dba3f01eb0b', {mode: 'cors'});
        const currentWeatherData = await response.json();
        let longitude = currentWeatherData.coord.lon
        let latitude = currentWeatherData.coord.lat

        const forecastResponse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&units=' + unitsInputValue + '&appid=dbf09f59c541573ac0445dba3f01eb0b')
        const weatherForecastData = await forecastResponse.json()
        console.log(currentWeatherData)
        console.log(weatherForecastData)
        visualizeCurrentData(currentWeatherData)
        visualizeForecastData(weatherForecastData)
        sunLoader.className = '';

        if (document.getElementById('weatherForecast').className = 'd-none') {
          document.getElementById('weatherForecast').className = 'showForecast'
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = error
    }
}
  
const refreshBtn = document.getElementById('refreshBtn');

refreshBtn.addEventListener("click", fetchCurrentWeather)

//window.onload = fetchGif