// import { registeredUsers } from "../mock/usersList";  -- static userBase
import { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../../utils/apiEndpoints";
import useAuthStorage from './useAuthStorage'

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
    function updateUserBooksId(updatedBooksId) {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                booksId: updatedBooksId,
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
                    saveUserData(data) // local storage save
                })
                .catch(error => console.error('Error updating user books:', error));
        }
    }

    function addBookToUser(book) {
        if (currentUser) {
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
            booksId: currentUser?.booksId,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
