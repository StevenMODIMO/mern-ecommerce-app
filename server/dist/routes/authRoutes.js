"use strict";
const { signupUser, loginUser } = require("../controllers/authControllers");
const router = require("express").Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
module.exports = router;
