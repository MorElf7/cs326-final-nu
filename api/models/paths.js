import {mongoose, Schema} from "mongoose";

const pathSchema = new mongoose.Schema({
	pinponts: {
		type: [[Number]],
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	speed: {
		type: String,
		required: true,
	},
	date: {
		type: [String],
		required: true,
	},
});

export default mongoose.model("Path", pathSchema)