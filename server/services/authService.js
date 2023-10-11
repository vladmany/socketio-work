const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const EXPIRES_IN = "24h";

module.exports = {
	generateAccessToken(id, username) {
		const payload = { id, username };

		return jwt.sign(payload, JWT_SECRET, {expiresIn: EXPIRES_IN});
	}
}