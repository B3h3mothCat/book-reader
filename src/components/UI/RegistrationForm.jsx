import { useState, useEffect } from 'react';
import { ENDPOINTS } from "../../utils/apiEndpoints"

export default function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(ENDPOINTS.GET_USERS);
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, []);

    const checkIfUserExists = (username, email) => {
        return users.some(user => user.username === username || user.email === email);
    };

    const createAccount = async (username, password, email) => {
        try {
            const response = await fetch(ENDPOINTS.GET_USERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    role: "user",
                    booksId: []
                }),
            });
        }
        catch (err) {
            console.error('Failed to create user:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (checkIfUserExists(username, email)) {
                throw new Error('Username or email already exists');
            }

            await createAccount(username, password, email);
            // redirect to login page or show success message
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Create IT!!</button>
            {error && <p>{error}</p>}
        </form>
    );
}

// add auto-login?
// fecth only names and emaild on mount?
