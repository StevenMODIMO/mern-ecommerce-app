const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await Auth.signup(username, email, password);
    const token = createToken(user._id);
    const role = user.role
    const name = user.username
    res.status(200).json({ email, token, role, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    const token = createToken(user._id);
    const role = user.role
    const name = user.username
    res.status(200).json({ email, token, role, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
