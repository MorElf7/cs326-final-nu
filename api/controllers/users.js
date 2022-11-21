import { connections } from "mongoose";
import User from "../models/users.js";
import { ExpressError } from "../utils/index.js";

export const getUser = async (req, res, next) => {
	// const user = {
	// 	src: "./img/route.avif",
	// 	name: "My Name",
	// 	description: "Some description about the user.",
	// 	route: {
	// 		from: "My Route - from",
	// 		to: "My Route - to",
	// 	},
	// 	schedule: {
	// 		days: ["Monday", "Tuesday", "Friday"],
	// 		time: {
	// 			from: new Date().getHours() + ":" + new Date().getMinutes(),
	// 			to: new Date().getHours() + ":" + new Date().getMinutes(),
	// 		},
	// 	},
	// 	dateJoined: new Date().getHours() + ":" + new Date().getMinutes(),
	// };
	const { userId } = req.params;
	const user = await User.findById(userId).populate("path");
	res.status(200).json({
		message: "OK",
		data: user,
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
	// const fakeData = [];
	// for (let i = 1; i <= 10; i++) {
	// 	fakeData.push({
	// 		_id: i,
	// 		bio: "Hey, just some fake bio here",
	// 		username: `Username ${i}`,
	// 	});
	// }
	// res.status(200).json({
	// 	message: "Being developed! Please stay tuned",
	// 	data: fakeData,
	// 	status: 200,
	// });
	const { userId } = req.params;
	const user = await User.findById(userId).populate({
		path: connections,
		// select: ["username", "_id", "description"],
	});
	if (!user) {
		throw new ExpressError("User not found", 404);
	}
	res.status(200).json({ message: "", status: 200, data: user.connections });
};
