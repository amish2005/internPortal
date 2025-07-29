const express = require("express");
const { saveProfile, getProfile, uploadAvatar} = require("../controllers/profileContoller");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../middlewares/upload");


router.post("/save-profile", verifyToken, saveProfile);

router.get("/get-profile", verifyToken, getProfile);

router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);


module.exports = router;