const jwt = require('jsonwebtoken');
const User = require('../models/authenticator');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;

		decodedToken = jwt.verify(token, process.env.JWT_KEY);
		const user = await User.findOne({_id: decodedToken.userId, 'tokens.token': token})
        if(!user){
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
		}
		req.user = user;
		req.token = token;
		req.userId = decodedToken.userId;
		next();
    } catch (error) {
		  res.json({ message: error.message, code: error.statusCode })
	}
};
