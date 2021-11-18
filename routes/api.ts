import {Express} from "express-serve-static-core";
import * as UserController from "../controllers/user.controller";
import * as BankController from "../controllers/bank.controller";
import * as TransactionController from "../controllers/transaction.controller";
import {validate} from "../middlewares/validators/wrapper.validator";
import {postUserValidator, loginUserValidator} from "../middlewares/validators/user.validations";
import authMiddleware from "../middlewares/auth.middleware";

/**
 *
 * @param app
 */
export const api = (app: Express) => {
	app.get("/banks", authMiddleware, BankController.get);
	app.get("/bank/:id", authMiddleware, BankController.getById);
	app.post("/banks", authMiddleware, BankController.post);
	app.put("/banks/:id");

	app.get("/subscriptions");
	app.get("/subscription/:id");
	app.post("/subscriptions");
	app.put("/subscriptions/:id");

	app.get("/income");
	app.get("/income/:id");
	app.post("/income");
	app.put("/income/:id");

	app.get("/transactions", authMiddleware, TransactionController.get);
	app.get("/bank/:id/transactions", authMiddleware, TransactionController.getByBank);
	app.get("/transaction/:id", authMiddleware, TransactionController.getById);
	app.post("/transactions", authMiddleware, TransactionController.post);
	app.put("/transactions/:id");

	app.get("/categories");
	app.get("/category/:id");
	app.post("/categories");
	app.put("/categories/:id");

	app.get("/monthy-balance");
	app.get("/yearly-balance");

	app.get("/user", authMiddleware, UserController.get);
	app.post("/users", validate(postUserValidator), UserController.post);
	app.put("/users");
	app.post("/login", validate(loginUserValidator), UserController.login);
};
