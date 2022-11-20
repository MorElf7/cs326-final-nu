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
	bio: String,
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
		required: true,
	},
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
		required: true,
		auto: true,
	  }
});

export default mongoose.model("User", userSchema);
