const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=25c1feca95d25a11d1ccf19801bbde0f&query='+ latitude + ',' + longitude + '&units=f'
    request({ url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to conenct to weather service')
            }
            else if (body.error) {
                callback('Unable to find location', undefined)
             }
            else{
                callback(undefined, body.current.weather_descriptions[0]+'. The temp is ' + body.current.temperature + ' and it feels like ' + body.current.feelslike
                    // Temperature: response.body.current.temperature,
                    // FeelsLike:  response.body.current.feelslike,
                    //Forecast: response.body.current.weather_descriptions[0]+'. The temp is ' + Temperature + ' and it feels like ' + FeelsLike
                )
            }
         })
}

module.exports = forecast