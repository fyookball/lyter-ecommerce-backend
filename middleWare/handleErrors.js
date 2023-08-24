
 const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  if (err.message === 'password less than six') {
    errors.password = 'That password is too short';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
     //console.log(err, "err");
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      //console.log(properties, "prp");
      errors[properties.path] = properties.message;
    });
  }
   console.log(errors);
   return errors;
  }
  
  
module.exports = {handleErrors};