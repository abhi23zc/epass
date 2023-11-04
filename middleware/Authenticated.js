const jwt = require('jsonwebtoken')

const secretKey = 'zrfisbest';
function isAuthenticated(req, res, next){
  
    const {token} = req.headers;
    console.log(token)
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          
          return res.json({ message: 'error'});
        }
        req.user = decoded;
        next();
      });
}

module.exports = isAuthenticated;