const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Profile = require("../models/Profile");


exports.resetPassword = async (req, res) => {
    const {email, newPassword} = req.body;
    // console.log(email, newPassword);
    
    const user = await User.findOne({email});
    
    if(!user) return res.status(400).json({message: "User Not Found"});
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // console.log(newPassword, hashedPassword);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({message: "Password changed successfully"});
}


exports.verifyEmailExist = async (req, res) => {
    const {email} = req.body;
    // console.log(email);
    const user = await User.findOne({email});
    // console.log(user);
    if(!user){
        return res.status(400).json({message: "User doesn't exist"});
    }

    res.status(200).json({message: "User exist"});
}

exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    // console.log(email, otp);
    if (!user || !user.otp || !user.otpExpires) {
        return res.status(400).json({ message: "OTP not requested" });
    }

    const isExpired = user.otpExpires < new Date();
    if (isExpired) return res.status(400).json({ message: "OTP expired" });

    const isMatch = await bcrypt.compare(otp, user.otp);
    // console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });


    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    // console.log(token);
    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Email verified successfully" });

}

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    // console.log(email);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); //10 mins;

    await user.save();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Job Portal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        html: `<h2>Your OTP is ${otp}</h2><p>Expires in 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email" });
}
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, experience, skills, agreeToTerms } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({ message: 'User already exists' });
            } else {
                await User.deleteOne({ email });
                console.log(`Unverified user with email ${email} deleted`);
            }
        }
        if (!agreeToTerms) {
            return res.status(400).json({ message: 'Please Agree to terms & Conditions' });
        }
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            experienceLevel: experience,
            skills,
            isVerified: false,
        });
        await newUser.save();
        const newProfile = new Profile({
            userId: newUser._id,
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });


    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(email);
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist. Please enter a valid email id" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) return res.status(401).json({ message: "Incorrect Password!" });


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.log("Login route err: ", err);
        return res.status(400).json({message: "Server error: "});
    }
}

exports.check = async (req, res) => {
    const mongoUser = await User.findOne({ _id: req.user.userId });
    res.status(200).json({ isLoggedIn: true, user: req.user, firstName: mongoUser.firstName, lastName: mongoUser.lastName});
}