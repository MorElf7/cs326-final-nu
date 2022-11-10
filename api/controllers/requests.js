import Request from "../models/requests.js";

export const getAllRequest = async (req, res, next) => {
	const fakeData = [];
	for (let i = 1; i <= 10; i++) {
		fakeData.push({
			_id: i,
			bio: "Hey, just some fake request message here",
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
export const getRequest = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const createRequest = async (req, res, next) => {
	res.status(200).json({ status: 200, message: "Being developed! Please stay tuned" });
};
export const updateRequest = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const deleteRequest = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
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
