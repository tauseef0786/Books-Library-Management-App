import MyBook from '../models/MyBook.js';
import Book from '../models/Book.js';

// @desc    Get user's books
// @route   GET /api/mybooks
// @access  Private
const getMyBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id }).populate('bookId');
    res.json(myBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add book to user's collection
// @route   POST /api/mybooks/:bookId
// @access  Private
const addMyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Check if book is already in user's collection
    const existingMyBook = await MyBook.findOne({
      userId: req.user._id,
      bookId: req.params.bookId,
    });

    if (existingMyBook) {
      res.status(400);
      throw new Error('Book already in your collection');
    }

    const myBook = new MyBook({
      userId: req.user._id,
      bookId: req.params.bookId,
      status: 'Want to Read',
    });

    const createdMyBook = await myBook.save();
    res.status(201).json(createdMyBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update book status
// @route   PATCH /api/mybooks/:bookId/status
// @access  Private
const updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Want to Read', 'Currently Reading', 'Read'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const myBook = await MyBook.findOne({
      userId: req.user._id,
      bookId: req.params.bookId,
    });

    if (!myBook) {
      res.status(404);
      throw new Error('Book not found in your collection');
    }

    myBook.status = status;
    const updatedMyBook = await myBook.save();
    res.json(updatedMyBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update book rating
// @route   PATCH /api/mybooks/:bookId/rating
// @access  Private
const updateBookRating = async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      res.status(400);
      throw new Error('Rating must be between 1 and 5');
    }

    const myBook = await MyBook.findOne({
      userId: req.user._id,
      bookId: req.params.bookId,
    });

    if (!myBook) {
      res.status(404);
      throw new Error('Book not found in your collection');
    }

    myBook.rating = rating;
    const updatedMyBook = await myBook.save();
    res.json(updatedMyBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getMyBooks, addMyBook, updateBookStatus, updateBookRating };