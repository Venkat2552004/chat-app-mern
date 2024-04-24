const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		dp: {
			type: String,
			default:
				"https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg",
		},
	},
	{
		timestamps: true,
	}
);

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

module.exports.User = new mongoose.model("User", userSchema);
module.exports.Message = new mongoose.model("Message", messageSchema);
module.exports.Chat = new mongoose.model("Chat", chatSchema);
