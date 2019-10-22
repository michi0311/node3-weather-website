const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoibW0zMTEiLCJhIjoiY2sxdWhoeXJvMDUwazNobzY4Z3QxYThleSJ9.cbfXhAw5pWaQ05EJt5jOHQ'
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to Location services', undefined)
        } else if (body.features.length === 0) {
            callback('Input Invalid!', undefined)
        } else {
            const data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geoCode 