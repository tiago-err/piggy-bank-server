import {Sequelize, DataTypes, Model} from "sequelize";

const Bank = require("./bank.model").Bank;
const Category = require("./category.model").Category;
class Transaction extends Model {}

function init(sequelize: Sequelize, dataTypes: typeof DataTypes) {
	Transaction.init(
		{
			amount: {
				type: dataTypes.STRING,
				allowNull: false,
			},
			date: {
				type: dataTypes.DATE,
				allowNull: false,
			},
			label: {
				type: dataTypes.STRING,
				allowNull: false,
			},
			isOutgoing: {
				type: dataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Transaction",
		},
	);

	Transaction.belongsTo(Bank);
	Transaction.belongsTo(Category);

	return Transaction;
}

module.exports = {init, Transaction, order: 2};
