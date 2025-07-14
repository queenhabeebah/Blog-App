import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Latest Post</h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              By {post.author?.username || "Unknown"} on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="mb-3">{post.content.substring(0, 100)}...</p>
            <Link className="text-blue-600 hover:underline">Read More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;