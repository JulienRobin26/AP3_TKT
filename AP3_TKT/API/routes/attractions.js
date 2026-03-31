const express = require('express');
const router = express.Router();
const db = require('../config/db');

function toDbOuvert(value) {
  if (value === true || value === 1 || value === '1') return 1;
  if (value === 'on' || value === 'true' || value === 'ouvert') return 1;
  return 0;
}
 
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_ift, nom_ift, description_ift, image_ift, ouvert, tempsAttente, id_prc_ift FROM `infrastructure`');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_ift, nom_ift, description_ift, image_ift, ouvert, tempsAttente,tailleLimite, pourEnceinte, pourLesPetits, id_prc_ift FROM `infrastructure` WHERE id_prc_ift = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/ajout', async (req, res) => {
  try {
    const { nom, description, image, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits } = req.body;

    if (!nom) {
      return res.status(400).json({ error: 'Le nom est obligatoire' });
    }

    const [result] = await db.query(
      'INSERT INTO `infrastructure` (nom_ift, description_ift, image_ift, ouvert, tempsAttente, id_prc_ift, tailleLimite, pourEnceinte, pourLesPetits) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nom,
        description ?? '',
        image ?? '',
        toDbOuvert(ouvert),
        tempsAttente ?? '',
        parc ?? null,
        tailleLimite ?? null,
        toDbOuvert(pourEnceinte),
        toDbOuvert(pourLesPetits),
      ]
    );

    return res.status(201).json({ message: 'Attraction ajoutee', id: result.insertId });
  } catch (error) {
    console.error('Error adding infrastructure:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/modif', async (req, res) => {
  try {
    const id = req.body.id ?? req.body.id_ift ?? req.body.attractions;
    const { nom, description, image, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID attraction obligatoire' });
    }

    const [result] = await db.query(
      'UPDATE `infrastructure` SET nom_ift = ?, description_ift = ?, image_ift = ?, ouvert = ?, tempsAttente = ?, id_prc_ift = ?, tailleLimite = ?, pourEnceinte = ?, pourLesPetits = ? WHERE id_ift = ?',
      [
        nom ?? '',
        description ?? '',
        image ?? '',
        toDbOuvert(ouvert),
        tempsAttente ?? '',
        parc ?? null,
        tailleLimite ?? null,
        toDbOuvert(pourEnceinte),
        toDbOuvert(pourLesPetits),
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction introuvable' });
    }

    return res.json({ message: 'Attraction modifiee', id });
  } catch (error) {
    console.error('Error updating infrastructure:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/supprimer/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'ID attraction obligatoire' });
    }

    const [result] = await db.query('DELETE FROM `infrastructure` WHERE id_ift = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction introuvable' });
    }

    return res.json({ message: 'Attraction supprimee', id });
  } catch (error) {
    console.error('Error deleting infrastructure:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
module.exports = router;