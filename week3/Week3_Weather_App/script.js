// ========================================
// OpenWeatherMap API Key
// ========================================

const API_KEY = "YOUR_API_KEY";


// ========================================
// Get HTML Elements
// ========================================

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const humidity = document.getElementById("humidity");

const condition = document.getElementById("condition");

const feelsLike = document.getElementById("feelsLike");

const loading = document.getElementById("loading");

const weatherIcon = document.getElementById("weatherIcon");

const errorMessage = document.getElementById("errorMessage");


// ========================================
// Search Button Event
// ========================================

searchBtn.addEventListener("click", getWeather);


// ========================================
// Enter Key Event
// ========================================

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        getWeather();

    }

});


// ========================================
// Get Weather Function
// ========================================

async function getWeather() {

    // Get city entered by user

    const city = cityInput.value.trim();


    // Check empty input

    if (city === "") {

        errorMessage.textContent =
            "❌ Please enter a city name!";

        return;

    }


    // Show loading

    loading.style.display = "block";


    // Clear previous error

    errorMessage.textContent = "";


    try {

        // ========================================
        // Create API URL
        // ========================================

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        console.log("API URL:", url);


        // ========================================
        // Send HTTP GET Request
        // ========================================

        const response = await fetch(url);


        console.log("Status:", response.status);


        // ========================================
        // Convert Response to JSON
        // ========================================

        const data = await response.json();


        console.log("API Response:", data);


        // ========================================
        // Check API Response
        // ========================================

        if (!response.ok) {

            throw new Error(data.message);

        }


        // ========================================
        // Display City Name
        // ========================================

        cityName.textContent = data.name;


        // ========================================
        // Display Temperature
        // ========================================

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        // ========================================
        // Display Humidity
        // ========================================

        humidity.textContent =
            `${data.main.humidity}%`;


        // ========================================
        // Display Feels Like
        // ========================================

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;


        // ========================================
        // Display Weather Condition
        // ========================================

        condition.textContent =
            data.weather[0].description;


        // ========================================
        // Display Weather Icon
        // ========================================

        weatherIcon.textContent =
            getWeatherIcon(data.weather[0].main);

    }


    // ========================================
    // Error Handling
    // ========================================

    catch (error) {

        console.error("Weather Error:", error);

        errorMessage.textContent =
            "❌ " + error.message;

    }


    // ========================================
    // Finally
    // ========================================

    finally {

        loading.style.display = "none";

    }

}


// ========================================
// Weather Icon Function
// ========================================

function getWeatherIcon(weather) {

    if (weather === "Clear") {

        return "☀️";

    }


    if (weather === "Clouds") {

        return "☁️";

    }


    if (weather === "Rain") {

        return "🌧️";

    }


    if (weather === "Drizzle") {

        return "🌦️";

    }


    if (weather === "Thunderstorm") {

        return "⛈️";

    }


    if (weather === "Snow") {

        return "❄️";

    }


    if (
        weather === "Mist" ||
        weather === "Fog"
    ) {

        return "🌫️";

    }


    return "🌤️";

}