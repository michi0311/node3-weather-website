const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/408df73d3a9f808599ce6e303509a3db/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&exclude=minutely,alerts,flags'
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find Location, try again', undefined)
        } else {
            var highTime = new Date(body.daily.data[0].temperatureHighTime * 1000)
            var lowTime = new Date(body.daily.data[0].temperatureLowTime * 1000)
            var sunrise = new Date(body.daily.data[0].sunriseTime * 1000)
            var sunset = new Date(body.daily.data[0].sunsetTime * 1000)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.'+
            ' The high today will be ' + body.daily.data[0].temperatureHigh + ' degrees at ' + highTime.getHours() +':00' +
            '. The low today will be ' + body.daily.data[0].temperatureLow + ' degrees at ' + lowTime.getHours() +':00'  +
            '. The sunrise is at ' + (sunrise.getHours())+':' + (sunrise.getMinutes() >= 10 ? sunrise.getMinutes() : ('0' + sunrise.getMinutes()) ) +
            ' and the sunset is at ' + (sunset.getHours())+':'+ (sunset.getMinutes() >= 10 ? sunset.getMinutes() : ('0' + sunset.getMinutes()) ) +
            '. Currently there is a ' + body.currently.precipProbability + '% chance of rain.'
            )
        }
    })
}

module.exports = forecast