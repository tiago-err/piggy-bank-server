import {body, ValidationChain} from "express-validator";

export const indexValidator: ValidationChain[] = [body("key").exists().withMessage("key is required")];

export const postUserValidator: ValidationChain[] = [
	body("email").exists().withMessage("The user's e-mail is required!"),
	body("firstName").exists().withMessage("The user's first name is required!"),
	body("lastName").exists().withMessage("The user's last name is required!"),
	body("password").exists().withMessage("The user's password is required!"),
	body("password")
		.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g)
		.withMessage("Minimum eight characters, at least one upper case letter, one lower case letter & one number"),
];

export const loginUserValidator: ValidationChain[] = [
	body("email").exists().withMessage("The user's e-mail is required!"),
	body("password").exists().withMessage("The user's password is required!"),
];
