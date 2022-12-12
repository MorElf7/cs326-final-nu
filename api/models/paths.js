import mongoose from "mongoose";
const { Schema } = mongoose;

const pathSchema = new Schema({
	pinpoints: [
		{
			address: String,
			zipcode: String,
			coord: [{
				type: Number,
			}]
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
			required: true
		},
	],
	time: {
		type: String,
		required: true,
	}
});

export default mongoose.model("Path", pathSchema);
