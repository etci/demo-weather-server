const request = require("request");

const forecastServiceToken = "7bf947adef5f598b6a8dbab6f478c077";

const getWeatherForecast = (placeName, longtitude, latitude, callback) => {
  const forecastUrl = `https://api.darksky.net/forecast/${forecastServiceToken}/${longtitude},${latitude}`;
  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to access weather service!");
    } else {
      const {
        body: {
          error: errorMsg = "",
          currently: { temperature, precipProbability } = {},
          daily: { data: [{ summary }] = [{}] } = {}
        } = {}
      } = response;
      if (errorMsg) {
        callback(errorMsg);
      } else {
        callback(undefined, {
          placeName,
          summary,
          temperature,
          precipProbability: Math.round(precipProbability * 100).toFixed(2)
        });
      }
    }
  });
};

module.exports = {
  getWeatherForecast
};
