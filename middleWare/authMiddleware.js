require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model-database/models/users");

const requireAuth = (req, res, next) => {
  const token = req.body.jwt;

  const authHeader = req.headers["authorization"];

  // Check if the header exists and has the Bearer token format
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token part (remove 'Bearer ' from the header)
    const token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.Secret, async (err, decodedToken) => {
        if (err) {
          res.status(403).send("Token is not correct");
        } else {
          let user = await User.findById(decodedToken.id);
          res.send(user);
          next();
        }
      });
    } else {
      res.status(403).send("No Token");
    }
  }
};

/*
 const checkUser =  (req, res, next) => {
   const token = req.body.jwt;

   if(token) {
     jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if(err){
        res.status(403).send('Token is not correct');
      } else {
        let user = await User.findById(decodedToken.id);
        res.send(user);
        next();
      }

     })
   } else {
    res.status(403).send('No Token');
   }
 }
 */

module.exports = { requireAuth };
