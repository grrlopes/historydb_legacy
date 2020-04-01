const Commands = require('../models/commands');

exports.getCommands = (req, res, next) => {
	Commands.find()
		.then(result => {
			res.json({ data: result });
		})
		.catch()
};

exports.getCommand = (req, res, next) => {
	id = req.body.id;
	Commands.findById({_id: id})
		.then(result => {
			res.json({data: result})
		})
		.catch()
}