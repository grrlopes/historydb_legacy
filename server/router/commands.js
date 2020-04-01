const express = require('express');

const CommandController = require('../controllers/commands');

const router = express.Router();

router.get('/commands', CommandController.getCommands);

router.get('/command', CommandController.getCommand);

module.exports = router;