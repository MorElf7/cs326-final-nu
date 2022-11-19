import User from "../models/users.js";

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
export const updateUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned", status: 200});
};
export const deleteUser = async (req, res, next) => {
	res.status(200).json({ message: "Being developed! Please stay tuned" });
};

export const getMatches = async (req, res, next) => {
	const {userId} = req.params;
	const user = await User.findById(userId);
	if (!user) {
		throw new ExpressError("User not found", 404);
	}
	res.status(200).json({ message: "", status: 200, data: user.connections});
};
