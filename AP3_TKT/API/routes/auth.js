const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const dbt = require('../config/db');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/login', async (req, res) => {
  const {identifiant, password} = req.body;
  try {
    const [rows] = await dbt.query('SELECT id_usr, login_usr, mdp_usr,role_usr FROM users WHERE login_usr = ?', [req.body.identifiant]);
    let user = rows.length > 0 ? rows[0] : null;
    
    if (!user){
      return res.status(401).json({erreur: "Utilisateur introuvable"});
    }
    const pass_db = user.mdp_usr;
    const valider = await bcrypt.compare(password, pass_db);

    if (valider){
      const token = jwt.sign(
      {id:user.id_usr, identifiant: user.login_usr, role:user.role_usr},
      process.env.JWT_SECRET,
      {expiresIn: "2min"})

      res.cookie('token', token, {httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000      }

      );
      return res.json({message: "Connexion réussie"});
    
    }
    return res.status(401).json({erreur: "Mot de passe incorrect"});
    
  } catch (error) {
    console.error('Error fetching auth:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







router.post('/signup', authToken, async (req, res) => {
  const {identifiant, password} = req.body;
  try {
    const password_hash = await bcrypt.hash(password, saltRounds);
    const [rows] = await dbt.query('INSERT INTO users (login_usr, mdp_usr) VALUES (?, ?)', [identifiant, password_hash]);
    res.json(password_hash)
    //res.json({message: "Utilisateur créé avec succès", userId: rows.insertId});
  } catch (error) {
    console.error('Error fetching auth:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/logout', authToken, (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: 'Aucun token trouvé' });
  }
  res.clearCookie('token');
  res.json({ message: 'Déconnecté' });
});

router.get('/recup_infos', authToken, async (req, res) => {

  return res.json({user:req.user});
});
module.exports = router;

