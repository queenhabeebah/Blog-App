const express = require('express')
const router = express.Router()

const {getComments, createComment, updateComment, deleteComment} = require('../controllers/commentController')

const protect = require('../middleware/authMiddleware')

router.get('/posts/:postId/comments', getComments)
router.post('/:postId', protect, createComment)
router.put('/:id', protect, updateComment)
router.delete('/:id', protect, deleteComment)

module.exports = router