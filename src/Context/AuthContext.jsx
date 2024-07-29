import { createContext, useContext, useState } from "react";
import { registeredUsers } from "../mock/usersList";

const AuthContext = createContext();
//  custom hook provides easy access to authentication context values 
// (isLoggedIn, userRole, login, logout) in any component that needs them.
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState('guest')
    const [username, setUsername] = useState('');

    function login(username, password) {
        const user = registeredUsers
            .find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setUserRole(user.role || 'user'); // Default to 'user' if no role is provided
            setUsername(username);
        } else {
            alert('Invalid username or password');
        }
    }

    function logout() {
        setIsLoggedIn(false)
        setUserRole('guest')
        setUsername('');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// login and logout should be not global, move to => Login