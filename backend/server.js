// imports express.js lib
const express = require("express");
// hide API key
require("dotenv").config();
// import cross-origin resource sharing (CORS)
const cors = require("cors");
// import axios for abstracted fetching of API
const axios = require("axios");
// create instance of the express
const app = express();
// specify PORT
const PORT = 3000;

// enable requests from any origin - allow frontend to make requests to backend serer
app.use(cors());

// route that listens for GET requests on the '/weather' endpoint
// defines a route that takes a query param 'city' and makes request to
// openweathermap.org API
app.get("/weather", async (req, res) => {
  const requestedCity = req.query.city;
  // TODO - Make a request to the openweathermap.org API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${requestedCity}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
  try {
    // use axios to fetch and convert to JSON
    const response = await axios.get(url);
    // unpack response, store only needed
    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };
    // return weather data
    res.json(weatherData);
  } catch (error) {
    // for front end debugging
    console.log("Invalid API key or URL", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// test server on PORT 3000
// starts the server on PORT 3000 and logs a message to the console when the server is running.
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
