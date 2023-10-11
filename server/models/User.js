const sequelize = require('../DB');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING(64),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: true,
	}
}, {
	timestamps: true,
	underscored: true,
});

module.exports = User;