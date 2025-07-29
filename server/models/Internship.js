const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Internship", internshipSchema);
