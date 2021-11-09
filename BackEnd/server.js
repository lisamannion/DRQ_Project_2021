const express = require('express')
const app = express()

// Changed port from 3000 to 2000 so that its not running on the same port as the app
const port = 4000

// Including body parser (Middleware)
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Including cors (Cross Origin Resource Sharing - for Security)
const cors = require('cors')

app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Including Mongoosejs package
const mongoose = require('mongoose')

// Set up connection string for database
const connectionString = 'mongodb+srv://admin:0000@cluster0.cbk0q.mongodb.net/movies?retryWrites=true&w=majority'
mongoose.connect(connectionString, {useNewUrlParser: true})

// Defining the schema for the database
const Schema = mongoose.Schema
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
})

// Use schema to create a model for the database
var MovieModel = mongoose.model("movie", movieSchema)

// Get movies back from API
app.get('/api/movies', (req, res) => {

    // const myMovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }
    // ]
    // Send back some JSON data (hardcoded array above)

    // Send back data from the database
    MovieModel.find((err, data) => {
        res.json(data)
    })
    
    // res.status(200).json({
    //     // Can have multiple items (seperated by commas) in here such as:
    //     message: "Everything is OK",
    //     movies: myMovies
    // })
})

// Listening for a post request
app.post('/api/movies', (req, res) => {
    // When data is being passed up, log to server's console (port:4000)
    console.log("Movie received!")
    console.log(req.body.title)
    console.log(req.body.year)
    console.log(req.body.poster)

    // Write the new movie to the database
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })

    // Send a response back to the client to confirm the movie is created
    res.send("Movie added")
})

// Listen for a get request and will return movie which has the id specified after /api/movies/:
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id)

    MovieModel.findById(req.params.id, (err, data) => {
        // Sending back the data
        res.json(data)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})