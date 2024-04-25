const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
		admin: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = new mongoose.model("Chat", chatSchema);
