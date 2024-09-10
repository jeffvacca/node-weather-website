const request = require('postman-request');
const mapboxToken = 'pk.eyJ1IjoianZhY2NhIiwiYSI6ImNsemJqOWN5NDAxYWQybXEwbHIzMWRva3cifQ.6Ml1zyV0YausP0epnUL4ew';

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?access_token=${mapboxToken}&q=${encodeURIComponent(address)}&limit=1`;
    request({ url, json: true }, (error, response) => {
        const {features} = response.body;
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = features[0].properties;
            // console.log(data);
            callback(undefined, {
                latitude: data.coordinates.latitude,
                longitude: data.coordinates.longitude,
                location: data.name
            })
        }

    })
}

module.exports = geocode;