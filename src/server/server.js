require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const favoritesController = require('./controllers/FavoritesController');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname + '/../../dist'));

app.get('/getFavorites', favoritesController.getFavorites, (req, res) => {
  return res.status(200).json({ favorites: res.locals.favorites });
});

app.post('/addFavorite', favoritesController.addFavorite, (req, res) => {
  return res.status(200).json({ 'new favorite added': res.locals.newFavorite })
});


app.listen(5000);
