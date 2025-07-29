const express = require("express");
const { getInternships, saveInternship, unsaveInternship, getSaved} = require("../controllers/jobController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-internships", getInternships);

router.post("/save/:jobId", verifyToken, saveInternship);

router.delete("/unsave/:jobId", verifyToken, unsaveInternship);

router.get("/saved-jobs", verifyToken, getSaved);

module.exports = router;