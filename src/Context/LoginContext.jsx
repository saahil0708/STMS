import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LoginContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Restore user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && storedUser !== 'undefined' && token) {
            try {
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, []);

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    };

    const login = async (email, password, role = 'student') => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/${role}/login`, {
                email,
                password
            });

            console.log('API Response:', response.data);

            let { user, token } = response.data;

            // If user is missing, try to decode from token
            if (!user && token) {
                const decoded = parseJwt(token);
                if (decoded) {
                    // Check if decoded object has role, if not, invoke fallback
                    user = {
                        ...decoded,
                        // Ensure role exists. If token doesn't have it, assume the requested role.
                        role: decoded.role || role
                    };
                    console.log('Decoded user from token:', user);
                }
            }

            // Fallback: Check if user is nested in 'data'
            if (!user && response.data.data) {
                user = response.data.data;
            }

            // Fallback: Check if user is returned as the role name (e.g., response.data.student)
            if (!user && response.data[role]) {
                user = response.data[role];
            }

            if (!user || !token) {
                throw new Error('Invalid server response: Missing user or token');
            }

            // Store auth data
            if (token && user) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            setUser(user);
            console.log('Login successful:', user);
            return user;
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.message || 'Invalid email or password. Please try again.';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            if (user && user.role) {
                await axios.post(`${API_BASE_URL}/api/auth/${user.role}/logout`);
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
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
