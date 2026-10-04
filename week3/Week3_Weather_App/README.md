# 🌤️ Weather App

## SkillNexis Internship - Week 3

A simple and interactive Weather App built using HTML, CSS, and JavaScript. The application uses the OpenWeatherMap API to fetch and display current weather information for a selected city.

## ✨ Features

* Search weather by city name
* Search using the Enter key
* Display current temperature
* Display humidity
* Display feels-like temperature
* Display weather condition
* Dynamic weather icons
* Loading indicator
* Error handling
* Responsive design
* Interactive UI

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Fetch API
* OpenWeatherMap API
* JSON

## 📚 Concepts Learned

* DOM Manipulation
* Event Listeners
* JavaScript Functions
* HTTP Requests
* GET Request
* Fetch API
* REST API
* JSON
* async/await
* try/catch/finally
* Error Handling
* Conditional Statements
* Objects
* Arrays
* Template Literals
* encodeURIComponent()

## 🔄 How the Application Works

1. The user enters a city name.
2. JavaScript gets the city from the input field.
3. Fetch API sends an HTTP GET request to OpenWeatherMap.
4. OpenWeatherMap returns weather information in JSON format.
5. JavaScript converts and reads the JSON response.
6. Required weather information is extracted from the response.
7. DOM manipulation is used to display the weather information on the webpage.
8. If an error occurs, an appropriate error message is displayed.

## 📁 Project Structure

```text
Week3_Weather_App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🌐 API Used

OpenWeatherMap API is used to retrieve weather information.

Website:

https://openweathermap.org/api

## ▶️ How to Run

1. Download or clone the project.
2. Open the project folder in VS Code.
3. Add your OpenWeatherMap API key in `script.js`.
4. Open `index.html` using Live Server.
5. Enter a city name.
6. Click Search or press Enter.

## 🎯 Learning Outcome

This project helped me understand how JavaScript communicates with an external API. I learned how to send HTTP requests using the Fetch API, handle JSON responses, use async/await, manage errors, and dynamically update webpage content using DOM manipulation.

## 👩‍💻 Internship

This project was completed as part of the SkillNexis Web Development Internship.
