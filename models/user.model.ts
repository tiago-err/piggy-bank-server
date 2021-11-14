import bcrypt from "bcrypt";
import {Sequelize, DataTypes, Model} from "sequelize";

class User extends Model {}

function init(sequelize: Sequelize, dataTypes: typeof DataTypes) {
	User.init(
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
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: (user: any, options) => {
					if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
				},
				beforeUpdate: (user: any) => {
					if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
				},
			},
		},
	);

	return User;
}

module.exports = {init, User, order: 0};
