import {Sequelize, DataTypes, Model} from "sequelize";

const User = require("./user.model").User;
class Bank extends Model {}

function init(sequelize: Sequelize, dataTypes: typeof DataTypes) {
	Bank.init(
		{
			name: {
				type: dataTypes.STRING,
				allowNull: false,
			},
			color: {
				type: dataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Bank",
		},
	);

	Bank.belongsTo(User);

	return Bank;
}

module.exports = {init, Bank, order: 1};
