import {Request, Response} from "express";
import {failResponse, successResponse} from "../helpers/methods";
import jwt from "jsonwebtoken";
import {categories} from "../constants/category.constants";

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

interface Transaction {
	id?: number;
	amount: number;
	date: Date;
	label: string;
	isOutgoing: boolean;
	category: string;
	BankId: number;
}

export const get = async (req: Request, res: Response): Promise<void> => {
	const {user}: {user: User} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	const transactions: Transaction[] = await database.Transaction.findAll({
		include: [
			{
				model: database.Bank,
				where: {UserId: user.id},
			},
		],
	});
	res.send(
		successResponse("Retrieved these transactions for this user.", {
			transactions,
		}),
	);
};

export const getByBank = async (req: Request, res: Response): Promise<void> => {
	const {user}: {user: User} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	const transactions: Transaction[] = await database.Transaction.findAll({
		where: {BankId: req.params.id},
		include: [
			{
				model: database.Bank,
				where: {UserId: user.id},
			},
		],
	});
	res.send(
		successResponse("Retrieved these transactions for this user's bank.", {
			transactions,
		}),
	);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
	const {user}: {user: User} = req.body;

	if (!user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	const transaction: Transaction = await database.Transaction.findOne({
		where: {id: req.params.id},
		include: [
			{
				model: database.Bank,
				where: {UserId: user.id},
			},
		],
	});
	res.send(
		successResponse("Retrieved this transaction for this user.", {
			transaction,
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
	const {body}: {body: Transaction & {user: User}} = req;

	if (!body.user.gotFromMiddleware) {
		res.status(400).send(failResponse("Wrong format for this request!"));
		return;
	}

	if (!Object.keys(categories).includes(body.category)) {
		res.status(400).send(failResponse("Wrong category!"));
		return;
	}

	try {
		const bank: Bank = await database.Bank.findOne({where: {UserId: body.user.id, id: body.BankId}});
		if (!bank) {
			res.status(403).send(failResponse("The Bank mentioned does not belong to that User!"));
			return;
		}

		const transaction: Transaction = await database.Transaction.create({
			amount: body.amount,
			date: new Date(body.date),
			label: body.label,
			isOutgoing: body.isOutgoing,
			category: body.category,
			BankId: bank.id,
		});

		res.send(
			successResponse("User created successfully!", {
				transaction,
			}),
		);
	} catch (error) {
		res.status(400).send(failResponse("Something went wrong when saving the transaction!", error as any));
	}
};
