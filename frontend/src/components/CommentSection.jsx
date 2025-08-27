import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId, postAuthorId }) => {
  const { user, token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/posts/${postId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setLoading(true);
      const res = await api.post(
        `/posts/${postId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Error adding comment", err);
    } finally {
      setLoading(false);
    }
  };

  const canEditOrDelete = (commentUserId, postAuthorId) => {
    if (!user) return false;
    return user._id === commentUserId || user._id === postAuthorId;
  };

  const handleEdit = async (commentId) => {
    try {
      const res = await api.put(
        `/posts/comments/${commentId}`,
        { text: editedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? res.data : c))
      );
      setEditingCommentId(null);
      setEditedText("");
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/posts/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {user && (
        <form onSubmit={handleAddComment} className="form mb-4 space-y-2">
          <textarea
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="comment border p-3 rounded bg-gray-100">
            {editingCommentId === comment._id ? (
              <>
                <textarea
                  className="w-full border p-2 rounded"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />

                <div className="flex gap-2 m-2">
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="button bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditedText("");
                    }}
                    className="button bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm">{comment.text}</p>
                <small className="text-gray-500">
                  By {comment.user.username}
                </small>
                {canEditOrDelete(comment.user._id, postAuthorId) && (
                  <div className="flex gap-2 mt-1">
                    {user._id === comment.user._id && (
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditedText(comment.text);
                        }}
                        className="button text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="button text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
