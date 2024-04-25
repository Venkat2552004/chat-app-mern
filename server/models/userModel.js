const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		dp: {
			type: String,
			default:
				"https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg",
		},
	},
	{
		timestamps: true,
	}
);

// using arrow function here is not working for below
// for mongoose don't use arrow functions
userSchema.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = new mongoose.model("User", userSchema);
