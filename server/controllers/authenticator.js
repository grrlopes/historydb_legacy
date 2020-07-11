const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/authenticator');

exports.signup = (req, res, next) => {
  const erros = validationResult(req);
  try {
    if (!erros.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error._custom = erros.array();
      throw error;
    }
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        name: name,
        surname: surname,
        username: username,
        password: hashedPw
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'You have signed up successfully', userId: result._id
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
  }catch(error){
    res.status(422).json({
      message: error
    })
  }
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        const error = new Error('Login do not match!');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          username: loadedUser.username,
          userId: loadedUser._id.toString()
        },
        process.env.JWT_KEY,
        { expiresIn: '29d' }
      );
      loadedUser.tokens = loadedUser.tokens.push({ token })
      User.findOne({ username: username }).then(user => {
        user.tokens = loadedUser.tokens
        user.save()
      });
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        message: 'success' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
};

exports.logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.status(200).json({ message: 'Success Logout!!'});
  } catch(e) {
    res.status(500).send()
  }
}