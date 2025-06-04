import jwt from 'jsonwebtoken';

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalide' });
      }
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Accès refusé' });
      }
      req.user = decoded;
      next();
    });
  };
};

export default authorizeRole;
