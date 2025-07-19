import { useEffect, useState, useContext } from "react";
import api from "../services/api"
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
    const { user, token } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async () => {
        try {
            const res = await api.get(`/posts/${postId}/comments`)
            setComments(res.data)
        } catch (err) {
            console.error('Failed to fetch comments', err);
            
        }
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        if(!text.trim()) return

        try {
            setLoading(true)
            const res = await api.post(
                `/comments/${postId}`,
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )

            setComments((prev) => [...prev, res.data])
            setText("")
        } catch (err) {
            console.error("Error adding comment", err);
            
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {user && (
        <form onSubmit={handleAddComment} className="mb-4 space-y-2">
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border p-2 rounded bg-gray-100">
            <p className="text-sm text-gray-700">{comment.text}</p>
            <small className="text-gray-500">By {comment.user.name || "User"}</small>
          </div>
        ))}
      </div>
    </div>
    )
}

export default CommentSection