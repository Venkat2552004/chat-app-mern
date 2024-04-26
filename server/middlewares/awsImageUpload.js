const AWS = require("@aws-sdk/client-s3");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const s3 = new AWS.S3({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "gossimps-chat-app",
		// acl: "public-read",
		key: function (req, file, cb) {
			cb(
				null,
				"User Profile Pics/" + Date.now().toString() + "-" + file.originalname
			); // Set key to current timestamp
		},
	}),
}).single("dp");

const uploadImage = asyncHandler(async (req, res, next) => {
	upload(req, res, async (err) => {
		if (err) {
			console.error("Error uploading file:", err);
			res.status(500);
			throw new Error("Error Uploading File in AWS");
		}
		// since req.body.dp is a file type, i am storing url in new imageUrl field which will be included in req.body and req is passed to next() which is registerUser
		if (req.file) req.body.imageUrl = req.file.location;
		else req.body.imageUrl = undefined;
		console.log(`Successfully Uploaded image in aws`.bold.blue);
		next();
	});
});

module.exports = { uploadImage };
