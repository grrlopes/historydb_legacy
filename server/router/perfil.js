const express = require('express');
const { body } = require('express-validator');

const perfilController = require('../controllers/perfil');

const check_auth = require('../middleware/token_auth');

const router = express.Router();

router.put('/perfilupdate', check_auth, [
  body('confirm_password').trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
], perfilController.perfilupdate);

module.exports = router;
