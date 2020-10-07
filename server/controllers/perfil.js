const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/authenticator");

exports.perfilupdate = async (req, res, next) => {
  const errors = validationResult(req);
  const { password } = req.body;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error._custom = errors.array();
      throw error;
    }

    const userPass = await User.findOne({ _id: req.userId });
    const newpass = await bcrypt.hash(password, 12);
    userPass.password = newpass;
    userPass.save();

    res.status(201).json({ message: "Password has changed!" });
  } catch (error) {
    res.status(422).json({
      message: error,
    });
  }
};
