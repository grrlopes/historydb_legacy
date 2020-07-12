const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const command = new Schema(
	{
		_id: false,
		author: { type: String, required: true },
		command: { type: String, required: true },
		main: { type: Boolean, required: true }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const commandSchema = new Schema(
	{
		author: { type: String, required: true },
		title: { type: String, required: true },
		definition: { type: String, required: true },
		commands: [command],
	},
	{ timestamps: { createdAt: true, updatedAt: true} }
);

module.exports = mongoose.model('Posts', commandSchema);
