import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  

    useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await api.get("/posts/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Post deleted");
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.username || "User"}!
      </h1>
      <Link
        to="/create-post"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create New Post
      </Link>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-4">Your Posts</h2>

{loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>You haven't written any posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-700">
                {post.content?.substring(0, 100)}...
              </p>

              <div className="flex gap-4 mt-2">
                <Link
                  to={`/edit-post/${post._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default Dashboard;
