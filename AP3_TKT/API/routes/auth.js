const express = require('express');
const router = express.Router();
const authToken = require('../auth_token');
const dbt = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/login', async (req, res) => {
  const { identifiant, password } = req.body;

  try {
    const [rows] = await dbt.query(
      'SELECT id_usr, login_usr, mdp_usr, role_usr FROM users WHERE login_usr = ?',
      [identifiant]
    );
    const user = rows.length > 0 ? rows[0] : null;

    if (!user) {
      return res.status(401).json({ erreur: 'Utilisateur introuvable' });
    }

    const valider = await bcrypt.compare(password, user.mdp_usr);
    if (!valider) {
      return res.status(401).json({ erreur: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id_usr, identifiant: user.login_usr, role: user.role_usr },
      process.env.JWT_SECRET,
      { expiresIn: '20min' }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 20 * 60 * 1000,
    });

    return res.json({
      message: 'Connexion reussie',
      user: {
        id: user.id_usr,
        identifiant: user.login_usr,
        role: user.role_usr,
      },
    });
  } catch (error) {
    console.error('Error fetching auth:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.use(authToken);

router.post('/signup', async (req, res) => {
  const { identifiant, password, nom, prenom, email, tel, num_poste, role } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, saltRounds);
    await dbt.query(
      'INSERT INTO users (login_usr, mdp_usr, nom_usr, prenom_usr, email_usr, num_usr, id_pst_usr, role_usr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [identifiant, password_hash, nom, prenom, email, tel, num_poste, role]
    );
    res.json(password_hash);
  } catch (error) {
    console.error('Error fetching auth:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: 'Aucun token trouve' });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  });

  return res.json({ message: 'Deconnecte' });
});

router.get('/recup_infos', async (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
