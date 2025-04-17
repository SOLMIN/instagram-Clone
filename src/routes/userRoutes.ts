import { Router, Request, Response } from 'express';
import { UserModel } from '../services/addUsers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router: Router = Router(); // Explicitly annotate the type

// Fetch Users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// User Signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, password, name, avatar, bio } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      name,
      avatar: avatar || 'https://default-avatar.png',
      bio: bio || '',
      followers: 0,
      following: 0,
      posts: [],
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// User Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

export default router;