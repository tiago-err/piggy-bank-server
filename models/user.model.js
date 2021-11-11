import {DataTypes, Sequelize} from "sequelize";
import bcrypt from "bcrypt";

module.exports = (sequelize, dataTypes) => {
	return sequelize.define(
		"User",
		{
			firstName: {
				type: dataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: dataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: dataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
				},
				unique: true,
			},
			password: {
				type: dataTypes.STRING,
				allowNull: false,
			},
		},
		{
			hooks: {
				beforeCreate: (user) => {
					if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
				},
				beforeUpdate: (user) => {
					if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
				},
			},
			instanceMethods: {
				validPassword: (password) => bcrypt.compareSync(password, this.password),
			},
		},
	);
};
