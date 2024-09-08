import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import  useBooksData  from '../../Hooks/useBooksData';

import useAuthStorage from '../Authentication/useAuthStorage';
import { ENDPOINTS } from '../../utils/apiEndpoints'

export function usePersonalAccount() {
    const { currentUser } = useAuthStorage();

    const { 
            username,
            userRole,
            isLoggedIn,
            logout,
            delBookFromUser,
            // bookCollections = [] 
            } = useAuth();
            
    const { booksData = [] } = useBooksData();
    const [userBooks, setUserBooks] = useState([]);
    const isLoggedInRef = useRef(isLoggedIn);
    const [sortOption, setSortOption] = useState('reading');

    const [bookCollections, setBookCollections] = useState([]);

    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);
    

    useEffect(() => {
        const fetchBookCollections = async () => {
            if (isLoggedInRef.current && currentUser) {
                try {
                    const response = await fetch(ENDPOINTS.GET_USER_BY_ID(currentUser.id));
                    if (response.ok) {
                        const userData = await response.json();
                        const collections = userData.bookCollections;
                        setBookCollections(collections);        
                    } else {
                        console.error('Failed to fetch book collection');
                    }
                } catch (error) {
                    console.error('Error fetching book collection:', error);
                }
            }
        };

        fetchBookCollections(); // Initial fetch

        const intervalId = setInterval(fetchBookCollections, 60000); // Poll every 60 seconds

        return () => clearInterval(intervalId);
    }, [currentUser]);


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

    // Enhanced delBookFromUser function to update UI immediately
    const handleDeleteBook = async (book) => {
        try {
            // Call the API to delete the book
            await delBookFromUser(book);
            
            // After successful deletion, update the state locally
            setBookCollections(prevCollections => prevCollections.filter(col => col.id !== book.id));
            setUserBooks(prevBooks => prevBooks.filter(b => b.id !== book.id));
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };
    
    return { 
        username,
        userRole,
        userBooks: sortedBooks(),
        sortOption,           
        setSortOption, 
        logout,
        delBookFromUser : handleDeleteBook,
    };
}