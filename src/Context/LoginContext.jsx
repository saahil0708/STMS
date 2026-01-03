import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const LoginContext = createContext();

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start as loading for initial session check
    const [error, setError] = useState('');

    // Restore user and verify session from Redis on mount
    useEffect(() => {
        const verifySession = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (storedUser && token) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    const role = parsedUser.role || 'student';
                    const response = await apiClient.get(`/api/auth/${role}/profile`);

                    if (response.data) {
                        const updatedUser = response.data.data || response.data;
                        setUser(updatedUser);
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                    }
                } catch (error) {
                    console.error("Session verification failed:", error);
                    // apiClient interceptor handles 401/403 redirects
                }
            }
            setLoading(false);
        };

        verifySession();
    }, []);

    const login = async (email, password, role = 'student') => {
        setLoading(true);
        setError('');

        try {
            const response = await apiClient.post(`/api/auth/${role}/login`, {
                email,
                password
            });

            console.log('Login Response:', response.data);

            let { user, token } = response.data;

            // Handle various response structures
            if (!user && response.data.data) user = response.data.data;
            if (!user && response.data[role]) user = response.data[role];

            if (!user || !token) {
                throw new Error('Invalid server response: Missing user or token');
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setUser(user);
            return user;
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.message || 'Invalid email or password.';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            if (user && user.role) {
                await apiClient.post(`/api/auth/${user.role}/logout`);
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};
