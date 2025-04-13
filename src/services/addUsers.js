const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://solmin:9Kx3xZBugjxIwHuH@cluster5.jllzqu7.mongodb.net/test?retryWrites=true&w=majority";

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  name: String,
  bio: String,
  followers: Number,
  following: Number,
  posts: [
    {
      id: String,
      username: String,
      avatar: String,
      image: String,
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
    },
  ],
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);const mockUsers = [
  {
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
  {
    username: 'jane_doe',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Doe',
    bio: 'City explorer and coffee lover ☕',
    followers: 800,
    following: 150,
    posts: [
      {
        id: '2',
        username: 'jane_doe',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        image: 'https://example.com/image.jpg',
        caption: 'City vibes!',
        likes: 20,
        comments: [
          { id: 'c3', text: 'Love the view!', likes: 5 },
          { id: 'c4', text: 'Great shot!', likes: 4 },
        ],
        isVerified: false,
        timeAgo: '1h',
      },
    ],
  },
];

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const addMockUsers = async () => {
  try {
    // Connect to the database using Mongoose
    await connectToMongoDB();

    // Insert mock users
    await UserModel.insertMany(mockUsers);
    console.log('Mock users added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding mock users:', error);
    process.exit(1);
  } finally {
    // Close the Mongoose connection
    await mongoose.connection.close();
  }
};
// addMockUsers()


module.exports = { UserModel, addMockUsers };