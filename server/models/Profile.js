const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
    unique: true,
  },
  avatar: String,
  name: String,
  title: String,
  location: String,
  bio: String,
  github: String,
  linkedin: String,
  website: String,
  skills: [String],
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      current: { type: Boolean },
      description: String
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      startDate: String,
      endDate: String,
      current: { type: Boolean },
      description: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
