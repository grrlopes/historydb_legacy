const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const command = new Schema(
	{
		_id: false,
		author: { type: String, required: false },
		command: { type: String, required: false },
		main: { type: Boolean, required: false }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const commandSchema = new Schema(
	{
		author: { type: String, required: false },
		title: { type: String, required: false },
		definition: { type: String, required: false },
		commands: [command],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Commands', commandSchema);
