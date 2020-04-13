const Commands = require('../models/commands');

exports.getCommands = (req, res, next) => {
	const currentPage = req.query.page;
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
};

exports.getCommandsSearch = (req, res, next) => {
	const limit = req.query.limit;
	const start = req.query.start;
	const search = req.query.search;
	let total;
	let objSearch = [
		{ author: '' },
		{ definition: '' },
		{ title: '' },
		{ command: '' }
	];

	const checkBox = ['author', 'definition', 'title', 'command']

	checkBox.map((index, k) => {
		switch (index) {
			case 'author':
				objSearch[k].author = { "$regex": search, "$options": "im" }
				break;
			case 'definition':
				objSearch[k].definition = { "$regex": search, "$options": "im" }
				break;
			case 'title':
				objSearch[k].title = { "$regex": search, "$options": "im" }
				break;
			case 'command':
				objSearch[k].command = { "$regex": search, "$options": "im" }
				break;
		}
	});

	Commands.aggregate([
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
		{ $limit: parseInt(limit) },
		{ $count: "total" },
	]).then(count => {
		total = count[0].total;
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
			{
				$match: {
					$or: objSearch
				}
			},
			{ $skip: parseInt(start) },
			{ $limit: parseInt(limit) }
		])
	}).then(result => {
		res.json({ total: total, data: result });
	})
}