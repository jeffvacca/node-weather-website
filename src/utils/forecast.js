const request = require('postman-request');
const accessKey = '4aea61163e92495a585b936ae8f3a52f';

const forecast = (lat, long, callback) => {
    const query = `${lat},${long}`;
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}&units=f`;
    request({ url, json: true }, (error, response) => {
        const {current, error:responseError} = response.body;
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (responseError) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out.  It feels like ${current.feelslike} degrees out.`);
        }
    })
}

module.exports = forecast;
