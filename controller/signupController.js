
const User = require('../model/users').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleErrors} = require('../middleWare/handleErrors')





exports.createUser = async (req, res) => {
 
  console.log(req.body);

  try {


    if(req.body.password.length < 6) {
      const errors = handleErrors({message: "password less than six"});
      res.status(404).send( errors );
    }

    //const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        isAdmin: false,
        balance: 0
    })
    user = await user.save();
    if(!user)
    return res.status(400).send('the user cannot be created!')
  
    res.status(200).send("Account created");

  } catch (error) {
    // Call handleErrors function
    const errors = handleErrors(error);
    console.log(errors, "checking errors");
    res.status(404).send( errors );
  }

}