const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS')
		next();

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token)
			res.status(403).json({message: "Not authorized"});
		const data = jwt.verify(token, JWT_SECRET);
		req.user = data;
		next();
	} catch (e) {
		console.log(e);
		return res.status(403).json({message: "Not authorized"});
	}
}
