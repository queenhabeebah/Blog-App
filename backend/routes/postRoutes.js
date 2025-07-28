const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts
} = require("../controllers/postController");

const protect = require('../middleware/authMiddleware')

// PUBLIC ROUTES
router.get('/', getAllPosts)
router.get('/:id', getPostById)

// PRIVATE ROUTES (require login)
router.post('/', protect, createPost)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)
router.get("/user", protect, getUserPosts)
module.exports = router