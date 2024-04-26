const express = require("express");
const { uploadImage } = require("../middlewares/awsImageUpload");
const {
	registerUser,
	authLogin,
	allUsers,
} = require("../controllers/userControllers");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.route("/signup").post(uploadImage, registerUser);
router.post("/login", authLogin);
router.get("/", auth, allUsers);

module.exports = router;
