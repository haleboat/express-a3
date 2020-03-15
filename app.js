const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const Image = require('./models/Images.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

var moment = require('moment');
app.locals.moment = moment;

app.set('view engine', 'ejs');

const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Connect to database. Mongoose handles the asynchronous aspects internally so we don't have to.
var db = mongoose.connection;

// Set a callback in case there's an error.
db.on('error', function (error) {
  console.log(`Connection Error: ${error.message}`)
});
// Set a callback to let us know we're successfully connected
db.once('open', function () {
  console.log('Connected to DB...');
});

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/images', (req, res) => {
  res.render('pages/images', {
    images
  })
});

app.get('/images/:id', (req, res) => {
  let photoID = `${req.params.id}`;
  images.forEach(image => {
    if (photoID === image.id.toString()) {
      res.render('pages/image', {
        image
      });
    }
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