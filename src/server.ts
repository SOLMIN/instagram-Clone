const express = require('express');
const mongoose = require('mongoose');
const { PostModel } = require('./services/postService'); // Import PostModel
require('dotenv').config(); // Load environment variables

const { UserModel } = require('./services/addUsers');
const { addMockUsers } = require('./services/addUsers'); // Import addMockUsers

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.set('bufferCommands', false); // Disable buffering

mongoose.connect("mongodb+srv://solmin:9Kx3xZBugjxIwHuH@cluster5.jllzqu7.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Set timeout here
})
  .then(() => console.log('Connected to MongoDB using Mongoose'))
  .catch((error: any) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  });

// Root Route
app.get('/', async (req: any, res: any): Promise<void> => {
  try {
    const users = await UserModel.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' }); // Send an error response
  }
});

// Fetch Users API
app.get('/api/users', async (req: any, res: any): Promise<void> => {
  try {
    const users = await UserModel.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
    // console.log('Users fetched successfully:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' }); // Send an error response
  }
});

// Add Post API
app.post('/api/add-post', async (req: any, res: any): Promise<void> => {
  try {
    const post = req.body;

    // Validate request body
    if (!post || !post.id || !post.username || !post.caption) {
      return res.status(400).json({ error: 'Post data is incomplete' });
    }

    // Create a new post
    const newPost = new PostModel(post);

    // Save the post to the database
    await newPost.save();

    res.status(200).json({ message: 'Post added successfully!', post: newPost });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Failed to add post' });
  }
});

// Fetch Posts API
app.get('/api/posts', async (req: any, res: any): Promise<void> => {
  try {
    const posts = await PostModel.find(); // Fetch all posts from the database
    res.status(200).json(posts); // Send the posts as a JSON response
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Add this line to make the file a module
export {};
