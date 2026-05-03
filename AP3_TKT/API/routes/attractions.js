const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/attractions/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

router.use(authToken);

function toDbOuvert(value) {
  if (value === true || value === 1 || value === '1') return 1;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'on' || normalized === 'true' || normalized === 'yes') return 1;
  }
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
router.get('/id/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_ift, nom_ift, description_ift, image_ift, ouvert, tempsAttente,tailleLimite, pourEnceinte, pourLesPetits, id_prc_ift FROM `infrastructure` WHERE id_ift = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/ajout', upload.single('image'), async (req, res) => {
  try {
    const { nom, description, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits } = req.body;
    
    // Si un fichier a été uploadé, on prend son nom, sinon on prend la valeur texte (si elle existe encore)
    const image = req.file ? req.file.filename : (req.body.image || '');

    if (!nom) {
      return res.status(400).json({ error: 'Le nom est obligatoire' });
    }

    const [result] = await db.query(
      'INSERT INTO `infrastructure` (nom_ift, description_ift, image_ift, ouvert, tempsAttente, id_prc_ift, tailleLimite, pourEnceinte, pourLesPetits) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nom,
        description ?? '',
        image,
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

router.post('/modif', upload.single('image'), async (req, res) => {
  try {
    const id = req.body.id ?? req.body.id_ift ?? req.body.attractions;
    const { nom, description, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'ID attraction obligatoire' });
    }

    // Récupérer l'ancienne image pour garder la valeur si on ne change pas la photo
    const [oldRows] = await db.query('SELECT image_ift FROM `infrastructure` WHERE id_ift = ?', [id]);
    const oldImage = oldRows.length > 0 ? oldRows[0].image_ift : '';

    let image = oldImage;
    if (req.file) {
      image = req.file.filename;
      // Supprimer l'ancienne image du disque si elle existe et n'est pas une URL externe
      if (oldImage && !oldImage.startsWith('http')) {
        const oldPath = path.join(__dirname, '..', 'public', 'uploads', 'attractions', oldImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    } else if (req.body.image) {
       image = req.body.image;
    }

    const [result] = await db.query(
      'UPDATE `infrastructure` SET nom_ift = ?, description_ift = ?, image_ift = ?, ouvert = ?, tempsAttente = ?, id_prc_ift = ?, tailleLimite = ?, pourEnceinte = ?, pourLesPetits = ? WHERE id_ift = ?',
      [
        nom ?? '',
        description ?? '',
        image,
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

    // Récupérer le nom de l'image avant de supprimer
    const [rows] = await db.query('SELECT image_ift FROM `infrastructure` WHERE id_ift = ?', [id]);
    if (rows.length > 0) {
      const image = rows[0].image_ift;
      if (image && !image.startsWith('http')) {
        const imagePath = path.join(__dirname, '..', 'public', 'uploads', 'attractions', image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
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
