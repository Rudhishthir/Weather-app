console.log("Client side js is loaded");

const fetchForecast = (address, callback) => {
    // fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log("Error is ", data.error);
            callback(data.error, null);
        }
        else {
            console.log('Location is => ' + data.location);
            console.log('Forecast is => ' + data.forecast);
            callback(null, data);
        }
    });
});
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para = document.querySelector('p');

weatherForm.addEventListener('submit', (e) =>{
    console.log('testing ', search.value);
    e.preventDefault();
    fetchForecast(search.value, (err, data) => {
        if(err) {
            console.log(err);
            document.getElementById('error-section').classList.remove('dispNone');
            document.getElementById('error').innerHTML = err;
            document.getElementsByClassName('forecast-section')[0].classList.add('dispNone');
        } else{
            document.getElementById('error-section').classList.add('dispNone');
            document.getElementsByClassName('forecast-section')[0].classList.remove('dispNone');
            document.getElementById('forecast').innerHTML = data.forecast;
            document.getElementById('location').innerHTML = data.location;
        }
    });
    
});