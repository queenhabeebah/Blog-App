import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   Fetching existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        setError("Failed to load post");
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  // Handle post update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.put(
        `/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (err) {
      setError("Update failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Post title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Post content"
          className="w-full p-2 border rounded"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost