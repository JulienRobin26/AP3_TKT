const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');

router.use(authToken);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs (ID, Nom, Prénom)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', async (req, res) => {

  try {
    const [rows] = await db.query('SELECT id_usr, nom_usr, prenom_usr FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /users/user_by_team/{id_eqp}:
 *   get:
 *     summary: Récupérer les utilisateurs d'une équipe spécifique
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_eqp
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des utilisateurs de l'équipe
 */
router.get('/user_by_team/:id_eqp', async (req, res) => {

  try {
    const [rows] = await db.query(
      'SELECT id_usr, nom_usr, prenom_usr FROM users INNER JOIN poste ON users.id_pst_usr = poste.id_pst INNER JOIN equipes ON poste.id_eqp_pst = equipes.id_eqp WHERE equipes.id_eqp = ?',
      [req.params.id_eqp]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users by team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /users/utilisateurs:
 *   get:
 *     summary: Récupérer la liste complète des utilisateurs avec détails
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste détaillée des utilisateurs
 */
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

/**
 * @swagger
 * /users/affichage/{id}:
 *   get:
 *     summary: Récupérer les détails d'un utilisateur par son ID
 *     tags: [Users]
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
 *         description: Détails de l'utilisateur
 */
router.get('/affichage/:id', async (req, res) => {

  try {
    const [rows] = await db.query(
      'SELECT users.id_usr, users.prenom_usr, users.nom_usr, users.email_usr, users.id_pst_usr, poste.id_eqp_pst FROM users LEFT JOIN poste ON users.id_pst_usr = poste.id_pst WHERE users.id_usr = ?',
      [req.params.id]
    );
    res.json(rows);
  }
  catch(error){
    console.log("Erreur d'afichage de l'utilisateur");
    res.status(500).json({ error: 'Utilisateur introuvable' });
  }
});


/**
 * @swagger
 * /users/modifier/{id}:
 *   post:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
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
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               poste:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */
router.post('/modifier/:id', async (req, res) => {

  try {
    const { nom, prenom, poste } = req.body;
    const updates = [];
    const params = [];

    if (nom !== undefined) {
      updates.push('nom_usr = ?');
      params.push(nom);
    }
    if (prenom !== undefined) {
      updates.push('prenom_usr = ?');
      params.push(prenom);
    }
    if (poste !== undefined && poste !== "") {
      updates.push('id_pst_usr = ?');
      params.push(poste);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucun champ a modifier' });
    }

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id_usr = ?`;
    params.push(req.params.id);
    const [result] = await db.query(sql, params);
    res.json({ updated: result.affectedRows });
  } catch (error) {
    console.error('Error update user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/**
 * @swagger
 * /users/supprimer:
 *   post:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.post('/supprimer', async (req, res) => {

  const { id } = req.body;
  try {
    const [rows] = await db.query('DELETE FROM users WHERE id_usr = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching suppresion Error:', error);
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
