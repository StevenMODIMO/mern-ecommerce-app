const Seller = require("../models/sellerModel")
const Buyer = require("../models/buyerModel")
const User = require("../models/authModel")
const mongoose = require("mongoose")

// File Controllers


const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'images')
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
})



// Admin Controllers


const registerSeller = async (req, res) => {
	const { business_name, address } = req.body
	const user_id = new mongoose.Types.ObjectId(req.user)
	try {
		if(!business_name || !address) {
			return res.status(400).json({error: "All fields must be filled."})
		}
		const exists = await Seller.findOne({business_name})
		if(exists) {
			return res.status(400).json({error: "Name already taken"})
		}
		const updateUser = await User.findOneAndUpdate({ _id: user_id}, { role: "Seller"}, { new: true})
		const newSeller = await Seller.create({ user_id: user_id, business_name: business_name, address: address })
		res.status(200).json("Created new Business " + newSeller)
	} catch(error) {
		res.status(400).json(error)
	}
}


const newProduct = async (req, res) => {
	const user_id = req.user
	const { product_name, description, price, quantity, currency, category } = req.body
	if(!product_name || !description || !price || !quantity || !currency || !category) {
		return res.status(400).json({error: "All fields must be filled."})
	}

	try{
		const newProduct = await Seller.findOneAndUpdate({ user_id: user_id}, { $push: { products: {
			product_name: product_name,
			description: description,
			price: price,
			quantity: quantity,
			currency: currency,
			category: category
		}}}, { new: true })
		res.status(200).json(newProduct)
	} catch(error) {
		res.status(400).json(error)
	}
}


const getProducts = async (req, res) => {
	const user_id = req.user
	try {
		const products = await Seller.findOne({user_id})
		res.status(200).json(products)
	} catch(error) {
		res.status(400).json(error)
	}
}
  

const deleteProducts = async (req, res) => {
	const { id } = req.params
	const user_id = req.user
	try {
		const deletedProduct = await Seller.findOneAndUpdate({ user_id: user_id }, { $pull: { products: {
			_id: id
		}}})
		res.status(200).json(deletedProduct)
	} catch(error) {
		res.status(400).json(error)
	}
}


const getOrders = async (req, res) => {}



// User Controllers


const registerBuyer = async (req, res) => {
	const user_id = new mongoose.Types.ObjectId(req.user)
	try {
		const updateUser = await User.findOneAndUpdate({ _id: user_id}, { role: "Buyer"}, { new: true})
		const newUser = await Buyer.create({ user_id: user_id })
		res.status(200).json(newUser)
	} catch(error) {
		res.status(400).json(error)
	}
}


const placeOrder = async (req, res) => {
	const user_id = req.user
	const { product_name, description, price, quantity, currency, category } = req.body
	try{
		const newProduct = await Buyer.findOneAndUpdate({ user_id: user_id}, { $push: { orders: {
			product_name: product_name,
			description: description,
			price: price,
			quantity: quantity
		}}}, { new: true })
		const sellerOrder = await Seller.findOneAndUpdate()
		res.status(200).json(newProduct)
	} catch(error) {
		res.status(400).json(error)
	}
}


const completeOrder = async (req, res) => {}


const cancelOrder = async (req, res) => {
	const { id } = req.params
	const user_id = req.user
	try {
		const deletedProduct = await Buyer.findOneAndUpdate({ user_id: user_id }, { $pull: { orders: {
			_id: id
		}}})
		res.status(200).json(deletedProduct)
	} catch(error) {
		res.status(400).json(error)
	}
}


const addWishList = async (req, res) => {
	const user_id = req.user
	const { product_name, description, price, quantity, currency, category } = req.body
	try{
		const newProduct = await Buyer.findOneAndUpdate({ user_id: user_id}, { $push: { wishlist: {
			product_name: product_name,
			description: description,
			price: price,
			quantity: quantity
		}}}, { new: true })
		res.status(200).json(newProduct)
	} catch(error) {
		res.status(400).json(error)
	}
}


const rateProduct = async (req, res) => {
	const { product_id } = req.body
	const user_id = req.user
	const { business_id } = req.body
	const { rate } = req.body
	try {
		const result = await Seller.findOneAndUpdate(
            { _id: business_id, 'products._id': product_id },
            { $push: { 'products.$.rates': { rate: rate, user: user_id } } },
            { new: true }
);
		res.status(200).json(result)
	} catch(error) {
		res.status(400).json(error)
	} 
}

  

module.exports = { 
	registerSeller, 
    registerBuyer, 
    newProduct, 
    getProducts, 
    deleteProducts,
    placeOrder,
    cancelOrder,
    addWishList, 
    rateProduct 
}  