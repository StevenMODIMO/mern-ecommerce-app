const mongoose = require("mongoose")

const buyerSchema = new mongoose.Schema({
	user_id: String,
	orders: [{
		product: String,
		price: Number,
		quantity: Number
	}],
	wishlist: [{
		product: String,
		price: Number,
		quantity: Number
	}]
})

module.exports = mongoose.model("Buyer", buyerSchema)