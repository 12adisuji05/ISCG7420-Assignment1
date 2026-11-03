import axios from 'axios';

// One axios instance for the whole app. The API address comes from VITE_API_URL.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
});

// Send the login token with every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Token ' + token;
    }
    return config;
});

// Turn a Django REST Framework error into one readable message
export function errorMessage(error) {
    if (!error.response) {
        return 'Cannot reach the server. Please try again in a minute.';
    }
    const data = error.response.data;
    if (data && typeof data === 'object') {
        return Object.values(data)
            .map((value) => (Array.isArray(value) ? value.join(' ') : value))
            .join(' ');
    }
    return 'Something went wrong. Please try again.';
}

export default api;
