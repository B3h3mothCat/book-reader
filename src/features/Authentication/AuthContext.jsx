// import { registeredUsers } from "../mock/usersList";  -- static userBase
import { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../../api/apiEndpoints";
import useAuthStorage from './useAuthStorage'

// import { setCurrentUser, clearCurrentUser } from '../../store/userSlice'
import { useDispatch, useSelector } from "react-redux"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const dispatch = useDispatch();

    // to access `currentUserR` from Redux state: 
    // const currentUser = useSelector((state) => state.user.currentUserRedux);


    //OTHER COMPONENTS INTERACT WITH THIS, NOT storage and useAuthStorage
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
                        saveUserData({ ...user, username }) // only usermame? 

                        // dispatch(setCurrentUserRedux(user))
                        // redux
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

        // dispatch(clearCurrentUserRedux())
        // redux
    }



    // BOOKS RELATED LOGIC <>
    function updateUserBooks(updatedBookCollections) {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
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
                    saveUserData(data) // local storage update
                })
                .catch(error => console.error('Error updating user books:', error));
        }
    }

    function addBookToUser(book, group) {
        if (currentUser) {
            const existingBook = currentUser.bookCollections.find(b => b.id === book.id);
            if (!existingBook) {
                const newBookCollection = {
                    id: book.id,
                    group: group, // Default or set this as needed
                    bookmarks: [],
                };
                const updatedBookCollections = [...currentUser.bookCollections, newBookCollection];
                updateUserBooks(updatedBookCollections);
            } else {
                alert("Book is already in your collection.");
            }
        }
    }

    function delBookFromUser(book) {
        if (currentUser) {
            const updatedBookCollections = currentUser.bookCollections.filter(b => b.id !== book.id);
            updateUserBooks(updatedBookCollections);
        }
    }

    function moveBook(book, newGroup) {
        if (currentUser) {
            const updatedBookCollections = currentUser.bookCollections.map(b =>
                b.id === book.id ? { ...b, group: newGroup } : b
            );
            updateUserBooks(updatedBookCollections);
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
            bookCollections: currentUser?.bookCollections || [],
            moveBook,
            currentUser,

        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
