const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        name: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        avatar: String,
        role: String,
    },
    message: String,
    room: String,
    tags: [String],
    likes: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
