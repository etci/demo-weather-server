const request = require("request");

const searchServiceToken =
  "pk.eyJ1Ijoia3V0YXlldGNpIiwiYSI6ImNrNGw5cmppdjA5YTIzbW1pdXFxZzdkbTYifQ.xFGaVdW24XF-1-e7unNXbQ";

const getGeocode = (address, callback) => {
  const searchServiceUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${searchServiceToken}`;
  request({ url: searchServiceUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location service!");
    } else {
      const {
        body: {
          features: [
            {
              place_name: placeName = "",
              center: [latitude, longtitude] = [-1, -1]
            } = {}
          ] = [
            {
              place_name: "",
              center: [-1, -1]
            }
          ]
        } = {}
      } = response;
      if (latitude === -1 && longtitude === -1) {
        callback("Invalid location provided!", {});
      } else {
        console.log(`${placeName} ${longtitude} ${latitude}`);
        callback(undefined, { placeName, longtitude, latitude });
      }
    }
  });
};

module.exports = {
  getGeocode
};
