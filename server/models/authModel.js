const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	role: {type: String, default: "None"}
})

userSchema.statics.signup = async function(username, email, password) {
	if(!username || !email || !password) {
		throw Error("All fields must be filled")
	}

	if(!validator.isEmail(email)) {
		throw Error("Invalid Email")
	}

	if(!validator.isStrongPassword(password)) {
		throw Error("Weak Password")
	}

	const exists = await this.findOne({email})

	if(exists) {
		throw Error("User exists")
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({username, email, password: hash})
	return user
}

userSchema.statics.login = async function(email, password) {
	if(!email || !password) {
		throw Error("All fields must be filled")
	}

	const user = await this.findOne({email})

	if(!user) {
		throw Error("Incorrect email")
	}

	const match = await bcrypt.compare(password, user.password)

	if(!match) {
		throw Error("Incorrect Password")
	}

	return user
}

module.exports = mongoose.model("Auth", userSchema)