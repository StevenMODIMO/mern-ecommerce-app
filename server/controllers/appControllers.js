require("dotenv").config();
const Seller = require("../models/sellerModel");
const Buyer = require("../models/buyerModel");
const Product = require("../models/productModel");
const User = require("../models/authModel");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const path = require("path");
const { ObjectId } = require("mongodb")

// Admin Controllers

const getAllProducts = async (req, res) => {
  try {
    const docs = await Product.find();
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error); 
  }
};

const registerSeller = async (req, res) => {
  const { business_name, address } = req.body;
  const user_id = new mongoose.Types.ObjectId(req.user);

  if (!business_name || !address) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  const exists = await Seller.findOne({ business_name });
  if (exists) {
    return res.status(400).json({ error: "Name already taken" });
  }

  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: user_id },
      { role: "Seller" },
      { new: true }
    );
    const newSeller = await Seller.create({
      user_id: user_id,
      business_name: business_name,
      address: address,
    });
    res.status(200).json(updateUser.role);
  } catch (error) {
    res.status(400).json(error);
  }
};

const newProduct = async (req, res) => {
  const user_id = req.user;
  const { product_name, description, price, quantity, currency, category } =
    req.body;
  if (
    !req.file ||
    !product_name ||
    !description ||
    !price ||
    !quantity ||
    !currency ||
    !category
  ) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  const imagePath = path.normalize(req.file.path).replace(/\\/g, "/");

  try {
    const newItem =  {
      imagePath: imagePath,
      product_name: product_name,
      description: description,
      price: price,
      quantity: quantity,
      currency: currency,
      category: category,
    }
    const newProduct = await Seller.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          products: newItem,
        },
      },
      { new: true }
    );
    const newID = {pid: ""}
    const n = newProduct.products.filter(p => {
      if(p.product_name == newItem.product_name) {
        newID.pid = p.id
      }
    })
    const product = await Product.create({
      product_id: newID.pid,
      from: newProduct.business_name,
      imagePath: imagePath,
      product_name: product_name,
      description: description,
      price: price,
      quantity: quantity,
      currency: currency,
      category: category,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const editProduct = async (req, res) => {
  const user_id = req.user;
  const { product_name, description, price, quantity, currency, category } =
    req.body;
  if (
    !req.file ||
    !product_name ||
    !description ||
    !price ||
    !quantity ||
    !currency ||
    !category
  ) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  const imagePath = path.normalize(req.file.path).replace(/\\/g, "/");

  try {
    const editedProduct = await Seller.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          products: {
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            quantity: quantity,
            currency: currency,
            category: category,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(editedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getProducts = async (req, res) => {
  const user_id = req.user;
  try {
    const products = await Seller.findOne({ user_id });
    res.status(200).json(products.products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getProductById = async (req, res) => {
  const user_id = req.user;
  try {
    const { id } = req.params;
    const updated = await Seller.findOne({ user_id: user_id });
    updated.products.filter((product) => {
      if (product._id == id) {
        res.status(200).json(product);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const getImage = async (req, res) => {
  try {
    const image = path.join(__dirname, "..", "images", req.params.filename);
    res.sendFile(image);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const deletedProduct = await Seller.findOneAndUpdate(
      { user_id: user_id },
      {
        $pull: {
          products: {
            _id: id,
          },
        },
      },
      { new: true }
    );
    const deleteFromProduct = await Product.findOneAndDelete(
      { product_id: id },
      { new: true }
    );
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOrders = async (req, res) => {
  const { name } = req.params;
  try {
    const business_orders = await Buyer.find({ "orders.business_name": name });
    res.status(200).json(business_orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

// User Controllers

const registerBuyer = async (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.user);
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: user_id },
      { role: "Buyer" },
      { new: true }
    );
    const newUser = await Buyer.create({ user_id: user_id });
    res.status(200).json(updateUser.role);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Product.findOne({ _id: id });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addToCart = async (req, res) => {
  const user_id = req.user;
  const { imagePath, product_name, description, price, currency, quantity,rate, product_id, business_name } =
    req.body;

  if (!quantity) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  try {
    const newProduct = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          cart: {
            from: business_name,
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            currency: currency,
            quantity: quantity,
          },
        },
      },
      { new: true }
    );

    const rateProduct = await Product.findOneAndUpdate(
      {product_id: product_id},
      {
        $push: {
        rates: {
          rate: rate,
          user: user_id
        }
      }}
    )

    const rateToSeller = await Seller.findOneAndUpdate({business_name: business_name}, {
      $push: {
        rates: {
          product_id: product_id,
          rate: rate
        }
      }
    })

    const remove = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $pull: {
          wishlist: {
            _id: newProduct._id,
          },
        },
      }
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCartProducts = async (req, res) => {
  const user_id = req.user;
  try {
    const orders = await Buyer.findOne({ user_id: user_id });
    const userOrders = orders.cart;
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCartProduct = async (req, res) => {
  const user_id = req.user;
  const { id } = req.params;
  try {
    const orders = await Buyer.findOne({ user_id: user_id });
    const cart = orders.cart;
    cart.filter((order) => {
      if (order._id == id) {
        res.status(200).json(order);
      }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const deletedProduct = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $pull: {
          cart: {
            _id: id,
          },
        },
      }
    );
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addWishList = async (req, res) => {
  const user_id = req.user;
  const { product_name, description, price, currency, quantity, imagePath } =
    req.body;
  if (!quantity) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  try {
    const newProduct = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          wishlist: {
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            currency: currency,
            quantity: quantity,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getWishlistProducts = async (req, res) => {
  const user_id = req.user;
  try {
    const wishList = await Buyer.findOne({ user_id: user_id });
    const userWishList = wishList.wishlist;
    res.status(200).json(userWishList);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSingleWishListProduct = async (req, res) => {
  const user_id = req.user;
  const { id } = req.params;
  try {
    const wishList = await Buyer.findOne({ user_id: user_id });
    const userWishList = wishList.wishlist;
    userWishList.filter((uw) => {
      if (uw._id == id) {
        res.status(200).json(uw);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeWishList = async (req, res) => {
  const user_id = req.user;
  const { id } = req.params;
  try {
    const remove = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $pull: {
          wishlist: {
            _id: id,
          },
        },
      }
    );
    res.status(200).json(remove);
  } catch (error) {
    res.status(400).json(error);
  }
};

const intitiatePayment = async (req, res) => {
  const user_id = req.user;
  const {
    cardNumber,
    cardExpMonth,
    cardExpYear,
    cardCvc,
    product_name,
    description,
    price,
    currency,
    quantity,
    imagePath,
    prevID,
    address,
    from,
    business_name
  } = req.body;
  if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCvc) {
    return res.status(400).json({ error: "All fields must be filled." });
  }
  try {
    const payment = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCvc,
      },
    });

    const sendToInvoice = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          invoices: {
            cardNumber: cardNumber,
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            currency: currency,
            quantity: quantity,
            prevID: prevID
          },
        },
      },
      { new: true }
    );

    const remove = await Buyer.findOneAndUpdate(
      { user_id: user_id },
      {
        $pull: {
          cart: {
            _id: new ObjectId(prevID),
          },
        },
      }
    );

    const sendToSellerInvoice = await Seller.findOneAndUpdate(
      {business_name: business_name},
      {
        $push: {
          orders: {
            from: from,
            imagePath: imagePath,
            product_name: product_name,
            description: description,
            price: price,
            currency: currency,
            quantity: quantity,
            address: address,
          }
        }
      }
    )
    
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(400).json( error);
  }
};

const generateBuyerInvoice = async (req, res) => {
  const user_id = req.user
  
  try {
    const invoice = await Buyer.findOne({ user_id: user_id})
    const invoices = invoice.invoices
    res.status(200).json(invoices)
  } catch(error) {
    res.status(400).json(error)
  }
}

const generateSellerInvoice = async (req, res) => {
  const user_id = req.user
  const invoice = await Seller.findOne({ user_id: user_id})
  const invoices = invoice.orders
  res.status(200).json(invoices)
}

module.exports = {
  getAllProducts,
  registerSeller,
  registerBuyer,
  getSingleProduct,
  newProduct,
  editProduct,
  getProducts,
  getProductById,
  getImage,
  deleteProducts,
  addToCart,
  getCartProducts,
  getCartProduct,
  removeFromCart,
  addWishList,
  getWishlistProducts,
  getSingleWishListProduct,
  removeWishList,
  getOrders,
  intitiatePayment,
  generateBuyerInvoice,
  generateSellerInvoice
};
