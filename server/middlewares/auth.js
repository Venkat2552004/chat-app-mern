const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const auth = asyncHandler(async (req, res, next) => {
	const fullToken = req.headers.authorization;
	if (fullToken && fullToken.startsWith("Bearer")) {
		try {
			// Ex of fullToken : Bearer jcbICNJDVHIDBxcbsdbcailb
			const token = fullToken.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select("-password");
			next();
		} catch (err) {
			res.status(400);
			throw new Error("Not Authorized. who are you rey?");
		}
	} else {
		res.status(400);
		throw new Error("Not Authorized. where is the token rey?");
	}
});

module.exports = { auth };
