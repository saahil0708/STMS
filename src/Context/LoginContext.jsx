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
                    const userId = parsedUser.id || parsedUser._id;

                    if (userId) {
                        // Skip verification for mock token to avoid 401 logout
                        if (token === 'mock-token-xyz') {
                            console.log("Mock session detected, skipping verification.");
                            setLoading(false);
                            return;
                        }

                        try {
                            // Corrected endpoint based on server routes: /api/auth/student/student/:id
                            const response = await apiClient.get(`/api/auth/${role}/${role}/${userId}`, {
                                skipAuthRedirect: true
                            });

                            if (response.data) {
                                const updatedUser = response.data.data || response.data;
                                setUser(updatedUser);
                                localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage with fresh data
                            }
                        } catch (err) {
                            console.warn("Could not fetch fresh profile, using stored data", err);
                            // If 404/401, apiClient might redirect, or we stay with storedUser
                        }
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

            // Ensure role is present in user object
            if (!user.role) {
                user.role = role;
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
