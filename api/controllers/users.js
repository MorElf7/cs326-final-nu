import User from "../models/users.js";

export const login = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const getUser = async (req, res, next) => {
	const user =  {
        src: './img/route.avif',
        name: "My Name",
        description: 'Some description about the user.',
        route: {
            from: "My Route - from",
            to: "My Route - to"
        },
        schedule: {
            days: ['Monday','Tuesday','Friday'],
            time: {
                from: new Date().getHours()+ ":" + new Date().getMinutes(),
                to: new Date().getHours()+ ":" + new Date().getMinutes()
            }
        },
        dateJoined: new Date().getHours()+ ":" + new Date().getMinutes(),
    };
	res.status(200).json({
		message: "Being developed! Please stay tuned",
		data: user,
		status: 200,
	});
};
export const createUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};
export const updateUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned", status: 200});
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
