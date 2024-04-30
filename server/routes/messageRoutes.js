const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {sendMessage, allMessages} = require("../controllers/messageControllers")

router.route("/").post(auth, sendMessage);
router.route("/:chatId").get(auth, allMessages);

module.exports = router;