import User from "../models/users.js";
import { MiniCrypt } from "../utils/miniCrypt.js";

const mc = new MiniCrypt();

export const login = (req, res, next) => {
	const redirectUrl = req.session.returnTo || "/";
	delete req.session.returnTo;
	res.status(200).json({ status: 200, message: "Log In", data: { redirectUrl } });
};

export const signup = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const [salt, hash] = mc.hash(password);
		const user = new User({ email, username, bio: "", hash, salt });
		await user.save();
		req.login(user, (err) => {
			if (err) return next(err);
			res.status(200).json({ status: 200, message: "Sign Up" });
		});
	} catch (e) {
		res.status(400).json({ status: 400, message: "Unable to signup" });
	}
};

export const logout = (req, res, next) => {
	req.logout();
	res.status(200).json({ status: 200, message: "Log Out" });
};
