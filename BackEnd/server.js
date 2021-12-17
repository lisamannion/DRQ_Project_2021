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

// Using cors
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Configuration for sending build and static files for deployment
const path = require('path')
app.use(express.static(path.join(__dirname, '../build')))
app.use('/static', express.static(path.join(__dirname, 'build//static')))

// Including Mongoosejs package
const mongoose = require('mongoose')

// Set up connection string for database
const mongoConnection = 'mongodb+srv://admin:0000@cluster0.cbk0q.mongodb.net/stallion?retryWrites=true&w=majority'
mongoose.connect(mongoConnection, { useNewUrlParser: true })

// Defining the schema for the database
const Schema = mongoose.Schema
var stallionSchema = new Schema({
    regName: String,
    birthYear: String,
    picture: String
})

// Use schema to create a model for the database
var StallionModel = mongoose.model("stallion", stallionSchema)

// Get stallions back from API
app.get('/displayStallions', (req, res) => {
    // Send back data from the database
    StallionModel.find((err, data) => {
        res.status(200).json(data)
    })
})

// Listening for a post request
app.post('/newStallion', (req, res) => {
    // Write the new stallion to the database
    StallionModel.create({
        regName: req.body.regName,
        birthYear: req.body.birthYear,
        picture: req.body.picture
    })

    // Send a response back to the client to confirm the stallion is created
    res.status(200).send("Stallion added")
})

// Listen for a get request and will return stallion which has the id specified after /update/:id
app.get('/update/:id', (req, res) => {
    StallionModel.findById(req.params.id, (err, data) => {
        // Sending back the data
        res.status(200).json(data)
    })
})

// Updating stallion with a particular ID
app.put('/update/:id', (req, res) => {
    // Makes an asynchronous call to the database, finds, and updates doc with specified id
    StallionModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.status(200).send(data)
        })
})

// Deleting a stallion with id passed by URL
app.delete('/delete/:id', (req, res) => {
    // Makes an asynchronous call to the database, finds, and updates doc with specified id
    StallionModel.findByIdAndDelete(req.params.id, { new: true },
        (err, data) => {
            res.send(data)
        })
})

// Get on any other route and send the index.html file back
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})

// Server app listening on port 4000
app.listen(port, () => {
    console.log('Listening at http://localhost:4000')
})