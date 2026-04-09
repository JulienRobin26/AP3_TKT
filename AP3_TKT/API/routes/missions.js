const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_msn, libelle_msn, type_msn, dateDebut_msn, dateFin_msn FROM missions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/missions', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_msn, libelle_msn, type_msn, dateDebut_msn, dateFin_msn FROM missions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/modifier/:id', async (req, res) => {
  try {
    const { libelle_msn, type_msn, dateDebut_msn, dateFin_msn } = req.body;
    const [result] = await db.query(
      'UPDATE missions SET libelle_msn = COALESCE(?, libelle_msn), type_msn = COALESCE(?, type_msn), dateDebut_msn = COALESCE(?, dateDebut_msn), dateFin_msn = COALESCE(?, dateFin_msn) WHERE id_msn = ?',
      [libelle_msn, type_msn, dateDebut_msn, dateFin_msn, req.params.id]
    );
    res.json({ updated: result.affectedRows });
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/supprimer/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM missions WHERE id_msn = ?', [req.params.id]);
    res.json({ deleted: result.affectedRows });
  } catch (error) {
    console.error('Error deleting missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/ajouter', async (req, res) => {
  try {
    const { libelle_msn, type_msn, dateDebut_msn, dateFin_msn } = req.body;
    const [result] = await db.query(
      'INSERT INTO missions (libelle_msn, type_msn, dateDebut_msn, dateFin_msn) VALUES (?, ?, ?, ?)',
      [libelle_msn, type_msn, dateDebut_msn, dateFin_msn]
    );
    res.status(201).json({ id_msn: result.insertId });
  } catch (error) {
    console.error('Error creating missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
