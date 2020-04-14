const Mongoose = require('mongoose');
const Commands = require('../models/commands');
const checkSearch = require('../middleware/check_search')
const objectId = Mongoose.Types.ObjectId;

exports.getCommands = (req, res, next) => {
	const limit = req.query.limit;
	const start = req.query.start;
	let total;
	Commands.aggregate([
		{
			$match: {
				"commands.main": {
					$in: [true]
				}
			}
		},
		{ $count: "total" },
	]).then(count => {
		if (count === null || count.length == 0) {
			const error = new Error('There are not records.');
			error.statusCode = 404;
			throw error;
		}
		total = count[0].total
		return Commands.aggregate([
			{ $unwind: "$commands" },
			{
				$match: {
					"commands.main": {
						$in: [true]
					}
				}
			},
			{
				$project: {
					author: 1,
					title: 1,
					definition: 1,
					cmd_author: "$commands.author",
					command: "$commands.command",
					cmd_created_at: "$commands.createdAt",
					createdAt: 1,
					updatedAt: 1
				}
			},
			{ $skip: parseInt(start) },
			{ $limit: parseInt(limit) },
		])
	}).then(result => {
		res.json({ total: total, data: result });
	}).catch(error => {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		res.json({ message: error.message, code: error.statusCode })
	});
};

exports.getCommand = (req, res, next) => {
	const id = objectId(req.body.id);
	Commands.aggregate([
		{ $unwind: "$commands" },
		{
			$match: {
				_id: id
			}
		},
		{
			$project: {
				author: 1,
				title: 1,
				definition: 1,
				cmd_author: "$commands.author",
				command: "$commands.command",
				cmd_created_at: "$commands.createdAt",
				createdAt: 1,
				updatedAt: 1
			}
		}
	]).then(result => {
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
};

exports.getCommandsSearch = async (req, res, next) => {
	const limit = req.query.limit;
	const start = req.query.start;

	try{
	const objSearch = checkSearch.queryCheckbox(req.query);
	const count = await Commands.aggregate([
		{ $unwind: "$commands" },
		{
			$match: {
				"commands.main": {
					$in: [true]
				}
			}
		},
		{
			$project: {
				author: 1,
				title: 1,
				definition: 1,
				cmd_author: "$commands.author",
				command: "$commands.command",
				cmd_created_at: "$commands.createdAt",
				createdAt: 1,
				updatedAt: 1
			}
		},
		{
			$match: {
				$or: objSearch
			}
		},
		{ $count: "total" },
	]);

	if(count[0] === undefined){
		const error = new Error('There are not records.');
		error.statusCode = 404;
		throw error;
	}

	const result = await Commands.aggregate([
			{ $unwind: "$commands" },
			{
				$match: {
					"commands.main": {
						$in: [true]
					}
				}
			},
			{
				$project: {
					author: 1,
					title: 1,
					definition: 1,
					cmd_author: "$commands.author",
					command: "$commands.command",
					cmd_created_at: "$commands.createdAt",
					createdAt: 1,
					updatedAt: 1
				}
			},
			{
				$match: {
					$or: objSearch
				}
			},
			{ $skip: parseInt(start) },
			{ $limit: parseInt(limit) }
	]);
	res.json({ total: count[0].total, data: result });
	}catch(error){
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		res.json({ message: error.message, code: error.statusCode })
	};
}