const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const dbt = require('../config/db');

router.get('/equipes',authToken, async (req, res) => {
  try {
    const [rows] = await dbt.query('SELECT id_eqp, libelle_eqp FROM equipes'); 
    res.json(rows);
  }
    catch(error){
        console.log("Erreur d'affichage de l'équipe");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('equipe_id/:id', authToken, async (req, res) =>
{
  const id = req.params;
  try{
    const [resultat] = await dbt.query('SELECT id_eqp, libelle_eqp FROM equipes WHERE id_eqp = ?', [id])
    res.json(resultat);
  }
  catch(error){
    console.log("Erreur d'affichage de l'équipe");
      res.status(500).json({ error: 'Internal Server Error' });
  }

});
router.get('/poste/:id', authToken, async (req, res) => {
    try {
      const [rows] = await dbt.query('SELECT id_pst, libelle_pst FROM poste WHERE id_eqp_pst = ?', [req.params.id]);
      res.json(rows);
    } catch (error) {
      console.log("Erreur d'affichage du poste");
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/ajouter', authToken,async (req, res) =>{
  const {libelle} = req.body;
  try{
    const [rows] = await dbt.query('INSERT INTO equipes (libelle_eqp) VALUE(?)', [libelle]);
  }
  catch (error){
    console.log("Erreur d'ajout de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/modifier/:id', authToken, async (req, res) =>{
  const {id} = req.params
  const {libelle} = req.body;
  try{
    const [rows] = await dbt.query('UPDATE equipes SET libelle_eqp = ? WHERE id_eqp = ?', [libelle,id]);
  }
  catch (error){
    console.log("Erreur de modification de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/supprimer/:id', authToken, async (req, res) =>{
  const {id} = req.params;
  try{
    const [rows] = await dbt.query('DELETE equipes WHERE id_eqp = ?', [id]);
  }
  catch (error){
    console.log("Erreur de suppression de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
