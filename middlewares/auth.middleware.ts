import type {Handler} from "express";
import jwt from "jsonwebtoken";
import {failResponse} from "../helpers/methods";
import {User} from "../interfaces/user.interface";

const database = require("../models/index.js");

/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authMiddleware: Handler = async (req, res, next) => {
	const {
		headers: {authorization},
	} = req;
	if (!authorization) return res.status(401).send(failResponse("Authorization header missing!"));

	const authToken = authorization.split(" ")[1];

	try {
		const decodedUser: User = jwt.verify(authToken, process.env.JWT_TOKEN || "") as User;
		const {dataValues: user}: {dataValues: User} = await database.User.findOne({where: {email: decodedUser.email}});

		if (user) {
			req.body = Object.assign(req.body, {user: Object.assign({gotFromMiddleware: true}, user)});
			return next();
		}

		res.status(403).send(failResponse("Token does not belong to a valid user!"));
	} catch (error) {
		res.status(403).send(failResponse("Token does not belong to a valid user!", error as any));
	}
};

export default authMiddleware;
