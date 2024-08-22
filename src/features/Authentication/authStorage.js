export function saveUserToStorage(user) {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userRole', user.role || 'user');
    localStorage.setItem('username', user.username);
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function clearUserFromStorage() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('currentUser');
}

export function loadUserFromStorage() {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    const storedCurrentUser = localStorage.getItem('currentUser');

    if (storedIsLoggedIn && storedCurrentUser) {
        return {
            isLoggedIn: storedIsLoggedIn,
            userRole: storedUserRole || 'guest',
            username: storedUsername || '',
            currentUser: JSON.parse(storedCurrentUser),
        };
    }
    return {
        isLoggedIn: false,
        userRole: 'guest',
        username: '',
        currentUser: null,
    };
}