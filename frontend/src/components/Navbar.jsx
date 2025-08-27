import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    
    return(
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">My Blog</h1>
            <div className="nav-link space-x-4">
            <Link to="/" className="link hover:underline">Home</Link>
            {!user ? (
                <>
            <Link to="/login" className="link hover:underline">Login</Link>
            <Link to="/register" className="link hover:underline">Register</Link>
                </>
            ) : (
                <>
            <Link to="/dashboard" className="link hover:underline">Dashboard</Link>
                <button onClick={logout} className="hover:underline">Logout</button>
                </>
            )}
            </div>
        </nav>
    )
}

export default Navbar