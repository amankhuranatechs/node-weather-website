
const request = require('request');
const geocodeFunction = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW1hbmtodXJhbmF0ZWNocyIsImEiOiJja3YyN2VxNnYwNjA2Mm5vMHNkY2Y2OXVtIn0.NgPwFjzoNZ1k_8lQkDBLPg&limit=1`;
    request({url, json: true }, (error, {body}) => {
        console.log(url)
        if(error) {
            // console.log(`Unable to connect to weather service!`)
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find the location. Try Another search', undefined)
        }else  {
           
            const longitude = body.features[0].center[1];
            const latitude = body.features[0].center[0];
            const location = body.features[0].place_name;
          
            callback(undefined, {
                longitude,
                latitude,
                location
            })
            // console.log( )
        }
    })  


}



module.exports = geocodeFunction;