const express = require('express');
const { body } = require('express-validator');

const login = require('../models/authenticator');
const authController = require('../controllers/authenticator');

const router = express.Router();

router.put('/signup', [
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email.')
		.custom((value, { req }) => {
			return login.findOne({ email: value }).then(userDoc => {
				if (userDoc) {
					return Promise.reject('Email address already exists!');
				}
			})
		})
		.normalizeEmail(),
	body('password').trim().isLength({ min: 5 }),
	body('name').trim().not().isEmpty()
], authController.signup);

router.post('/login', authController.login)

module.exports = router;