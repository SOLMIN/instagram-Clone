const mongoose = require('mongoose');

// Define Post Schema
const postSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  caption: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true },
      likes: { type: Number, default: 0 },
    },
  ],
  isVerified: { type: Boolean, default: false },
  timeAgo: { type: String, required: true },
  Timestamp: { type: Date, default: Date.now },
});

// Create Post Model
const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = { PostModel };