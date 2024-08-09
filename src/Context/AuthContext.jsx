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
        fetch(`http://localhost:5000/users?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const user = data[0];
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

    function updateUserBooksId(updatedBooksId) {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                booksId: updatedBooksId,  // Updating only booksId
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
                    setCurrentUser(data)
                })
                .catch(error => console.error('Error updating user books:', error));
        }
    }

    function addBookToUser(book) {
        if (currentUser) {
            // Check if the book is already in the user's booksId array
            if (!currentUser.booksId.includes(book.id)) {
                const updatedBooksId = [...currentUser.booksId, book.id];
                updateUserBooksId(updatedBooksId);
            } else {
                alert("Book is already in your collection.");
            }
        }
    }

    function delBookFromUser(book) {
        if (currentUser) {
            const updatedBooksId = currentUser.booksId.filter(id => id !== book.id);
            updateUserBooksId(updatedBooksId);
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
            booksId: currentUser?.booksId
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// login and logout should be not global, move to => Login