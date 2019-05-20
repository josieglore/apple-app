-- APPLE_FAVORITES TABLE

-- Deletes the apple_favorites table
DROP TABLE apple_favorites;

-- Creates the apple_favorites table
CREATE TABLE apple_favorites(
  favorite_id SERIAL PRIMARY KEY,
  kind VARCHAR,
  id INTEGER,
  name VARCHAR,
  artwork VARCHAR,
  genre VARCHAR,
  url VARCHAR
);

-- Retrieves the kind, name, artwork url, genre, and iTunes url for all favorites in the apple_favorites table
SELECT kind, id, name, artwork, genre, url FROM apple_favorites

-- Inserts new row into apple_favorites table
INSERT INTO apple_favorites(kind, id, name, artwork, genre, url) VALUES ('song', 879273570, 'Good People', 'https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/30x30bb.jpg', 'Rock', 'https://itunes.apple.com/us/album/good-people/879273552?i=879273570&uo=4');