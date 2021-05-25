const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')
//Class 47 will show proper path, shouldn't be an issue though 
//Templates isn't supposed to be in src, but I think they are both supposed to be in
//public, it works as it is at the moment though 

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App', 
        name: 'Andrew Mead'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Colin Hall'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Colin Hall'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather<h1>')
// })


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Colin Hall',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Colin Hall',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})