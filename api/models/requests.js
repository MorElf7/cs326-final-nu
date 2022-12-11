import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		// message: {
		// 	type: String,
		// 	required: true,
		// 	default: "Hey there, I would like to connect with you!",
		// },
		// Status: PENDING, ACCEPTED, REJECTED
		status: {
			type: String,
			required: true,
			default: "PENDING",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Request", requestSchema);
