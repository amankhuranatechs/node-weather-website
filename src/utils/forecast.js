const request = require('request');


// const url = 'http://api.weatherstack.com/current?access_key=55240620565673beff3a3541b9b2f204&query=76.79111,30.73528&units=m';

// request({url: url, json: true }, (error, response)=> {
//     if(error) {
//         console.log(`Unable to connect to weather service!`)
//     } else if(response.body.error) {
//             console.log("Unabel to find the location.")
//     }else {
//         console.log(`${response.body.current.weather_descriptions[0]}. It is ${response.body.current.temperature} temprature  and it feels like ${response.body.current.feelslike}`);
//     }
// })


const forecastFunction = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=55240620565673beff3a3541b9b2f204&query=${longitude},${latitude}&units=m`
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to wheather services!`, undefined);
        } else if(body.error) { 
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} temprature  and it feels like ${body.current.feelslike}`)
        }
    });

}

module.exports = forecastFunction;