const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Defining Image schema and requiring.
const Image = require('./models/Images.js');

// app setup
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// using moment for footer copyright year.
let moment = require('moment');
app.locals.moment = moment;

//setting view engine
app.set('view engine', 'ejs');

//setup pending DB connection
const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//mongoose handler for connection to DB
let db = mongoose.connection;

//error callback
db.on('error', function (error) {
  console.log(`Connection Error: ${error.message}`)
});

//succesful callback
db.once('open', function () {
  console.log('Connected to DB...');
});

//this is my homepage view template endpoint handler
app.get('/', (req, res) => {
  res.render('pages/index');
});

//this is my gallery view template endpoint handler
app.get('/images', (req, res) => {
  Image.find(function (error, result) {
    if (error) {
      return console.log(error);
    }
    res.render('pages/images', {
      images: result
    });
  });
});

//this is my endpoint handler for clicking on an image in the gallery
app.get('/images/:id', (req, res) => {
  Image.findOne({
    id: req.params.id
  }, function (error, result) {
    if (error) {
      return console.log(error);
    }
    res.render('pages/image', {
      images: result
    });
  });
});

app.use(function (req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});