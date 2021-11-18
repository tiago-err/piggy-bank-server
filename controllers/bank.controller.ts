import {Request, Response} from "express";
import {failResponse, successResponse} from "../helpers/methods";
import jwt from "jsonwebtoken";

const database = require("../models/index.js");

interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	gotFromMiddleware?: boolean;
}

interface Bank {
	id?: number;
	name: string;
	color: string;
}

export const get = async (req: Request, res: Response): Promise<void> => {
	const {user}: {user: User} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	const banks: Bank[] = await database.Bank.findAll({where: {UserId: user.id}});
	res.send(
		successResponse("Retrieved these banks for this user.", {
			banks,
		}),
	);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
	const {user}: {user: User} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	const bank: Bank = await database.Bank.findOne({where: {UserId: user.id, id: req.params.id}});
	res.send(
		successResponse("Retrieved these banks for this user.", {
			bank,
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
	const {user, name, color}: {user: User; name: string; color: string} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	try {
		const bank: Bank = await database.Bank.create({name, color, UserId: user.id});

		res.send(
			successResponse("User created successfully!", {
				bank,
			}),
		);
	} catch (error) {
		res.status(400).send(failResponse("Something went wrong when saving the bank!", error as any));
	}
};
