const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  const { text } = req.body;
  const postId = req.params.postId

  try {
    const newComment = await Comment.create({
      post: postId,
      user: req.user._id,
      text,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create comment" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to edit this comment" });
    }
    comment.comment = req.body.comment || comment.comment
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('post');
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString() && comment.post.author.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "Not authorized to delete this comment"})
    }

    await comment.deleteOne()
    res.json({message: "Comment deleted successfully"})
  } catch (error) {
    res.status(500).json({message: "Error deleting comment"})
  }
};
