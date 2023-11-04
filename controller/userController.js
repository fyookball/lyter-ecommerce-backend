const User = require("../model-database/models/users");
const ErrorResponse = require("../utils/errorResponse");
const { sequelize } = require("sequelize");

exports.updateUser = async (req, res, next) => {
  console.log(req.body, "req.body");
  console.log(req.file, "file request");

  const file = req.file;
  if (!file) return next(new ErrorResponse("no image file uploaded", 401));

  const fileName = file.originalname;
  const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

  var objForUpdate = {};

  if (req.body.email) objForUpdate.email = req.body.email;
  if (req.body.avatar) objForUpdate.avatar = `${basePath}${fileName}`;
  if (req.body.city) objForUpdate.city = req.body.city;
  if (req.body.address) objForUpdate.address = req.body.address;
  if (req.body.mobile) objForUpdate.mobile = req.body.mobile;

  try {
    await User.update(objForUpdate, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({ status: true, message: "User updated" });
  } catch {
    next(error);
  }
};

exports.topUp = async (req, res, next) => {
  const objForUpdate = {};

  if (req.body.usdc) {
    objForUpdate.balanceUsdc = sequelize.literal(
      `balanceUsdc + ${req.body.usdc}`
    );
  }
  if (req.body.usdt) {
    objForUpdate.balanceUsdt = sequelize.literal(
      `balanceUsdt + ${req.body.usdt}`
    );
  }

  try {
    await User.update(objForUpdate, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({ status: true, message: "User balance updated" });
  } catch (error) {
    next(error);
  }
};
