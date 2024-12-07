const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next(); 
    });
  
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = authenticateToken