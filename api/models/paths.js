import { Schema } from "mongoose";

const pathSchema = new Schema({
	pinponts: {
		type: [Number],
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
		type: Object,
		required: true,
	},
});

export default mongoose.model("Path", pathSchema)