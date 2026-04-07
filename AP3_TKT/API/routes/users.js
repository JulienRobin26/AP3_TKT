const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_usr, nom_usr, prenom_usr FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/utilisateurs', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id_usr AS id, nom_usr AS nom, prenom_usr AS prenom, email_usr AS email, libelle_pst AS poste, libelle_eqp AS equipe FROM users INNER JOIN poste ON users.id_pst_usr = poste.id_pst INNER JOIN equipes ON poste.id_eqp_pst = equipes.id_eqp'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/affichage/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_usr, prenom_usr, nom_usr, email_usr FROM users WHERE id_usr = ?', [req.params.id]);
    res.json(rows);
  }
  catch(error){
    console.log("Erreur d'afichage de l'utilisateur");
    res.status(500).json({ error: 'Utilisateur introuvable' });
  }
});


router.post('/modifier/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM nourriture WHERE libelle_food like "$?$"', [req.params.libelle]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/supprimer/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM nourriture WHERE libelle_food like "$?$"', [req.params.libelle]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/ajouter', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM nourriture WHERE libelle_food like "$?$"', [req.params.libelle]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
