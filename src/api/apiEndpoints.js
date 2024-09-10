// command to run fake API:  json-server --watch db.json --port 5000
// use inside folder with db.json (mock)

const API_BASE_URL = 'http://localhost:5000'

export const ENDPOINTS = {
    GET_BOOKS: `${API_BASE_URL}/books`,
    GET_USERNAME: (username) => `${API_BASE_URL}/users?username=${username}`,
    UPDATE_USER_BY_ID: (userId) => `${API_BASE_URL}/users/${userId}`,
    GET_USERS: `${API_BASE_URL}/users`,

    GET_USER_BY_ID: (userId) => `${API_BASE_URL}/users/${userId}`
}
