const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authToken = require('../auth_token');

router.use(authToken);

async function getAssignedMissionsForUser(userId) {
  const [rows] = await db.query(
    `
      SELECT DISTINCT m.*, e.libelle_eqp
      FROM missions m
      INNER JOIN users u ON u.id_msn_usr = m.id_msn
      LEFT JOIN equipes e ON m.id_eqp_msn = e.id_eqp
      WHERE u.id_usr = ? AND m.status_msn = 0
    `,
    [userId]
  );

  return rows;
}

async function getAssignedMissionByIdForUser(userId, missionId) {
  const [rows] = await db.query(
    `
      SELECT m.*, e.libelle_eqp
      FROM missions m
      INNER JOIN users u ON u.id_msn_usr = m.id_msn
      LEFT JOIN equipes e ON m.id_eqp_msn = e.id_eqp
      WHERE u.id_usr = ? AND m.id_msn = ? AND m.status_msn = 0
    `,
    [userId, missionId]
  );

  return rows[0] || null;
}

router.get('/equipe_missions/:id', async (req, res) => {
  try {
    const id_msn = req.params.id;
    const [rows] = await db.query(
      'SELECT e.id_eqp, e.libelle_eqp FROM equipes e INNER JOIN missions m ON e.id_eqp = m.id_eqp_msn WHERE m.id_msn = ?',
      [id_msn]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching equipe missions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, e.libelle_eqp,
        (SELECT COUNT(*) FROM users u WHERE u.id_msn_usr = m.id_msn) AS nb_assigned
      FROM missions m
      LEFT JOIN equipes e ON m.id_eqp_msn = e.id_eqp
      WHERE m.status_msn = 0
    `);

    res.json(rows);
  } catch (error) {
    console.error('SQL ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/mes-missions', async (req, res) => {
  try {
    const userId = req.user.id;
    const rows = await getAssignedMissionsForUser(userId);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching assigned missions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/mes-missions/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const mission = await getAssignedMissionByIdForUser(userId, req.params.id);

    if (!mission) {
      return res.status(404).json({ error: 'Mission not assigned to this user' });
    }

    res.json(mission);
  } catch (err) {
    console.error('Error fetching one assigned mission:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/valider/:id', async (req, res) => {
  try {
    const id_msn = req.params.id;
    const userId = req.user.id;
    const mission = await getAssignedMissionByIdForUser(userId, id_msn);

    if (!mission) {
      return res.status(403).json({ error: 'Mission not assigned to this user' });
    }

    await db.query(
      'UPDATE missions SET dateFin_msn = CURRENT_DATE(), status_msn = 1 WHERE id_msn = ?',
      [id_msn]
    );
    await db.query('UPDATE users SET id_msn_usr = NULL WHERE id_msn_usr = ?', [id_msn]);

    res.json({ message: 'Mission validee et terminee' });
  } catch (err) {
    console.error('Error validation mission:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `
        SELECT m.*, e.libelle_eqp
        FROM missions m
        LEFT JOIN equipes e ON m.id_eqp_msn = e.id_eqp
        WHERE m.id_msn = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Mission non trouvee' });
    }

    const [users] = await db.query(
      'SELECT id_usr, nom_usr, prenom_usr FROM users WHERE id_msn_usr = ?',
      [req.params.id]
    );

    res.json({ ...rows[0], utilisateurs_assignes: users });
  } catch (error) {
    console.error('Error fetching mission by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/ajouter', async (req, res) => {
  try {
    const { libelle_msn, type_msn, dateDebut_msn, id_eqp_msn } = req.body;
    const [result] = await db.query(
      'INSERT INTO missions (libelle_msn, type_msn, dateDebut_msn, id_eqp_msn, status_msn) VALUES (?, ?, ?, ?, 0)',
      [libelle_msn, type_msn, dateDebut_msn, id_eqp_msn ?? null]
    );
    res.status(201).json({ id_msn: result.insertId });
  } catch (error) {
    console.error('Error creating missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/modifier', async (req, res) => {
  try {
    const { id_msn, libelle_msn, type_msn, dateDebut_msn, id_eqp_msn } = req.body;
    const [assigned] = await db.query(
      'SELECT COUNT(*) as nb FROM users WHERE id_msn_usr = ?',
      [id_msn]
    );

    if (assigned[0].nb > 0) {
      return res.status(403).json({ error: 'Mission deja assignee, modification impossible' });
    }

    const [result] = await db.query(
      'UPDATE missions SET libelle_msn = ?, type_msn = ?, dateDebut_msn = ?, id_eqp_msn = ? WHERE id_msn = ?',
      [libelle_msn, type_msn, dateDebut_msn, id_eqp_msn || null, id_msn]
    );

    res.json({ updated: result.affectedRows });
  } catch (error) {
    console.error('Error modifying mission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/supprimer/:id', async (req, res) => {
  try {
    const [assigned] = await db.query(
      'SELECT COUNT(*) as nb FROM users WHERE id_msn_usr = ?',
      [req.params.id]
    );

    if (assigned[0].nb > 0) {
      return res.status(403).json({ error: 'Mission deja assignee, suppression impossible' });
    }

    const [result] = await db.query('DELETE FROM missions WHERE id_msn = ?', [req.params.id]);
    res.json({ deleted: result.affectedRows });
  } catch (error) {
    console.error('Error deleting missions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/utilisateurs-equipe/:id_equipe', async (req, res) => {
  try {
    const id_equipe = req.params.id_equipe;
    const [rows] = await db.query(
      'SELECT u.id_usr, u.nom_usr, u.prenom_usr, u.id_msn_usr FROM users u INNER JOIN poste p ON u.id_pst_usr = p.id_pst WHERE p.id_eqp_pst = ?',
      [id_equipe]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users by team:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/affecter/:id', async (req, res) => {
  try {
    const id_msn = req.params.id;
    const { userIds } = req.body;
    const [assigned] = await db.query(
      'SELECT COUNT(*) as nb FROM users WHERE id_msn_usr = ?',
      [id_msn]
    );

    if (assigned[0].nb > 0) {
      return res.status(403).json({ error: 'Mission deja assignee, reassignation impossible' });
    }

    if (Array.isArray(userIds) && userIds.length > 0) {
      const placeholders = userIds.map(() => '?').join(',');
      await db.query(
        `UPDATE users SET id_msn_usr = ? WHERE id_usr IN (${placeholders})`,
        [id_msn, ...userIds]
      );
    }

    res.json({ message: 'Affectation reussie' });
  } catch (err) {
    console.error('Error affecting mission:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
