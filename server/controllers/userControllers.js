const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("./generateToken");

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, dp } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("All fields are required");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("Existing User found on this email");
	}

	const user = await User.create({ name, email, password, dp });

	if (user) {
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

const authUser = asyncHandler(async (req, res) => {
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
        res.status(400)
        throw new Error("Invalid Credentials");
    }
});

module.exports = {registerUser, authUser};
