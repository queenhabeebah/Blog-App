import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userInfo = localStorage.getItem('user')
        if (token && userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [])

    const login = (userData, token) => {
        localStorage.setItem('token', token)
        localStorage,setItem('user', JSON.stringify(userData))
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