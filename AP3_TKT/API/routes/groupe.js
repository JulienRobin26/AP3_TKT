const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const dbt = require('../config/db');

router.use(authToken);

router.get('/equipes', async (req, res) => {
  try {
    const [rows] = await dbt.query('SELECT id_eqp, libelle_eqp FROM equipes');
    res.json(rows);
  }
  catch (error) {
    console.log("Erreur d'affichage de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/equipe_id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [resultat] = await dbt.query('SELECT id_eqp, libelle_eqp FROM equipes WHERE id_eqp = ?', [id])
    res.json(resultat);
  }
  catch (error) {
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

router.post('/ajouter', async (req, res) => {
  const { libelle } = req.body;
  try {
    const [rows] = await dbt.query('INSERT INTO equipes (libelle_eqp) VALUE(?)', [libelle]);
    res.status(200).json({ message: "Succès" })
  }
  catch (error) {
    console.log("Erreur d'ajout de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/modifier/:id', async (req, res) => {
  const { id } = req.params
  const { libelle } = req.body;
  try {
    const [rows] = await dbt.query('UPDATE equipes SET libelle_eqp = ? WHERE id_eqp = ?', [libelle, id]);
    res.status(200).json({ message: "Succès" })
  }
  catch (error) {
    console.log("Erreur de modification de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/supprimer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await dbt.query('DELETE FROM equipes WHERE id_eqp = ?', [id]);
    res.status(200).json({ message: "Succès" })
  }
  catch (error) {
    console.log("Erreur de suppression de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/voir_membre/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await dbt.query(
      'SELECT users.id_usr, users.nom_usr AS nom, users.prenom_usr AS prenom, poste.libelle_pst AS poste, equipes.libelle_eqp AS equipe FROM users INNER JOIN poste ON users.id_pst_usr = poste.id_pst INNER JOIN equipes ON poste.id_eqp_pst = equipes.id_eqp WHERE poste.id_eqp_pst = ?', 
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log("Erreur d'affichage des membres de l'équipe");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
