import mongoose from "mongoose";
const { Schema } = mongoose;

const pathSchema = new Schema({
	pinpoints: [
		{
			name: String,
			zipcode: String,
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	speed: {
		type: String,
		required: true,
	},
	date: [
		{
			type: String,
		},
	],
});

export default mongoose.model("Path", pathSchema);
