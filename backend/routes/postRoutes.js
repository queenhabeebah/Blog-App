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
const upload = require("../middleware/multer")

// PRIVATE ROUTES (require login)
router.get("/user", protect, getUserPosts)
router.post('/', protect, createPost)
router.post('/', protect, upload.single("image"), createPost)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)

// PUBLIC ROUTES
router.get('/', getAllPosts)
router.get('/:id', getPostById)


module.exports = router