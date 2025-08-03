const Post = require("../models/Post");
const { uploadToCloudinary } = require ("../utils/cloudinary")

exports.createPost = async (req, res) => {
console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { title, content, tags } = req.body;


  try {
    let imageUrl = ""
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer)
      imageUrl = uploadResult.secure_url
    }

    const post = await Post.create({
      title,
      content,
      tags,
      image: imageUrl,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("ERROR CREATING POST",error.message);
    res.status(500).json({ message: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

exports.getUserPosts = async (req, res) => {
  try{
    const posts = await Post.find({ author: req.user._id })
    res.json(posts)
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Server error"})
  }
}

exports.updatePost = async (req, res) => {
  try {
    let imageUrl = ""
    if(req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path)
      imageUrl = uploadResult.secure_url
    }
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to edit this post" });
    }

    const { title, content, tags, image } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.image = imageUrl || post.image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};