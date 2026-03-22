const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM `infrastructure`');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM `infrastructure` WHERE id_prc_ift = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;