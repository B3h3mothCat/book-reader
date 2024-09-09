import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import  useBooksData  from '../../Hooks/useBooksData';
import { ENDPOINTS } from '../../utils/apiEndpoints'

export function usePersonalAccount() {
    const { 
            // username,
            // userRole,
            // isLoggedIn,
            logout,
            delBookFromUser,
            currentUser
            } = useAuth();
            
    const { booksData = [] } = useBooksData();
    const [userBooks, setUserBooks] = useState([]);
    const [sortOption, setSortOption] = useState('reading');

    const isLoggedIn = currentUser !== null;

    const [bookCollections, setBookCollections] = useState([]);

    

    useEffect(() => {
        const fetchBookCollections = async () => {
            if (isLoggedIn && currentUser) {
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
        // Initial fetch
        fetchBookCollections(); 

        const intervalId = setInterval(fetchBookCollections, 60000); 
        // Poll every 60 seconds
        return () => clearInterval(intervalId);
    }, [currentUser]);


    useEffect(() => {
        if (isLoggedIn) {
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
            if (group) {
              return userBooks.filter(book => bookCollections.find(col => col.id === book.id)?.group === group) 
            } else {
                return userBooks
            }
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
        username: currentUser?.username || '',
        userRole: currentUser?.role || 'guest',
        userBooks: sortedBooks(),
        sortOption,           
        setSortOption, 
        logout,
        delBookFromUser : handleDeleteBook,
        currentUser,
    };
}