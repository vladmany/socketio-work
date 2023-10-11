const sequelize = require('../DB');

const User = require('./User');
const ChatMessage = require('./ChatMessage');
const Room = require('./Room');

ChatMessage.belongsTo(User);

const init = async () => {
	await sequelize.sync({
		alter: true,
		force: false,
	});
}

module.exports = { init, User, ChatMessage, Room };