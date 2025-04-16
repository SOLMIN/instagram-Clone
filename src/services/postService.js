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
  Timestamp: { type: Date, default: Date.now, index: true }, // Add an index on Timestamp
});

// Create Post Model
const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);

const deletePost = async (postId) => {
  try {
    await PostModel.findOneAndDelete({ id: postId });
    console.log(`Post with id ${postId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting post with id ${postId}:`, error);
    throw error;
  }
};

module.exports = { PostModel, deletePost };