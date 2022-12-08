import Path from "../models/paths.js";
import requests from "../models/requests.js";
import { ExpressError } from "../utils/index.js";

export const createPath = async (req, res, next) => {
	const { pinpoints, user, speed, date, time } = req.body;
	console.log("body:")
	console.log(req.body)
	const path = new Path({pinpoints, user, speed, date, time});
	await path.save();
	// console.log(path);
	res.status(200).json({
		message: "Path created",
		status: 200,
	});
};

export const showPath = async (req, res, next) => {
	const { userId } = req.params;
	const path = await Path.findOne({ user: userId });
	if (!path) {
		return requests.status(404).json({ message: "User has not created path", status: 404, data: path });
	}
	return res.status(200).json({ message: "OK", status: 200, data: path });
};

export const updatePath = async (req, res, next) => {
  const { userId } = req.params;
  const { pinpoints, speed, date, time } = req.body;

	Path.updateOne({ user: userId }, { pinpoints: pinpoints, speed: speed, date: date, time: time });

	res.status(200).json({
		message: "Successfully updated path",
		status: 200,
		data: Path.findOne({ user: userId }),
	});
};

export const deletePath = async (req, res, next) => {
	const { id } = req.body;
	const path = await Path.findById(id);

	if (!path) {
		throw new ExpressError("Path not found", 404);
	}

	await Path.findByIdAndDelete(id);
	res.status(200).json({
		status: 200,
		message: "Path deleted",
	});
};
