import { Router, Request, Response } from 'express';
import { PostModel } from '../services/postService';

const router: Router = Router(); // Explicitly annotate the type


// Add Post
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { id, username, caption } = req.body;

    // Validate required fields
    if (!id || !username || !caption) {
      return res.status(400).json({ error: 'Post data is incomplete' });
    }

    // Create and save the post directly
    const newPost = await PostModel.create({ id, username, caption });

    res.status(201).json({ message: 'Post added successfully!', post: newPost });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Failed to add post' });
  }
});

// Fetch Posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

export default router;