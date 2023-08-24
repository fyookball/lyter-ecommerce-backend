
require('dotenv').config();
const User = require('../model/users').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, process.env.Secret, {
    expiresIn: maxAge
  })
}


exports.loginUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(404).send('No user');

 const auth = bcrypt.compare(req.body.password, user.password);
 const token = createToken(user._id);

 if(auth) {
    res.status(200).send({user, token});
 } else {
    res.status(404).send('incorrect password')
 }
}