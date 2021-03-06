"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
	console.log(`\nš [DATABASE] - Using environment variables!`);

	const env_variables = config.use_env_variable;
	sequelize = new Sequelize(
		process.env[env_variables.database],
		process.env[env_variables.username],
		process.env[env_variables.password],
		Object.assign(config, {host: process.env[env_variables.host]}),
	);
} else {
	console.log(`\nš [DATABASE] - Using config variables!`);
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && (file.slice(-3) === ".js" || file.slice(-3) === ".ts");
	})
	.map((file) => require(path.join(__dirname, file)))
	.sort((modelA, modelB) => modelA.order - modelB.order)
	.forEach((model) => {
		const instantiatedModel = model.init(sequelize, Sequelize.DataTypes);
		db[instantiatedModel.name] = instantiatedModel;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
