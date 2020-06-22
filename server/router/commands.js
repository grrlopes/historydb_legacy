const express = require('express');

const CommandController = require('../controllers/commands');
const check_auth = require('../middleware/token_auth');

const router = express.Router();

router.get('/commands', check_auth, CommandController.getCommands);

router.get('/command', CommandController.getCommand);

router.get('/commandsSearch', CommandController.getCommandsSearch);

router.put('/addcommand', CommandController.addCommand);

module.exports = router;