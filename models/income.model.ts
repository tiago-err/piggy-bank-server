import {Sequelize, DataTypes, Model} from "sequelize";

const Bank = require("./bank.model").Bank;
const Transaction = require("./transaction.model").Transaction;
class Income extends Model {}

function init(sequelize: Sequelize, dataTypes: typeof DataTypes) {
	Income.init(
		{
			amount: {
				type: dataTypes.STRING,
				allowNull: false,
			},
			renewalDate: {
				type: dataTypes.DATEONLY,
				allowNull: false,
			},
			frequency: {
				type: dataTypes.ENUM,
				values: ["daily", "weekly", "monthly", "yearly"],
			},
			category: {
				type: dataTypes.STRING,
			},
			label: {
				type: dataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Income",
		},
	);

	Income.belongsTo(Bank);
	// Income.belongsToMany(Income, Transaction);

	return Income;
}

module.exports = {init, Income, order: 3};
