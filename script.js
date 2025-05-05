document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("input");
    const weatherButton = document.getElementById('button');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisp = document.getElementById('city-name');
    const temperatureDisp = document.getElementById('temperature');
    const descriptionDisp = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const API_KEY = 'e3122816d93b171a52b8f77357ec4e20'
    weatherButton.addEventListener('click', async () => {

        const city = cityInput.value.trim()
        if (!city) return;
        // it may throw an error
        // server/database is alwaya in another continent
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError()

        }
    });
    async function fetchWeatherData(city) {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;     

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(typeof response);
            console.log("RESPONSE", data);
            return data;

        } catch (error) {
            console.error("Error fetching weather data ", error);
        }
    }


        function displayWeatherData(weatherData) {
            console.log(weatherData);
            const {name,main,weather} = weatherData;
            cityNameDisp.textContent= `City: ${name}`;
            temperatureDisp.textContent = `Temperature: ${main.temp}°C`;
            descriptionDisp.textContent = `Weather: ${weather[0].description}`;
            //unlock the display 
            weatherInfo.classList.remove('hidden');
errorMessage.classList.add('hidden');
        }


             function showError() {
                    weatherInfo.classList.add('hidden');
                       errorMessage.classList.remove('hidden');
           }

    });
    