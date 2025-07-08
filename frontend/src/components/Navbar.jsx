import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">My Blog</h1>
            <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </div>
        </nav>
    )
}

export default Navbar