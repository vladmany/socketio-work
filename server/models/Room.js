const sequelize = require('../DB');
const { DataTypes } = require('sequelize');

const Room = sequelize.define('Room', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	is_private: {
		type: DataTypes.BOOLEAN,
		default: false,
	},
	requester_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	responder_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
	}
}, {
	timestamps: true,
	underscored: true,
});

module.exports = Room;