const sequelize = require('../DB');
const { DataTypes } = require('sequelize');

const ChatMessage = sequelize.define('ChatMessage', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	room_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
	}
}, {
	timestamps: true,
	underscored: true,
});

module.exports = ChatMessage;