// import { registeredUsers } from "../mock/usersList";  -- static userBase
import { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../../utils/apiEndpoints";
import useAuthStorage from './useAuthStorage'

const DEFAULT_COLLECTION = 'Reading';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const {
        isLoggedIn,
        userRole,
        username,
        currentUser,
        saveUserData,
        clearUserData,
        setCurrentUser,
        loadUserFromStorage,  // setter from the custom hook
    } = useAuthStorage();

    function login(username, password) {
        fetch(ENDPOINTS.GET_USERNAME(username))
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const user = data[0];
                    if (user.password === password) {
                        saveUserData({ ...user, username })
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
        clearUserData()
    }


    // BOOKS RELATED LOGIC <>
    function updateUserBooksId(updatedBookCollections) {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                // booksId: updatedBooksId, 
                bookCollections: updatedBookCollections,
            };

            fetch(ENDPOINTS.UPDATE_USER_BY_ID(currentUser.id), {
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

    function addBookToUser(book, collection = DEFAULT_COLLECTION) {
        // if (currentUser) {
        //     // Check if the book is already in the user's booksId array
        //     if (!currentUser.booksId.includes(book.id)) {
        //         const updatedBooksId = [...currentUser.booksId, book.id];
        //         updateUserBooksId(updatedBooksId);
        //     } else {
        //         alert("Book is already in your collection.");
        //     }
        // }
        const currentUser = loadUserFromStorage().currentUser;
        if (currentUser) {
            const updatedCollections = { ...currentUser.bookCollections };
            // Ensure the collection exists
            if (!updatedCollections[collection]) {
                updatedCollections[collection] = [];
            }
            // Check if the book is already in the collection
            if (!updatedCollections[collection].includes(book.id)) {
                updatedCollections[collection].push(book.id);
                updateUserBooksId(updatedCollections);
            } else {
                alert("Book is already in this collection.");
            }
        }

    }

    function delBookFromUser(book, collection) {
        // if (currentUser) {
        //     const updatedBooksId = currentUser.booksId.filter(id => id !== book.id);
        //     updateUserBooksId(updatedBooksId);
        // }

        if (currentUser) {
            const updatedCollections = { ...currentUser.bookCollections };
            if (updatedCollections[collection]) {
                updatedCollections[collection] = updatedCollections[collection].filter(id => id !== book.id);
                updateUserBooksId(updatedCollections);
            }
        }
    }
    // BOOKS RELATED LOGIC </>

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userRole,
            username,
            login,
            logout,
            addBookToUser,
            delBookFromUser,
            // bookCollections: currentUser?.bookCollections,
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
