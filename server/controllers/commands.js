const Commands = require('../models/commands');

exports.getCommands = (req, res, next) => {
	const currentPage = req.query.page;
	const limit = req.query.limit;
	const start = req.query.start;
	let total;
	Commands.find().countDocuments()
		.then(count => {
			total = count;
			return Commands.find()
				.skip((currentPage - 1) * start)
				.limit(parseInt(limit));
		})
		.then(result => {
			if (result === null || result.length == 0) {
				const error = new Error('There are not records.');
				error.statusCode = 404;
				throw error;
			};
			res.json({ data: result, total: total });
		})
		.catch(error => {
			if (!error.statusCode) {
				error.statusCode = 500;
			}
			res.json({ message: err.message, code: err.statusCode })
		});
};

exports.getCommand = (req, res, next) => {
	id = req.body.id;
	Commands.findById({ _id: id })
		.then(result => {
			if (result === null || result.length == 0) {
				const error = new Error('There is no record.');
				error.statusCode = 404;
				throw error;
			};
			res.json({ data: result });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			res.json({ message: err.message, code: err.statusCode })
		});
}