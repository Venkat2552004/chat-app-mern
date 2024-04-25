const express = require("express");
const { chats } = require("./data/data");
const connectToDB = require('./config/db')
const colors = require('colors')
require("dotenv").config();
const app = express();


connectToDB();



const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.bgBlue);
});
