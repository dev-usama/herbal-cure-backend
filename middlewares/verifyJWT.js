const jwt = require('jsonwebtoken');

let verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  try {
    let secretKey = process.env.TOKEN_SECRET;
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      next();
    }else{
      res.status(401).json({ message: 'Invalid Token' });
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = verifyJWT;