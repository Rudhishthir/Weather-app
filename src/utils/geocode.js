const request = require('request');

const geoCode = (location, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(location) +".json?limit=1&access_token=pk.eyJ1IjoicnVkeTAwNyIsImEiOiJjanp2bHNod3YwMTJkM2hsamZ3cXZocmdzIn0.R8MuxHgUEMM2cLYIfFnICg";
    request({
        url,
        json: true
    }, (error, response, body)=>{
        if(error){
            console.log("Unable to connect to Location services ", error);
            callback(error, null);
        } else if(!body.features || body.features.length ==0){
            console.log("Unable to find the provided location");
            callback("Unable to find the provided location", null);
        } else{
            const coords = {
                lng : body.features[0].center[0],
                lat : body.features[0].center[1],
                location: body.features[0].place_name
            }
            console.log(coords);
            callback(null, coords);
        }
    });
}

module.exports = geoCode;