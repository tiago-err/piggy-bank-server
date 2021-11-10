import {DataTypes, Sequelize} from "sequelize";

const User = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	return {
		name: "User",
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
		},
	};
};

export default User;
