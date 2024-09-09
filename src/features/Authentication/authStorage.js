export function saveUserToStorage(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function clearUserFromStorage() {
    localStorage.removeItem('currentUser');
}

export function loadUserFromStorage() {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
        const user = JSON.parse(storedCurrentUser);
        return {
            isLoggedIn: true,
            userRole: user.role || 'guest',
            username: user.username || '',
            currentUser: user,
        };
    }
    return {
        isLoggedIn: false,
        userRole: 'guest',
        username: '',
        currentUser: null,
    };
}

export function getCurrentUserFromStorage() {
    const { currentUser } = loadUserFromStorage();
    return currentUser;
}