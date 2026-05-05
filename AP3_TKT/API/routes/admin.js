const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');

router.use(authToken);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Opérations administratives (ex. nourriture)
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Récupérer tous les produits alimentaires
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de nourriture
 */
router.get('/', async (req, res) => {
/**
 * @swagger
 * /admin/{libelle}:
 *   get:
 *     summary: Rechercher de la nourriture par libellé
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: libelle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 */

  try {
    const [rows] = await db.query('SELECT * FROM nourriture');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:libelle', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM nourriture WHERE libelle_food like "$?$"', [req.params.libelle]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jeux:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
