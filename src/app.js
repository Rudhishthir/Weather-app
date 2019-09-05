const path = require('path');//Core node module so no need to install it and try to include core modules first and then npm ones
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates'); //by default it would look for "views" folder for the hbs files, now we are directing it to templates folder
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

// app.get('', (req, res) =>{
//     res.send('<h1>Weather</h1>');
// });

app.get('/help', (req, res) =>{
    // res.send({
    //     name: "Rudy",
    //     age: 28
    // });
    res.render('help', {
        title: 'Help',
        helpContent: 'For any queries contact 9916960897',
        name: 'Rudy'
    })
});

app.get('/about', (req, res) =>{
    // res.send('<h2>About Page</h2>');
    res.render('about', {
        title:'About Me',
        url: './img/me.jpg',
        name: 'Rudy'
    })
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rudy'
    });
});

app.get('/weather', (req, res) =>{
    console.log(req.query);
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        });
    }

    

    geocode(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(error, data, (err, weatherForecast)=>{
            if(err){
                return res.send({
                    err
                })
            }
            res.send({
                forecast: weatherForecast,
                address: req.query.address,
                location: data.location
            });
        })
    })
});

// app.get('/products', (req, res) =>{
//     console.log(req.query);
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term!'
//         })
//     }
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('error', {
        title: 'Error Page',
        name: 'Rudy',
        errorText: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    // res.send("404 Page not found");
    res.render('error', {
        title: 'Error Page',
        name: 'Rudy',
        errorText: '404 Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up and running at port ' + port);
});