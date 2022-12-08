import mongoose from "mongoose";
import Path from "../models/paths.js";
import Request from "../models/requests.js";
import User from "../models/users.js";
import { MiniCrypt } from "../utils/miniCrypt.js";
import { paths, requests, users } from "./seedHelper.js";

const mc = new MiniCrypt();

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/cardio-buddy";
// const dbUrl = "mongodb://127.0.0.1:27017/cardio-buddy";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Request.deleteMany({});
	await Path.deleteMany({});
	await User.deleteMany({});
	for (let i = 0; i < users.length; ++i) {
		const { email, username, password, description } = users[i];
		const [salt, hash] = mc.hash(password);
		const user = new User({ email, username, description, hash, salt });
		await user.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
