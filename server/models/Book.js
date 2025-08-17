import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  number: Number,
  title: String,
  content: [String],
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    chapters: [chapterSchema],
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;