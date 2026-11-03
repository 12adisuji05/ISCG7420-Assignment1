import { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

// Shares the logged-in user with every component (Context API + useContext)
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // When the page loads, use the saved token to find out who is logged in
    useEffect(() => {
        if (localStorage.getItem('token')) {
            api.get('me/')
                .then((response) => setUser(response.data))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const response = await api.post('auth/', { username, password });
        localStorage.setItem('token', response.data.token);
        const me = await api.get('me/');
        setUser(me.data);
        return me.data;
    };

    const register = async (details) => {
        const response = await api.post('register/', details);
        localStorage.setItem('token', response.data.token);
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
