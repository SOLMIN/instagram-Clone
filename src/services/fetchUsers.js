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

const UserModel = mongoose.model('User', userSchema);

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

const fetchUsers = async () => {
  try {
    // Connect to the database using Mongoose
    await connectToMongoDB();

    // Fetch all users
    const users = await UserModel.find();
    console.log('Fetched users:', users);
    process.exit(0);
  } catch (error) {
    console.error('Error fetching users:', error);
    process.exit(1);
  } finally {
    // Close the Mongoose connection
    await mongoose.connection.close();
  }
};

fetchUsers();

module.exports = { fetchUsers };