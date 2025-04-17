const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  posts: [
    {
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
    },
  ],
});

// Create User Model
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

// Mock Users Data
const mockUsers = [
  {
    id: '1',
    username: 'john_doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    bio: 'Photographer | Traveler | Dreamer',
    followers: 1200,
    following: 300,
    posts: [
      {
        id: '1',
        username: 'john_doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop',
        caption: 'Enjoying the beautiful outdoors!',
        likes: 15,
        comments: [
          { id: 'c1', text: 'Looks amazing!', likes: 3 },
          { id: 'c2', text: 'Wish I was there!', likes: 2 },
        ],
        isVerified: true,
        timeAgo: '34 min',
      },
    ],
  },
  // Add more mock users as needed
];

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    if (!uri) throw new Error('MongoDB URI is not defined in environment variables');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Add Mock Users to the Database
const addMockUsers = async () => {
  try {
    await connectToMongoDB();
    await UserModel.insertMany(mockUsers);
    console.log('Mock users added successfully!');
  } catch (error) {
    console.error('Error adding mock users:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

// Uncomment the following line to add mock users
// addMockUsers();

module.exports = { UserModel, addMockUsers };