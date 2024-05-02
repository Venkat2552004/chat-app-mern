const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");


const allMessages = asyncHandler(async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId })
			.populate("sender", "name email dp")
			.populate("chat");
		res.status(200).json(messages);
	} catch (error) {
		res.status(401);
		throw new Error("Error fetching all messages");
	}
});

const sendMessage = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body;
	if (!content || !chatId) {
		console.log("Invalid data passed into request");
		return res.sendStatus(401);
	}

	var newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);
		
		message = await message.populate("sender", "name email dp")
		
	message = await message.populate({
		path: "chat",
		select: "chatName isGroupChat users",
		model: "Chat",
		populate: {
			path: "users",
			select: "name email dp",
			model: "User",
		},
	});
		res.status(201).json(message)
	} catch (error) {
		res.status(401);
		throw new Error(error.message);
	}
});

module.exports = { allMessages, sendMessage };
