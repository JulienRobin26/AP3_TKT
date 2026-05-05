const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const dbt = require('../config/db');

router.use(authToken);

/**
 * @swagger
 * tags:
 *   name: Groupe
 *   description: Gestion des équipes et des postes
 */

/**
 * @swagger
 * /groupe/equipes:
 *   get:
 *     summary: Récupérer toutes les équipes
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des équipes
 */
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

/**
 * @swagger
 * /groupe/equipe_id/{id}:
 *   get:
 *     summary: Récupérer une équipe par son ID
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'équipe
 */
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
/**
 * @swagger
 * /groupe/poste/{id}:
 *   get:
 *     summary: Récupérer les postes d'une équipe
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'équipe
 *     responses:
 *       200:
 *         description: Liste des postes
 */
router.get('/poste/:id', async (req, res) => {

  try {
    const [rows] = await dbt.query('SELECT id_pst, libelle_pst FROM poste WHERE id_eqp_pst = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.log("Erreur d'affichage du poste");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /groupe/ajouter:
 *   post:
 *     summary: Ajouter une nouvelle équipe
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *     responses:
 *       200:
 *         description: Équipe ajoutée
 */
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

/**
 * @swagger
 * /groupe/modifier/{id}:
 *   post:
 *     summary: Modifier une équipe
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *     responses:
 *       200:
 *         description: Équipe modifiée
 */
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

/**
 * @swagger
 * /groupe/supprimer/{id}:
 *   post:
 *     summary: Supprimer une équipe
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Équipe supprimée
 */
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

/**
 * @swagger
 * /groupe/voir_membre/{id}:
 *   get:
 *     summary: Voir les membres d'une équipe
 *     tags: [Groupe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des membres
 */
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
