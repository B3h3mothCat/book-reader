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


    function login(username, password) {
        // Fetch user based on username and password from the API
        fetch(`http://localhost:5000/users?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const user = data[0]; // Assuming username and password uniquely identify a user
                    if (user.password === password) {
                        setIsLoggedIn(true);
                        setUserRole(user.role || 'user');
                        setUsername(username);
                        setCurrentUser(user);
                    } else {
                        alert('Invalid username or password');
                    }
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

    function updateUserBooks(updatedBooks) {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                books: updatedBooks,
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
                    setCurrentUser(data);
                })
                .catch(error => console.error('Error updating books:', error));
        }
    }

    function addBookToUser(book) {
        if (currentUser) {
            const updatedBooks = [...currentUser.books, book];
            updateUserBooks(updatedBooks);
        }
    } // right now we can add same book X times

    function delBookFromUser(book) {
        if (currentUser) {
            const updatedBooks = currentUser.books.filter(b => b !== book);
            updateUserBooks(updatedBooks);
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
            delBookFromUser,
            books: currentUser?.books // вместо целых книг лучше передавать id книг
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// login and logout should be not global, move to => Login