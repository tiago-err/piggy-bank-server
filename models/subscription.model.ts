import {Sequelize, DataTypes, Model} from "sequelize";

const Bank = require("./bank.model").Bank;
const Transaction = require("./transaction.model").Transaction;
class Subscription extends Model {}

function init(sequelize: Sequelize, dataTypes: typeof DataTypes) {
	Subscription.init(
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
			modelName: "Subscription",
		},
	);

	Subscription.belongsTo(Bank);
	// Subscription.belongsToMany(Subscription, Transaction);

	return Subscription;
}

module.exports = {init, Subscription, order: 4};
