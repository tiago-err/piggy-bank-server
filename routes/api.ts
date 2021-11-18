import {Express} from "express-serve-static-core";
import * as IndexController from "../controllers/index.controller";
import * as UserController from "../controllers/user.controller";
import {validate} from "../middlewares/validators/wrapper.validator";
import {indexValidator} from "../middlewares/validators/index.validations";
import {postUserValidator, loginUserValidator} from "../middlewares/validators/user.validations";
import authMiddleware from "../middlewares/auth.middleware";

/**
 *
 * @param app
 */
export const api = (app: Express) => {
	app.get("/banks");
	app.get("/bank/:id");
	app.post("/banks");
	app.put("/banks/:id");

	app.get("/subscriptions");
	app.get("/subscription/:id");
	app.post("/subscriptions");
	app.put("/subscriptions/:id");

	app.get("/income");
	app.get("/income/:id");
	app.post("/income");
	app.put("/income/:id");

	app.get("/transactions");
	app.get("/bank/:id/transactions");
	app.get("/transaction/:id");
	app.post("/transactions");
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
