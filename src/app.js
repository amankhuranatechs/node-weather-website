const path = require('path');
const express = require('express');  // this express is actually a funtion
const hbs = require('hbs');


const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); // generate the application
const port = process.env.PORT || 4000;


console.log(__dirname); /// return path to the root of the directory
console.log(path.join(__dirname, '../public'));

// define paths for express config  
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath =  path.join(__dirname, '../templates/partials');

// app.set('views', path.join(__dirname, '../views'))

//node.js works until it finds a match 
//setup handlebars engine and views location
app.set('view engine', 'hbs'); /// 
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve   
app.use(express.static(publicDirectoryPath)) // overrides the root url


app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman khurana'
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Cristiano',
        name: 'Aman khurana'
    });
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aman khurana',
        helpText: 'This is the sample helpful text.'

    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search filter"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// match anything that hasnt been matched so far


// this tells what the server do whensome request from the url.
app.get('', (req, res) => {  // this the root url
    // res.send('Hello Express');
    res.send(`<h1>Weather App</h1>`)
}) 


// app.get('/help', (req,res) => {
//     // res.send('Help Page');
//     // res.send({
//     //     name: 'Aman',
//     //     age: 30
//     // })
//     res.send([
//         {
//             name: 'Aman',
//             age: 30
//         },{
//             name: 'khurana',
//             age: 30
//         }
//     ])
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide the address term!'
        })
    } else {
        console.log('143214');
        geocode(req.query.address, (error, { longitude, latitude, location } = {})=> {
            if(error) {
                return  res.send({error})
            }    
            console.log(longitude, longitude)
        // forecast(data.longitude, data.latitude, (error, forecastData) => {
            forecast(longitude,latitude, (error, forecastData) => {
                if(error) {
                    return  res.send({error})
                }
                    res.send({
                        location,
                        forecastData,
                        address: req.query.address
                    })
                })
        })
    }   
})


// app.get('/about', (req, res) => {
//     res.send('About Page');
// })

app.get('/weather', (req, res) => {
    res.send('This is weather page')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not Found!',
        name: 'Aman khurana'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
       errorMessage: 'Page not found!!!!!',
       name: "Aman khurana"
    })
    // res.send(`<h1>Not Found</h1>`)
})


// The process of starting up a server is an asynchronous process, though it'll happen almost instantly.
app.listen(port, () => {
    console.log(`server started at port ${port}`)
});