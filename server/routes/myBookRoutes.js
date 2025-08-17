import express from 'express';
import {
  getMyBooks,
  addMyBook,
  updateBookStatus,
  updateBookRating,
} from '../controllers/myBookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMyBooks);
router.post('/:id', protect, addMyBook);
router.patch('/:id/status', protect, updateBookStatus);
router.patch('/:id/rating', protect, updateBookRating);

export default router;