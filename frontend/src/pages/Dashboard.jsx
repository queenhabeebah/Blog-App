import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return(
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>
      <p className="mb-6">This is your dashboard.</p>

      <Link
        to="/create-post"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create New Post
      </Link>
        </div>
    )
}

export default Dashboard