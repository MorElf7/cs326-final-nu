import mongoose from "mongoose";
import Path from "../models/paths.js";
import Request from "../models/requests.js";
import { paths, requests } from "./seedHelper.js";

// const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/cardio-buddy";
const dbUrl = "mongodb://127.0.0.1:27017/cardio-buddy";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Request.deleteMany({});
	await Path.deleteMany({});
	for (let i = 0; i < paths.length; ++i) {
		const path = new Path({
			...paths[i],
		});
		await path.save();
	}
	for (let i = 0; i < requests.length; ++i) {
		const request = new Request({
			...requests[i],
		});
		await request.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
