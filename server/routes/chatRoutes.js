const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
	accessChat,
	fetchChats,
	createGroup,
	renameGroup,
	addToGroup,
	removeFromGroup,
} = require("../controllers/chatControllers");

router.route("/").post(auth, accessChat);
router.route("/").get(auth, fetchChats);
router.post("/createGroup", auth, createGroup);
router.put("/renameGroup", auth, renameGroup);
router.post("/addToGroup", auth, addToGroup);
router.post("/removeFromGroup", auth, removeFromGroup);

module.exports = router;
