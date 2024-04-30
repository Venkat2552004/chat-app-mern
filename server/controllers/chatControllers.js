const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	var chat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate("users", "-password")
		.populate("latestMessage");

	var chat = await User.populate(chat, {
		path: "latestMessage.sender",
		select: "name email dp",
	});

	if (chat.length > 0) {
		res.status(201).send(chat[0]);
		return;
	}

	//control reaches here only if (if condition) fails
	// if no chat exist between 2 users, then create a new chat now
	try {
		var chat = await Chat.create({
			chatName: "1-2-1 Chat",
			isGroupChat: false,
			users: [req.user._id, userId],
		});
		const chatDetails = await Chat.findOne({ _id: chat._id }).populate(
			"users",
			"-password"
		);
		res.status(201).send(chatDetails);
	} catch (err) {
		res.status(400);
		throw new Error("Failed to create new chat");
	}
});

const fetchChats = asyncHandler(async (req, res) => {
	try {
		Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate("users", "-passowrd")
			.populate("admin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 })
			.then(async (result) => {
				result = await User.populate(result, {
					path: "latestMessage.sender",
					select: "name email dp",
				});
				res.status(201).send(result);
			});
	} catch (err) {
		res.status(400);
		throw new Error("Unable to fetch chats");
	}
});

const createGroup = asyncHandler(async (req, res) => {
	var users = JSON.parse(req.body.users);
	users.push(req.user);
	try {
		const groupChat = await Chat.create({
			chatName: req.body.chatName,
			users: users,
			isGroupChat: true,
			admin: req.user,
		});
		const groupChatDetails = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("admin", "-password");
		console.log(`New Group Chat : ${req.body.chatName} is created`.bgMagenta);
		res.status(201).send(groupChatDetails);
	} catch (err) {
		res.status(400);
		throw new Error("Unable to create a group chat");
	}
});

const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;
	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{ chatName },
		{ new: true }
	)
		.populate("users", "-password")
		.populate("admin", "-password");
	if (updatedChat) {
		res.status(201).json(updatedChat);
	} else {
		res.status(400);
		throw new Error("Chat not Found");
	}
});
const addToGroup = asyncHandler(async (req, res) => {
	const { chatId } = req.body;
	const userIds = JSON.parse(req.body.userIds);
	const usersAdded = await Chat.findByIdAndUpdate(
		chatId,
		{ $push: { users: { $each: userIds } } },
		{ new: true }
	)
		.populate("users", "-password")
		.populate("admin", "-password");
	if (usersAdded) {
		res.status(201).json(usersAdded);
	} else {
		res.status(400);
		throw new Error("Failed to add User");
	}
});

const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;
	const userRemoved = await Chat.findByIdAndUpdate(
		chatId,
		{ $pull: { users: userId } },
		{ new: true }
	)
		.populate("users", "-password")
		.populate("admin", "-password");
	if (userRemoved) {
		res.status(201).json(userRemoved);
	} else {
		res.status(400);
		throw new Error("Failed to remove user");
	}
});

module.exports = {
	accessChat,
	fetchChats,
	createGroup,
	renameGroup,
	addToGroup,
	removeFromGroup,
};
