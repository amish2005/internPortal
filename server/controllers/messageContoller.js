const Message = require('../models/Message');
const Profile = require('../models/Profile');
const User = require('../models/User');


exports.fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.postMessage = async (req, res) => {
  try {

    const userProf = await Profile.findOne({ userId: req.user.userId });

    const newMsg = new Message({
      user: {
        name: userProf.name,   
        userId: req.user.userId,
        avatar: userProf.avatar || userProf.name[0],
        role: userProf.title || "Member",
      },
      message: req.body.message,
      room: req.body.room,
      tags: req.body.tags || []
    });

    const savedMsg = await newMsg.save();
    res.json(savedMsg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}