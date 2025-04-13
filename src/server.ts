const express = require('express');
const mongoose = require('mongoose');
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

// Add Mock Users API
app.post('/api/add-mock-users', async (req: any, res: any): Promise<void> => {
  try {
    await addMockUsers(); // Call the addMockUsers function
    res.status(200).json({ message: 'Mock users added successfully!' });
  } catch (error) {
    console.error('Error adding mock users:', error);
    res.status(500).json({ error: 'Failed to add mock users' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Add this line to make the file a module
export {};
