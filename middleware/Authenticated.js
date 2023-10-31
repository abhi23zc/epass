const jwt = require('jsonwebtoken')

const secretKey = 'zrfisbest';
function isAuthenticated(req, res, next){
    const token = req.cookies.token;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
      });
}

module.exports = isAuthenticated;