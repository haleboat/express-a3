const path = require('path');
const express = require('express');
const images = require('./public/gallery');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

var moment = require('moment');
app.locals.moment = moment;

app.set('view engine', 'ejs');

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