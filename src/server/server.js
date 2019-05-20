require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const favoritesController = require('./controllers/FavoritesController');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// retrieve entries from apple_favorites database
app.get('/getFavorites', favoritesController.getFavorites, (req, res) => {
  return res.status(200).json({ favorites: res.locals.favorites });
});

// insert entry into apple_favorites database
app.post('/addFavorite', favoritesController.addFavorite, (req, res) => {
  return res.status(200).json({ 'new favorite added': res.locals.newFavorite })
});


app.listen(5000);
