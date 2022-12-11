import e from "express";
import Path from "../models/paths.js";
import Request from "../models/requests.js";
import User from "../models/users.js";
import { ExpressError } from "../utils/index.js";

export const getAllRequest = async (req, res) => {
	const { sender, receiver } = req.query;
	const response = { message: "OK", status: 200 };
	if (!sender) {
		const requests = await Request.find({ receiver, status: "PENDING" });
		return res.status(200).json({ ...response, data: requests });
	} else if (!receiver) {
		const requests = await Request.find({ sender, status: "PENDING" });
		return res.status(200).json({ ...response, data: requests });
	} else {
		const requests = await Request.find({ status: "PENDING" });
		return res.status(200).json({ ...response, data: requests });
	}
};

export const getRequest = async (req, res, next) => {
	const { requestId } = req.params;
	const request = await Request.findById(requestId);
	return res.status(200).json({ message: "OK", status: 200, data: request });
};
export const createRequest = async (req, res, next) => {
	const { sender, receiver } = req.body;
	const foundRequest = await Request.findOne({ sender, receiver });
	if (foundRequest) {
		throw new ExpressError("Request already exists", 409);
	}
	const oppositeRequest = await Request.findOne({ sender: receiver, receiver: sender });
	if (oppositeRequest) {
		oppositeRequest.status = "ACCEPTED";
		await oppositeRequest.save();
		const user1 = await User.findOne({ _id: sender }),
		user2 = await User.findOne({ _id: receiver });
		user1.connections.push(receiver);
		user2.connections.push(sender);
		await user1.save();
		await user2.save();
		const request = new Request({ sender, receiver, status: "ACCEPTED" });
		await request.save();
		return res.status(200).json({ status: 200, message: "Matched", data: oppositeRequest });
	}
	const request = new Request({ sender, receiver });
	await request.save();
	res.status(200).json({ status: 200, message: "Request created", data: request });
};

export const updateRequest = async (req, res, next) => {
	const { status, id } = req.body;
	const request = await Request.findById(id);
	if (!request) {
		throw new ExpressError("Request not found", 404);
	}
	const statusList = ["ACCEPTED", "REJECTED", "PENDING"];
	if (!statusList.includes(status.toUpperCase())) {
		throw new ExpressError("Status is invalid", 403);
	}

	if (status.toUpperCase() === "ACCEPTED") {
		const sender = await User.findById(request.sender);
		const receiver = await User.findById(request.receiver);
		if (!sender.connections.includes(receiver)){
			sender.connections.push(receiver);

		}
		if (!receiver.connections.includes(sender)){
			receiver.connections.push(sender);
		}
		receiver.connections.push(sender);
		await sender.save();
		await receiver.save();
	} else if (status.toUpperCase() === "REJECTED") {
		await Request.findByIdAndDelete(id);
		res.status(200).json({ status: 200, message: "Request updated and deleted" });
	}
	request.status = status.toUpperCase();
	await request.save();
	res.status(200).json({ status: 200, message: "Request updated" });
};
export const rejectRequest = async (req, res, next) => {
	const { sender, receiver } = req.body;
	const foundRequest = await Request.findOne({ sender, receiver });

	const oppositeRequest = await Request.findOne({ sender: receiver, receiver: sender });
	if (oppositeRequest) {
		oppositeRequest.status = "REJECTED";
		await oppositeRequest.save();
		// const user1 = await User.findOne({ _id: sender }),
		// user2 = await User.findOne({ _id: receiver });
		// user1.connections.push(receiver);
		// // user2.connections.push(sender);
		// await user1.save();
		// await user2.save();
		res.status(200).json({ status: 200, message: "REJECTED", data: oppositeRequest });
	}

	if (foundRequest) {
		foundRequest.status = "REJECTED";
		return res.status(200).json({ status: 200, message: "Request rejected" });	
	}

	const request = new Request({ sender, receiver, status: "REJECTED" });
	await request.save();
	res.status(200).json({ status: 200, message: "Request rejected", data: request });
}
export const deleteRequest = async (req, res, next) => {
	const { id } = req.body;
	const request = await Request.findById(id);
	if (!request) {
		throw new ExpressError("Request not found", 404);
	}
	if (!request.sender.equals(req.user._id)) {
		throw new ExpressError("Not authorized", 401);
	}
	await Request.findByIdAndDelete(id);
	res.status(200).json({ status: 200, message: "Request deleted" });
};
export const removeMatch = async (req, res, next) => {
	const user1 = await User.findById(req.body.user1);
	const user2 = await User.findById(req.body.user2);

	user1.connections = user1.connections.filter(connection => !connection.equals(req.body.user2));
	user2.connections = user2.connections.filter(connection => !connection.equals(req.body.user1));
	
	await user1.save();
	await user2.save();
	
	res.status(200).json({ status: 200, message: "Match removed!"})
}
export const getSuggestions = async (req, res, next) => {
	const { userId } = req.body;
	const user = await User.findById(userId).populate("path");
	if (!user) {
		throw new ExpressError("User not found", 404);
	}
	const zipcodeList = user.path?.pinpoints.map((e) => e.zipcode);
	const suggestedPaths = await Path.find({ "pinpoints.zipcode": { $in: zipcodeList } }).populate(
		"user"
	);
	const suggestMatches = suggestedPaths.filter(e => e.user._id.toString() !== userId).filter(e => !e.user.connections.includes(userId))
	const result = []

	for (const suggestion of suggestMatches) {
		const request = await Request.findOne({ sender: userId, receiver: suggestion.user._id, status: {$in: ["ACCEPTED", "REJECTED"]}});
		const altRequest = await Request.findOne({ sender: suggestion.user._id, receiver: userId,});
		if (!request && !altRequest) {
			result.push(suggestion)
		}
	}
	res.status(200).json({
		status: 200,
		message: "",
		data: result
	});
};
