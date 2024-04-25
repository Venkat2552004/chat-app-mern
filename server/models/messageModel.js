const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		content: { type: String, trim: true },
		chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	},
	{
		timestamps: true,
	}
);

module.exports = new mongoose.model("Message", messageSchema);
