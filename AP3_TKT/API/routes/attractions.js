const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const db = require('../config/db');

router.get('/', authToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_ift, nom_ift, description_ift, image_ift, ouvert, tempsAttente FROM `infrastructure`');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/parc/:id', authToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT  id_ift, nom_ift, description_ift, image_ift, ouvert, tempsAttente FROM `infrastructure` WHERE id_prc_ift = ?', [req.params.id]);
    return res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/attraction/:id', authToken, async (req, res) => {
  
  try{
    const [rows] = await db.query('SELECT id_ift, nom_ift, description_ift, image_ift FROM `infrastructure` WHERE id_ift = ?', [req.params.id]);
    if (!rows){
      return ('Attraction innexistante');
    }
    return res.json(rows);
  }
  catch (error) {
      console.error('Error fetching infrastructure:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }


});

module.exports = router;