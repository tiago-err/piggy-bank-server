import {Sequelize, DataTypes, Model} from "sequelize";

const User = require("./user.model").User;
class Category extends Model {}

function init(sequelize: Sequelize, dataTypes: typeof DataTypes) {
	Category.init(
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
			modelName: "Category",
		},
	);

	Category.hasOne(User);
	return Category;
}

module.exports = {init, Category, order: 1};
