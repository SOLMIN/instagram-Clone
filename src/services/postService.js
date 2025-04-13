const mongoose = require('mongoose');

// Define Post Schema
const postSchema = new mongoose.Schema({
  id: String,
  username: String,
  avatar: String,
  image: String,
  video: String,
  caption: String,
  likes: Number,
  comments: [
    {
      id: String,
      text: String,
      likes: Number,
    },
  ],
  isVerified: Boolean,
  timeAgo: String,
});

// Create Post Model
const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = { PostModel };