// Replace with your OpenWeatherMap API key
const API_KEY = 'eb9e884c5736b3a0741585425830fd09';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDesc = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    weatherInfo.style.display = 'block';
}
                                                                                  
