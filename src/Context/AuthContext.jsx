import { createContext, useContext, useState } from "react";
import { registeredUsers } from "../mock/usersList";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState('guest')
    const [username, setUsername] = useState('');

    const [currentUser, setCurrentUser] = useState(null)

    function login(username, password) {
        const user = registeredUsers
            .find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setUserRole(user.role || 'user'); // Default to 'user' if no role is provided
            setUsername(username);
            setCurrentUser(user)
        } else {
            alert('Invalid username or password');
        }
    }

    function logout() {
        setIsLoggedIn(false)
        setUserRole('guest')
        setUsername('');
    }

    function addBookToUser(book) {
        if (currentUser) {
            setCurrentUser((prevUser) => {
                const updatedUser = {
                    ...prevUser,
                    books: [...prevUser.books, book]
                }
                // update array to presist changes
                const userIndex = registeredUsers.findIndex(user => user.username === prevUser.username);
                if (userIndex !== -1) {
                    registeredUsers[userIndex] = updatedUser;
                }
                return updatedUser;
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, userRole, username,
            login, logout, addBookToUser, books: currentUser?.books
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// login and logout should be not global, move to => Login