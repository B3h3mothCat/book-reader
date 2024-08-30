import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import  useBooksData  from '../../Hooks/useBooksData';


export function usePersonalAccount() {
    const { username, userRole, isLoggedIn, logout, delBookFromUser, booksId = [], bookCollections = [] } = useAuth();
    const { booksData = [] } = useBooksData();
    const [userBooks, setUserBooks] = useState([]);
    const isLoggedInRef = useRef(isLoggedIn);

    
    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);
    

    // useEffect(() => {
    //     if (isLoggedInRef.current) {
    //         if (booksData.length > 0) {
    //             const accountBooks = booksData.filter(book => booksId.includes(book.id));
    //             setUserBooks(accountBooks);
    //         } else {
    //             setUserBooks([]);
    //         }
    //     } else {
    //         if (userBooks.length > 0) {
    //             setUserBooks([]);
    //         }
    //     }
    // }, [booksId, booksData]);

    useEffect(() => {
        if (isLoggedInRef.current) {
            if (booksData.length > 0) {
                const accountBooks = booksData.filter(book => bookCollections.some(col => col.id === book.id));
                setUserBooks(accountBooks);
            } else {
                setUserBooks([]);
            }
        } else {
            if (userBooks.length > 0) {
                setUserBooks([]);
            }
        }
    }, [bookCollections, booksData]);
    
    return { username, userRole, userBooks, logout, delBookFromUser };
}