// Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var http = require("http");

// Ping heroku app to prevent sleep-mode
setInterval(() => {
    http.get("https://ancient-shore-25033.herokuapp.com/courses/get");
}, 300000); // every 5 minutes (300000)

// Initialize express
const app = express();

// Override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// Middleware
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors());



// DB config
// URI to DB
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



// Routes
const Courses = require('./routes/Courses');
app.use('/courses', Courses);



// Connect to server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})