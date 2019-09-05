const request = require('request');

// const forecast = (error, coords, callback) => {
const forecast = (error, {lat, lng}, callback) => {
    if(error){
        console.log("Error from callback ", error);
        return;
    }
    // let url = "https://api.darksky.net/forecast/25dc07cd2039eba56a833f2dccfd2b0a/"+ coords.lat +","+ coords.lng +"?units=si&lang=en";
    let url = "https://api.darksky.net/forecast/25dc07cd2039eba56a833f2dccfd2b0a/"+ lat +","+ lng +"?units=si&lang=en";

    request(
        {
            url,
         json: true   
        },
        (error, response, body) => {
        if(error) callback(error, null);
        // console.log(body.daily.data[4].summary, "It is currently ", body.currently.temperature, "degree celsius out there and ", body.currently.precipProbability, "% chance of rain");
        callback(null, body.daily.data[4].summary+ "It is currently "+ body.currently.temperature+ " degree celsius out there and "+ body.currently.precipProbability+ "% chance of rain");
    });    
}

module.exports = forecast;