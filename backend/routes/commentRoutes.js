const express = require('express')
const router = express.Router()

const {getComments, createComment, updateComment, deleteComment} = require('../controllers/commentController')

const protect = require('../middleware/authMiddleware')

router.get('/:postId/comments', getComments)
router.post('/:postId/comments', protect, createComment)
router.put('/comments/:id', protect, updateComment)
router.delete('/comments/:id', protect, deleteComment)

module.exports = router