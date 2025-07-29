const User = require("../models/User");
const Profile = require("../models/Profile");

exports.uploadAvatar = async (req, res) => {
    try {
        const filePath = `/uploads/${req.file.filename}`;
        return res.status(200).json({message: "Upload successfull", filePath});
    } catch (err) {
        console.error(err);
    return res.status(500).json({ error: "Failed to upload image" });
    };
}

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ profile });
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error" });
    }
}


exports.saveProfile = async (req, res) => {
    try {
        const { profileData } = req.body;
        // console.log(req.user.userId);
        const [firstName, lastName] = profileData.name.split(" ");
        const existingUser = await User.findOneAndUpdate({ _id: req.user.userId }, {
            firstName: firstName,
            lastName: lastName,
        });

        const updatedProfile = await Profile.findOneAndUpdate({ userId: req.user.userId },
            {
                userId: req.user.userId,
                name: profileData.name,
                title: profileData.title,
                location: profileData.location,
                github: profileData.github,
                linkedin: profileData.linkedin,
                skills: profileData.skills,
                experience: profileData.experience,
                avatar: profileData.avatar,
                education: profileData.education,
                bio: profileData.bio,
                website: profileData.website,
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        await updatedProfile.save();
        // console.log("hey2");
        res.status(201).json({ message: 'Profile created successfully', profile: updatedProfile });
    } catch (err) {
        console.error("Profile Saving:", err);
        res.status(500).json({ message: 'Server error' });
    }
}