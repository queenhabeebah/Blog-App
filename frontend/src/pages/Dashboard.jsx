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
      await api.delete(`/posts/${postId}`, {
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
        className="link inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
        <div className="post-grid">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h3>{post.title}</h3>
              <p className="author">{new Date(post.createdAt).toLocaleString()}</p>
              <img src={post.image} alt={post.title} />
              <p>{post.content}...</p>

              <div>
                <Link to={`/edit-post/${post._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
