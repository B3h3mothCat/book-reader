import { createContext, useContext, useEffect, useState } from "react";
// import { registeredUsers } from "../mock/usersList";

const AuthContext = createContext();
// const BASE_URL = 'http://localhost:5000'


export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState('guest')
    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => {
                setCurrentUser(data[0])
            })
            .catch(error => console.error('Error fetching users:', error))
    }, [])

    function login(username, password) {
        // Fetch user based on username and password from the API
        fetch(`http://localhost:5000/users?username=${username}&password=${password}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const user = data[0]; // Assuming username and password uniquely identify a user
                    setIsLoggedIn(true);
                    setUserRole(user.role || 'user');
                    setUsername(username);
                    setCurrentUser(user);
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(error => console.error('Error logging in:', error));
    }

    function logout() {
        setIsLoggedIn(false)
        setUserRole('guest')
        setUsername('');
        setCurrentUser(null);
    }

    function addBookToUser(book) {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                books: [...currentUser.books, book],
            };

            fetch(`http://localhost:5000/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            })
                .then(response => response.json())
                .then(data => {
                    setCurrentUser(data); // Update currentUser state with updated data from server
                })
                .catch(error => console.error('Error adding book:', error));
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userRole,
            username,
            login,
            logout,
            addBookToUser,
            books: currentUser?.books
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// login and logout should be not global, move to => Login