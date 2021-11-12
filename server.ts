import app from "./index";

const database = require("./models/index.js");
const port = process.env.PORT;

console.log(`\nNode environment: ${process.env.NODE_ENV}`);

app.listen(port, () => {
	console.log(`\n👂 @ http://${process.env.HOST}:${port}`);
});

database.sequelize
	.authenticate()
	.then(() => {
		console.log("\n🚀 Connection to the database has been established successfully!");
	})
	.catch((err: Error) => {
		console.error("\n❌ Unable to connect to the database:", err);
	});

database.sequelize.sync().then(() => {
	console.log(`\n✅ Database & tables created!`);
});
