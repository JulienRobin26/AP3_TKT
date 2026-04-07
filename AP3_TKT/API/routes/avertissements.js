const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM niveaualerte');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`Select id_alr, contenu_alr , dateCréation, prenom_usr, nom_usr from users join alerte on id_usr = id_usr_alr  inner join niveaualerte on id_nv = id_nv_alr where id_nv = ?`, [req.params.id]);
    res.json(rows);
  } catch (error) { 
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/alertes/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`Select contenu_alr from alerte where id_alr = ?`, [req.params.id]);
    res.json(rows);
  } catch (error) { 
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/ajout', authToken, async (req, res) => {
  try {
    const { description, idAvertissement } = req.body;
    console.log(description, idAvertissement);
    await db.query('INSERT INTO alerte (contenu_alr,id_usr_alr,id_nv_alr,dateCréation) VALUES (?, ?, ?, NOW())', [description, req.user.id, idAvertissement]);
    res.status(201).json({ message: 'Alerte ajoutée avec succès' });
  } catch (error) {
    console.error('Error adding alert:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/modif', authToken, async (req, res) => {
  try {
    const { description, id } = req.body;
    console.log(description, id);
    await db.query('Update alerte set contenu_alr = ? where id_alr = ?', [description, id]);
    res.status(201).json({ message: 'Alerte modifiée avec succès' });
  } catch (error) {
    console.error('Error modifying alert:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/suppr/:id', authToken, async (req, res) => {
  try {
    await db.query('Delete from alerte where id_alr = ?', [req.params.id]);
    res.status(201).json({ message: 'Alerte supprimée avec succès' });
  } catch (error) {
    console.error('Error supprimant alert:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;