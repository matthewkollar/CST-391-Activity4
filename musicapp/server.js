const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'music2'
});

// GET all albums
app.get('/albums', (req, res) => {
  const query = `
    SELECT albums.*, artists.name AS artist
    FROM albums
    JOIN artists ON albums.artist_id = artists.id
  `;
  pool.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET album by ID
app.get('/albums/:id', (req, res) => {
  const albumId = req.params.id;
  const query = `
    SELECT albums.*, artists.name AS artist
    FROM albums
    JOIN artists ON albums.artist_id = artists.id
    WHERE albums.id = ?
  `;
  pool.query(query, [albumId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// GET tracks for album
app.get('/tracks/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const query = `
    SELECT track_title, number
    FROM tracks
    WHERE albums_id = ?
    ORDER BY number ASC
  `;
  pool.query(query, [albumId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET albums by artist name
app.get('/albums/artist/:artist', (req, res) => {
  const artist = req.params.artist;
  const query = `
    SELECT albums.*, artists.name AS artist
    FROM albums
    JOIN artists ON albums.artist_id = artists.id
    WHERE artists.name = ?
  `;
  pool.query(query, [artist], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET all artists
app.get('/artists', (req, res) => {
  pool.query('SELECT id, name AS artist FROM artists', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Create new album
app.post('/albums', (req, res) => {
  const { album_title, artist_id, year, image_name, description, tracks_ID } = req.body;
  const query = 'INSERT INTO albums (album_title, artist_id, year, image_name, description, tracks_ID) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [album_title, artist_id, year, image_name, description, tracks_ID], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Album created', albumId: result.insertId });
  });
});

// Update album
app.put('/albums', (req, res) => {
  const { id, album_title, artist_id, year, image_name, description, tracks_ID } = req.body;
  const query = 'UPDATE albums SET album_title = ?, artist_id = ?, year = ?, image_name = ?, description = ?, tracks_ID = ? WHERE id = ?';
  pool.query(query, [album_title, artist_id, year, image_name, description, tracks_ID, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Album updated' });
  });
});

// Delete album
app.delete('/albums/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM albums WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Album deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`🎵 Music API server running at http://127.0.0.1:${PORT}`);
});
