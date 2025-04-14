import { Router, Request, Response } from 'express';
import { PostModel } from '../services/postService';

const router: Router = Router(); // Explicitly annotate the type


// Add Post
router.post('/add', async (req: Request, res: Response) => {
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

// Fetch Posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().sort({ Timestamp: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

export default router;