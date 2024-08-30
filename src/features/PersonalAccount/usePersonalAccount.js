import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import  useBooksData  from '../../Hooks/useBooksData';


export function usePersonalAccount() {
    const { username, userRole, isLoggedIn, logout, delBookFromUser, bookCollections = [] } = useAuth();
    const { booksData = [] } = useBooksData();
    const [userBooks, setUserBooks] = useState([]);
    const isLoggedInRef = useRef(isLoggedIn);

    const [sortOption, setSortOption] = useState('reading');


    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);
    

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



    const sortedBooks = () => {
        const groupMap = {
            reading: 'reading',
            inPlans: 'inPlans'
        };
    
        // Get the group value based on the current sort option
        const group = groupMap[sortOption];
    
        // Return filtered books based on the selected group or all books if no group is specified
        return group ? 
            userBooks.filter(book => bookCollections.find(col => col.id === book.id)?.group === group) 
            : userBooks;
    };
    
    return { 
        username,
        userRole,
        userBooks: sortedBooks(),
        sortOption,           
        setSortOption, 
        logout,
        delBookFromUser 
    };
}