const pgClient = require('../models/database');

function getFavorites(req, res, next) {
  const getFavoritesStr = 'SELECT kind, id, name, artwork, genre, url FROM apple_favorites';
  pgClient.query(getFavoritesStr, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to retrieve favorites' });
    res.locals.favorites = result.rows;
    next();
  });
}

function addFavorite(req, res, next) {
  const {
    kind,
    id,
    name,
    artwork,
    genre,
    url,
  } = req.body;
  const values = [kind, id, name, artwork, genre, url];
  const addFavoriteStr = 'INSERT INTO apple_favorites(kind, id, name, artwork, genre, url) VALUES ($1, $2, $3, $4, $5, $6);';
  pgClient.query(addFavoriteStr, values, (err, result) => {
    if (err) return res.status(400).json({ error: 'Unable to add favorite' });
    res.locals.newFavorite = result;
    next();
  });
}

module.exports = { getFavorites, addFavorite };
