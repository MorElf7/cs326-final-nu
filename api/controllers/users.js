import User from "../models/users.js";

export const login = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const getUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const createUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const updateUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const deleteUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const getMatches = async (req, res, next) => {
	const fakeData = [];
	for (let i = 1; i <= 10; i++) {
		fakeData.push({
			_id: i,
			bio: "Hey, just some fake bio here",
			username: `Username ${i}`,
			pictures: [
				{ src: "https://github.com/identicons/jasonlong.png", name: "some file name 1" },
				{ src: "https://github.com/identicons/morelf7.png", name: "some file name 2" },
				{ src: "https://github.com/identicons/laithiennhan.png", name: "some file name 3" },
				{ src: "https://github.com/identicons/vtdoan.png", name: "some file name 4" },
			],
		});
	}
	res.status(200).json({
		message: "Being developed! Please stay tuned",
		data: fakeData,
		status: 200,
	});
};
export const getOutgoingRequest = async (req, res, next) => {
	const fakeData = [];
	for (let i = 1; i <= 10; i++) {
		fakeData.push({
			_id: i,
			bio: "Hey, just some fake bio here",
			username: `Username ${i}`,
			pictures: [
				{ src: "https://github.com/identicons/jasonlong.png", name: "some file name 1" },
				{ src: "https://github.com/identicons/morelf7.png", name: "some file name 2" },
				{ src: "https://github.com/identicons/laithiennhan.png", name: "some file name 3" },
				{ src: "https://github.com/identicons/vtdoan.png", name: "some file name 4" },
			],
		});
	}
	res.status(200).json({
		message: "Being developed! Please stay tuned",
		data: fakeData,
		status: 200,
	});
};
