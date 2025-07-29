const mongoose = require("mongoose");
const Internship = require("./Internship");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: String,
    experienceLevel: String,
    skills: {
    type: [String], 
    default: [],
    },
    isVerified: {type: Boolean, default: false},
    otp: String,
    otpExpires: Date,
    createdAt: {type: Date, default: Date.now},
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Internship" }],
});

module.exports = mongoose.model("User", userSchema);