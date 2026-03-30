const jwt = require('jsonwebtoken')

function authToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token){
    return res.status(401).json({erreur: 'Non authentifié'});
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  }
  catch(err){
    return res.status(403).json({erreur: 'Token invalide ou expiré'});
  }
}

module.exports = authToken;
