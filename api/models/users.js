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
});

export default mongoose.model("User", userSchema);
