import { default as Request, default as requests } from "../models/requests.js";
import User from "../models/users.js";

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
	const { sender, receiver, message } = req.body;
	const foundRequest = await Request.findOne({ sender, receiver });
	if (foundRequest) {
		throw new ExpressError("Request already exists", 409);
	}
	const request = new Request({ sender, receiver, message });
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
		sender.connections.push(receiver);
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
export const getSuggestions = async (req, res, next) => {
	// const fakeData = [];
	// for (let i = 1; i <= 10; i++) {
	// 	fakeData.push({
	// 		_id: i,
	// 		bio: "Hey, just some fake request message here",
	// 		username: `Username ${i}`,
	// 		pictures: [
	// 			{ src: "https://github.com/identicons/jasonlong.png", name: "some file name 1" },
	// 			{ src: "https://github.com/identicons/morelf7.png", name: "some file name 2" },
	// 			{ src: "https://github.com/identicons/laithiennhan.png", name: "some file name 3" },
	// 			{ src: "https://github.com/identicons/vtdoan.png", name: "some file name 4" },
	// 		],
	// 	});
	// }
	const suggestions = [
		{
			src: "./img/route.avif",
			name: "User2 Name",
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Some thing...",
			route: {
				from: "Some place",
				to: "Some destination",
			},
			schedule: {
				days: ["Monday", "Tuesday", "Friday"],
				time: {
					from: new Date().getHours() + ":" + new Date().getMinutes(),
					to: new Date().getHours() + ":" + new Date().getMinutes(),
				},
			},
			_id: 1,
			bio: "Hey, just some fake request message here",
			username: `Username 1`,
			pictures: [
				{ src: "https://github.com/identicons/jasonlong.png", name: "some file name 1" },
				{ src: "https://github.com/identicons/morelf7.png", name: "some file name 2" },
				{ src: "https://github.com/identicons/laithiennhan.png", name: "some file name 3" },
				{ src: "https://github.com/identicons/vtdoan.png", name: "some file name 4" },
			],
		},
		{
			src: "./img/route.avif",
			name: "User1 Name",
			description: "User1 Description/interest. Lorem ipsum dolor sit amet",
			route: {
				from: "User1 route - from",
				to: "User1 route - to",
			},
			schedule: {
				days: ["Monday", "Wednesday", "Friday"],
				time: {
					from: new Date().getHours() + ":" + new Date().getMinutes(),
					to: new Date().getHours() + ":" + new Date().getMinutes(),
				},
			},
			_id: 2,
			bio: "Hey, just some fake request message here",
			username: `Username 2`,
			pictures: [
				{ src: "https://github.com/identicons/jasonlong.png", name: "some file name 1" },
				{ src: "https://github.com/identicons/morelf7.png", name: "some file name 2" },
				{ src: "https://github.com/identicons/laithiennhan.png", name: "some file name 3" },
				{ src: "https://github.com/identicons/vtdoan.png", name: "some file name 4" },
			],
		},
	];

	res.status(200).json({
		message: "Being developed! Please stay tuned",
		data: suggestions,
		status: 200,
	});
};
