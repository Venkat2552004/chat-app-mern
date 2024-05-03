const express = require("express");
const connectToDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
require("dotenv").config();
const app = express();

connectToDB();
// use express.json before any use statement
app.use(express.json());



//handle user routes
app.use("/api/user", userRoutes);
//handle chat routes
app.use("/api/chat", chatRoutes);
//handle message routes
app.use("/api/message", messageRoutes);

app.get("/", () => {
	console.log(`API is working fine`.blue.bold);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const PORT = process.env.SERVER_PORT || 3000;

// saving in server to send to socket io
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.blue.bold);
});

const io = require("socket.io")(server, {
	pingTimeout: 30000,
	cors: {
		origin: "http://localhost:5173",
	},
});

io.on("connection", (socket) => {
	console.log(`Socket Connection established successfully`.blue);
	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User Joined Room: " + room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;
		if (!chat.users) return console.log("chat.users not defined");
		chat.users.forEach((user) => {
			if (user._id == newMessageRecieved.sender._id) return;
			socket.in(user._id).emit("message received", newMessageRecieved);

		});
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
});
