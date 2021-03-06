import {Request, Response} from "express";
import {failResponse, successResponse} from "../helpers/methods";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {User} from "../interfaces/user.interface";

const database = require("../models/index.js");

export const login = async (req: Request, res: Response): Promise<void> => {
	const userBody: {email: string; password: string} = req.body;

	const user: User = await database.User.findOne({where: {email: userBody.email}});
	if (user) {
		if (!bcrypt.compareSync(userBody.password, user.password)) {
			res.status(403).send(failResponse("Wrong password!"));
			return;
		}

		const responseBody = {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		};

		res.send(
			successResponse("User logged in successfully!", {
				user: responseBody,
				token: jwt.sign(responseBody, process.env.JWT_TOKEN || ""),
			}),
		);
	} else {
		res.status(401).send(failResponse("There is no user registered with that e-mail address!"));
	}
};

export const get = async (req: Request, res: Response): Promise<void> => {
	const {user}: {user: User} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	const responseBody = {
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	};

	res.send(
		successResponse("User information retrieved successfully!", {
			user: responseBody,
		}),
	);
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const post = async (req: Request, res: Response): Promise<void> => {
	const userBody: User = req.body;

	try {
		const user: User = await database.User.create(userBody);
		const responseBody = {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		};

		res.send(
			successResponse("User created successfully!", {
				user: responseBody,
				token: jwt.sign(responseBody, process.env.JWT_TOKEN || ""),
			}),
		);
	} catch (error) {
		res.status(400).send(failResponse("Something went wrong when saving the user!", error as any));
	}
};
