const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocodeUtil = require("./utils/geocode");
const weatherUtil = require("./utils/weather");

// Define paths for Express config
// Add public directory to the path using node 'path' module
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

console.log("Public Dir: ", publicDir);

const app = express(); // Runs app
const port = process.env.PORT || 3000;

// Set up handlebars templating engine for express
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDir));

// Request handling via paths
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kutay Etçi"
  });
});

app.get("/home", (req, res) => {
  res.send("Home Page");
});

app.get("/help", (req, res) => {
  res.sendFile(publicDir + "/help.html");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    imagePath: "img/me.jpg",
    name: "Kutay Etçi"
  });
});

app.get("/weather", (req, res) => {
  const { query: { address } = {} } = req;
  if (!address) {
    return res.send({
      error: "An address should be provided."
    });
  }

  geocodeUtil.getGeocode(address, (error, { placeName, longtitude, latitude }) => {
    if (error) {
      return res.send({
        error
      });
    }
    weatherUtil.getWeatherForecast(placeName, longtitude, latitude, (error, {
      placeName,
      summary,
      temperature,
      precipProbability
    }) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        placeName,
        summary,
        temperature,
        precipProbability
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    name: "Kutay Etçi",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    name: "Kutay Etçi",
    errorMessage: "Page not found."
  });
});

// Make web server listen on port 3000
app.listen(port, () => {
  console.log("Server is up and running on port 3000.");
});
