require("dotenv").config();
const mongoose = require("mongoose");
const { isEmail } = require('validator');


const userSchema = mongoose.Schema({
    dateandtime : {type: Date, default: Date.now},
    email: {
         type: String, 
         required: [true, 'Please  enter an email'],
         unique: true,
         lowercase: true,
         validate: [isEmail, 'Please enter a valid email']
        },
    password: {
        type: String, 
        required: [true, 'Enter password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    
    isAdmin: {type: Boolean, default: false},
    balance: {type: Number}
});

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
})
  
userSchema.set('toJSON', {
      virtual: true,
})

module.exports = {
    User: mongoose.model("User", userSchema ),
    userSchema: userSchema
}
