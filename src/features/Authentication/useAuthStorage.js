import { useState, useEffect } from 'react';

function useAuthStorage() {
    const [currentUser, setCurrentUser] = useState(null);

    // On mount, load the user from localStorage
    useEffect(() => {
        const storedCurrentUser = localStorage.getItem('currentUser');
        if (storedCurrentUser) {
            setCurrentUser(JSON.parse(storedCurrentUser));
        }
    }, []);

    const saveUserData = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const clearUserData = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    // Derive other state values from currentUser
    const isLoggedIn = currentUser !== null;
    const userRole = currentUser?.role || 'guest';
    const username = currentUser?.username || '';

    return {
        isLoggedIn,
        userRole,
        username,
        currentUser,
        saveUserData,
        clearUserData,
        setCurrentUser,
    };
}

export default useAuthStorage;