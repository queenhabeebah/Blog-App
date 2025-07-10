import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userInfo = localStorage.getItem('user')
        if (token && userInfo) {
            try {
                const parsedUser = JSON.parse(userInfo)
                setUser(parsedUser)
            } catch (error) {
                console.error("Failed to parse user info from localStorage:", error);
                localStorage.removeItem('user')
                setUser(null)
            }
        }
    }, [])

    const login = (userData, token) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={ { user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider