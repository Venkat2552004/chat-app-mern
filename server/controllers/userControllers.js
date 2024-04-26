const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("./generateToken");

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, imageUrl } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("All fields are required");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("Existing User found on this email");
	}

	const user = await User.create({
		name,
		email,
		password,
		dp: imageUrl,
	});

	if (user) {
		console.log(`New user with email : ${user.email} is created`.bold.bgCyan);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			dp: user.dp,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Unable to create a user");
	}
});

const authLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are required");
	}
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	if (await user.matchPassword(password)) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			dp: user.dp,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

const allUsers = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {$and:[
			{_id:{$regex : "^0$0"}} // if no keyword is matched, then storing a regex that difenitely not matches with any object
		]};
	// if no user is matched with the keyword, then results empty
	const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
	res.status(201).json(users);
});

module.exports = { registerUser, authLogin, allUsers };
