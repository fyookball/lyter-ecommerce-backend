const User = require("../model-database/models/users");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");
const { createToken } = require("../utils/Token");

exports.createUser = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    //const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      name: name,
      password: hashedPassword,
      balanceUsdt: 0,
      balanceUsdc: 0,
    });

    if (!user)
      return next(new ErrorResponse("the user cannot be created!", 401));

    res.status(200).json({ status: true, message: "Account created" });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userCheck = await User.findOne({ Where: { email: email } });
    if (!userCheck) return next(new ErrorResponse("User not found", 401));

    const auth = await bcrypt.compare(password, userCheck.dataValues.password);
    if (!auth) return next(new ErrorResponse("incorrect password"));

    const token = createToken(userCheck.dataValues.id);
    const user = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ status: true, data: user, token: token });
  } catch (error) {
    next(error);
  }
};
