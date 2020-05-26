const jwt = require('jsonwebtoken');

authentication = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    res.end();
  } else {
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);

      req.user = decoded;

      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'Invalid Token' });
    }
  }
};

module.exports = authentication;
