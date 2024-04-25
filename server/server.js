const express = require("express");
const connectToDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();

connectToDB();
// use express.json before any use statement
app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", () => {
	console.log(`API is working fine`.blue.bold);
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.blue.bold);
});
