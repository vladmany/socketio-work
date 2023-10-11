const { User } = require("../models/init");
const bcrypt = require("bcryptjs");
const {generateAccessToken} = require("../services/authService");

module.exports = {
	async register(req, res) {
		try {
			const { username, password } = req.body;
			const existing = await User.findOne({where: {username}});
			if (existing)
				return res.status(400).json({message: 'User is already exists'});
			await User.create({
				username,
				password: bcrypt.hashSync(password, 6),
			});
			res.json({message: "Registration successfully"})
		} catch (e) {
			console.log(e);
			res.status(400).json({message: 'Registration error'});
		}
	},
	async login(req, res) {
		try {
			const {username, password} = req.body;
			const user = await User.findOne({where: {username}});
			if (!user)
				return res.status(404).json({message: 'User not found'});
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword)
				return res.status(422).json({message: 'Wrong password'});

			const token = generateAccessToken(user.id, user.username);
			return res.json({token});
		} catch (e) {
			console.log(e);
			res.status(400).json({message: 'Login error'});
		}
	},
	async user(req, res) {
		try {
			res.json(req.user);
		} catch (e) {

		}
	}
}