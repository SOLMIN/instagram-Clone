import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase the limit to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For URL-encoded data

// Connect to MongoDB
mongoose.set('strictQuery', false); // Disable deprecated warnings
const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error('MongoDB URI is not defined in environment variables');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 30000 });
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Centralized Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server after connecting to MongoDB
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

export {};
