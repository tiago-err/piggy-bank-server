import app from "./index";

const database = require("./models/index.js");
const port = process.env.PORT;

console.log(`\nNode environment: ${process.env.NODE_ENV}`);

app.listen(port, () => {
	console.log(`\nš @ http://${process.env.HOST}:${port}`);
});

database.sequelize
	.authenticate()
	.then(() => {
		console.log("\nš Connection to the database has been established successfully!");
	})
	.catch((err: Error) => {
		console.error("\nā Unable to connect to the database:", err);
	});

database.sequelize.sync().then(() => {
	console.log(`\nā Database & tables created!`);
});
