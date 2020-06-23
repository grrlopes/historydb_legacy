const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const CommandRoutes = require('./router/commands');
const AuthRoutes = require('./router/authenticator');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');
	next();
});

app.use('/api', CommandRoutes);
app.use('/auth', AuthRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

mongoose.connect(
	`mongodb://${process.env.MONGODB_ADDR}:${process.env.MONGODB_PORT}/postapi`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
).then(
	result => {
		app.listen(process.env.APP_PORT);
		if (result.connection.readyState == 1) {
			console.log(`Server is running on port ${process.env.APP_PORT}`);
		}
	}
).catch(
	err => console.error(err.message)
);