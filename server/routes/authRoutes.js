
import express from 'express'
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const protectRoutes = express.Router()

protectRoutes.post('/register', registerUser)
protectRoutes.post('/login', loginUser)
protectRoutes.get('/logout', logoutUser)
protectRoutes.get('/me', protect, getMe)

export default protectRoutes