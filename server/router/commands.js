const express = require('express');

const CommandController = require('../controllers/commands');
const check_auth = require('../middleware/token_auth');

const router = express.Router();

router.get('/commands', CommandController.getCommands);

router.get('/command', CommandController.getCommand);

router.get('/commandsSearch', check_auth, CommandController.getCommandsSearch);

router.put('/addcommand', check_auth, CommandController.addCommand);

router.post('/newRegCommand', check_auth, CommandController.newRegisterCommand);

module.exports = router;
