import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		message: {
			type: String,
			required: true,
			default: "Hey there, I would like to connect with you!",
		},
		pending: {
			type: Boolean,
			required: true,
			default: true,
		},
		status: {
			type: String,
			required: true,
			default: "PENDING",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Request", requestSchema);
