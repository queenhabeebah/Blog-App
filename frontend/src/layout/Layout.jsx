import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
    return(
        <>
        <Navbar />
        <main className="min-h-screen p-4 bg-gray-50">
            <Outlet />
        </main>
        <Footer />
        </>
    )
}

export default Layout