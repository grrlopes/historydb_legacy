const express = require('express');
const { body } = require('express-validator');

const login = require('../models/authenticator');
const authController = require('../controllers/authenticator');

const check_auth = require('../middleware/token_auth');

const router = express.Router();

router.post('/signup', [
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
	body('name').isString().notEmpty()
		.matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
	body('surname').isString().notEmpty()
		.matches(/^[A-Za-z\s]+$/).withMessage('Surname must be alphabetic.'),
	body('login').trim().isLength({ min: 4 })
	.withMessage('Login must be at least 4 characters')
	.custom((value, { req }) => {
		return login.findOne({ login: value }).then(userDoc => {
			if (userDoc) {
				return Promise.reject('Login already exists!');
			}
		})
	}),
	body('password').trim().isLength({ min: 6 })
	.withMessage('Password must be at least 6 characters'),
], authController.signup);

router.post('/login', authController.login);

router.post('/logout', check_auth, authController.logout);

module.exports = router;