import localStrategy from "passport-local";
import User from "../models/users.js";
import { MiniCrypt } from "./miniCrypt.js";
const mc = new MiniCrypt();

export const strategy = new localStrategy(async (username, password, done) => {
	const user = await User.findOne({ username });
	if (!user) {
		// no such user
		await new Promise((r) => setTimeout(r, 2000)); // two second delay
		return done(null, false, { status: 401, message: "Incorrect username or password" });
	}
	if (!mc.check(password, user.salt, user.hash)) {
		// invalid password
		// should disable logins after N messages
		// delay return to rate-limit brute-force attacks
		await new Promise((r) => setTimeout(r, 2000)); // two second delay
		return done(null, false, { status: 401, message: "Incorrect username or password" });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, username);
});

export const serializeUser = (user, cb) => {
	cb(null, user.id);
};

export const deserializeUser = async (id, cb) => {
	try {
		const user = await User.findOne({ _id: id }).populate("path");
		cb(null, user);
	} catch (err) {
		cb(err);
	}
};
