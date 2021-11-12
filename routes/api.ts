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
	app.get("/", IndexController.index);
	app.post("/", validate(indexValidator), IndexController.indexPost);

	app.get("/banks");
	app.get("/bank/:id");
	app.post("/banks");
	app.put("/banks");

	app.get("/subscriptions");
	app.get("/subscription/:id");
	app.post("/subscriptions");
	app.put("/subscriptions");

	app.get("/transactions");
	app.get("/bank/:id/transactions");
	app.get("/transaction/:id");
	app.post("/transactions");
	app.put("/transactions");

	app.get("/categories");
	app.get("/category/:id");
	app.post("/categories");
	app.put("/categories");

	app.get("/monthy-balance");
	app.get("/yearly-balance");

	app.get("/user", authMiddleware, UserController.get);
	app.post("/users", validate(postUserValidator), UserController.post);
	app.put("/users");
	app.post("/login", validate(loginUserValidator), UserController.login);
};
