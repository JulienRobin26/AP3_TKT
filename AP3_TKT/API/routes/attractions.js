const express = require('express');
const router = express.Router();
const db = require('../db');
const authToken = require('../auth_token');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jeux');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jeux WHERE id_jeux = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;