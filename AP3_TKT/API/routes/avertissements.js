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
    const [rows] = await db.query(`Select id_alr, nom_usr, prenom_usr, dateCréation, contenu_alr 
      from alerte 
      inner join users on id_usr_alr = id_usr_alr 
      inner join niveaualerte on id_nv_alr = id_nv 
      where id_nv_alr = ? and id_usr_alr = id_usr`, [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;