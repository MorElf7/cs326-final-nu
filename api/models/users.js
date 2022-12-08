import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	connections: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	path: {
		type: Schema.Types.ObjectId,
		ref: "Path",
	},
	description: {
		type: String,
		// required: true,
	},
});

export default mongoose.model("User", userSchema);
