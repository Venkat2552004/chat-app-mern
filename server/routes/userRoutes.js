const express = require("express");
const {uploadImage} = require("../middlewares/awsImageUpload");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/signup").post(uploadImage, registerUser);
router.post("/login", authUser);

module.exports = router;
