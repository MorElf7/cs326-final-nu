import { connections } from "mongoose";
import User from "../models/users.js";
import { ExpressError } from "../utils/index.js";

export const getUser = async (req, res, next) => {
	const { userId } = req.params;
	const user = await User.findById(userId).populate("path");
	res.status(200).json({
		message: "OK",
		data: { ...user, hash: undefined, salt: undefined },
		status: 200,
	});
};

export const updateUser = async (req, res, next) => {
	const { userId } = req.params;
	const { username, email, description } = req.body;
	const user = await User.findById(userId);
	if (!user) {
		throw new ExpressError("User Not Found", 404);
	}
	const dbusername = await User.findOne({ username: username });
	if (dbusername) {
		res.status(403).json({
			message: "username already exists",
			data: user,
			status: 403,
		});
	}
	await User.updateOne(
		{ _id: userId },
		{
			username: username,
			email: email,
			description: description,
		}
	);
	res.status(200).json({
		message: "OK",
		data: user,
		status: 200,
	});
};

export const deleteUser = async (req, res, next) => {
	const { id } = req.body;
	const user = await User.findById(id);
	if (!user) {
		throw new ExpressError("User not found", 404);
	}
	await User.findByIdAndDelete(id);
	res.status(200).json({
		status: 200,
		message: "User deleted",
	});
};

export const getMatches = async (req, res, next) => {
	const { userId } = req.params;
	const user = await User.findById(userId).populate("connections");
	if (!user) {
		throw new ExpressError("User not found", 404);
	}
	res.status(200).json({ message: "", status: 200, data: user.connections });
};
