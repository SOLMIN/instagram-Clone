import { Router, Request, Response } from 'express';
import { UserModel } from '../services/addUsers';

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

export default router;