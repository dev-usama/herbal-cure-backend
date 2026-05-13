const jwt = require('jsonwebtoken');

let verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    res.status(401).json({message: 'Unauthorized'})
  }
  try {
    let secretKey = process.env.TOKEN_SECRET;
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      req.user = decoded;
      next();
    }else{
      res.status(401).json({ message: 'Invalid Token' });
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = verifyJWT;