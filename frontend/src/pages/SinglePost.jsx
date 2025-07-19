import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(("Failed to load post", err));
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        By {post.author?.username} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full max-h-[300px] object-cover mb-4"
          />
        )}
        <p>{post.content}</p>
        <CommentSection postId={post._id} />
    </div>
  );
};

export default SinglePost