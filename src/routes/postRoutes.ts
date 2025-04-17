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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await PostModel.find()
      .sort({ Timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Delete Post
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await PostModel.findOneAndDelete({ id });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Add Comment
router.post('/:id/comment', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const comment = {
      id: Date.now().toString(),
      text,
      likes: 0,
    };

    const updatedPost = await PostModel.findOneAndUpdate(
      { id },
      { $push: { comments: comment } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Comment added successfully', post: updatedPost });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Like Post
router.post('/:id/like', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedPost = await PostModel.findOneAndUpdate(
      { id },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post liked successfully', post: updatedPost });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

export default router;

function lean() {
  throw new Error('Function not implemented.');
}
