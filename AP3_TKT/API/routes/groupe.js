const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const dbt = require('../config/db');

router.get('/equipe', async (req, res) => {
  try {
    const [rows] = await dbt.query('SELECT id_eqp, libelle_eqp FROM equipes'); 
    res.json(rows);
  }
    catch(error){
        console.log("Erreur d'affichage de l'équipe");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/poste/:id', async (req, res) => {
    try {
      const [rows] = await dbt.query('SELECT id_pst, libelle_pst FROM poste WHERE id_eqp_pst = ?', [req.params.id]);
      res.json(rows);
    } catch (error) {
      console.log("Erreur d'affichage du poste");
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
