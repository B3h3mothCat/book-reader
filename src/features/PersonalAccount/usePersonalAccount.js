import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import  useBooksData  from '../../Hooks/useBooksData';

export function usePersonalAccount() {
    const { username, userRole, isLoggedIn, logout, delBookFromUser, currentUser} = useAuth();
    const { booksData = [] } = useBooksData();
    const [userBooks, setUserBooks] = useState([]);
    const isLoggedInRef = useRef(isLoggedIn);

    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);


    useEffect(() => {
        if (isLoggedInRef.current && currentUser) {
            const bookCollections = currentUser.bookCollections || {}; // Safeguard against undefined
            const allBookIds = Object.values(bookCollections).flat();
            const accountBooks = booksData.filter(book => allBookIds.includes(book.id));
            setUserBooks(accountBooks);
        } else {
            setUserBooks([]);
        }
    }, [booksData, currentUser]); // Recalculate when booksData or currentUser changes

    // Optionally, you can add another useEffect for handling specific changes to bookCollections
    useEffect(() => {
        if (isLoggedInRef.current && currentUser?.bookCollections) {
            const bookCollections = currentUser.bookCollections;
            const allBookIds = Object.values(bookCollections).flat();
            const accountBooks = booksData.filter(book => allBookIds.includes(book.id));
            setUserBooks(accountBooks);
        }
    }, [currentUser?.bookCollections]); // Ensure this useEffect runs when bookCollections changes

    return { username, userRole, userBooks, logout, delBookFromUser };
}