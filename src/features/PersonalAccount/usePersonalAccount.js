import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import  useBooksData  from '../../Hooks/useBooksData';

export function usePersonalAccount() {
    const { username, userRole, isLoggedIn, logout, delBookFromUser, bookCollections, currentUser } = useAuth();
    const { booksData = [] } = useBooksData();
    const [userBooks, setUserBooks] = useState([]);
    const isLoggedInRef = useRef(isLoggedIn);

    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedInRef.current && currentUser) {
            const bookCollections = currentUser.bookCollections || {};
            const allBookIds = Object.values(bookCollections).flat();
            const accountBooks = booksData.filter(book => allBookIds.includes(book.id));
            setUserBooks(accountBooks);
        } else {
            setUserBooks([]);
        }
    }, [currentUser, booksData]);

    
    return { username, userRole, userBooks, logout, delBookFromUser };
}