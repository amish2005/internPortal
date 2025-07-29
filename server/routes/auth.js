const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {signup, login, sendOtp, verifyOtp, check, logout, verifyEmailExist, resetPassword} = require('../controllers/authController');
const {verifyToken} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/signup", signup);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", verifyToken, check);

router.post("/email", verifyEmailExist);

router.post("/resetpassword", resetPassword);

module.exports = router;