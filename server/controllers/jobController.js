const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const User = require("../models/User");
const Internship = require("../models/Internship");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

exports.getInternships = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("jobPortal");
        const internships = await db.collection("internships").find({}).toArray();
        // console.log(internships);
        res.json(internships);
    } catch (err) {
        console.log("Error in getting Internships", err);
    }
}


exports.saveInternship = async (req, res) => {
    try {
        const { jobId } = req.params;
        const user = await User.findById(req.user.userId);
        // console.log(user);
        const jobObjectId = new mongoose.Types.ObjectId(jobId);
        if (!user.savedJobs.includes(jobObjectId)) {
            user.savedJobs.push(jobObjectId);
            await user.save();
        }

        res.json({ success: true, message: "Job saved." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving job." });
    }
}

exports.unsaveInternship = async (req, res) => {
    try {
        const { jobId } = req.params;
        const user = await User.findById(req.user.userId);

        user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
        await user.save();

        res.json({ success: true, message: "Job unsaved." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error unsaving job." });
    }
}

exports.getSaved = async (req, res) => {
    try {
    const user = await User.findById(req.user.userId).populate("savedJobs");
    res.json(user.savedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching saved jobs." });
  }
}
