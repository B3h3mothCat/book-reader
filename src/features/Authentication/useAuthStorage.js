import { useState, useEffect } from 'react';

function useAuthStorage() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userRole, setUserRole] = useState('guest');
const [username, setUsername] = useState('');
const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    const storedCurrentUser = localStorage.getItem('currentUser');

    if (storedIsLoggedIn && storedCurrentUser) {
        setIsLoggedIn(storedIsLoggedIn);
        setUserRole(storedUserRole || 'guest');
        setUsername(storedUsername || '');
        setCurrentUser(JSON.parse(storedCurrentUser));
    }
}, []);

const saveUserData = (user) => {
    setIsLoggedIn(true);
    setUserRole(user.role || 'user');
    setUsername(user.username);
    setCurrentUser(user);

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userRole', user.role || 'user');
    localStorage.setItem('username', user.username);
    localStorage.setItem('currentUser', JSON.stringify(user));
};

const clearUserData = () => {
    setIsLoggedIn(false);
    setUserRole('guest');
    setUsername('');
    setCurrentUser(null);

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('currentUser');
};


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