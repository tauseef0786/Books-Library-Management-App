import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route files
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import myBookRoutes from './routes/myBookRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());


// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/mybooks', myBookRoutes);



const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});