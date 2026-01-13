import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// const API_BASE_URL = 'http://localhost:5000'; // FORCE LOCALHOST FOR DEV
const API_BASE_URL = 'https://stms-server-4ova.onrender.com';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Redis-related errors (Rate Limiting, Session Blacklisting)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // 429: Too Many Requests (Rate limit enforced by Redis)
            if (error.response.status === 429) {
                console.error('Rate limit reached (Redis enforced)');
                // Optionally notify user or handle globally
            }

            // 401: Unauthorized (Possible token blacklisted in Redis)
            if (error.response.status === 401 && !error.config.skipAuthRedirect) {
                console.error('Session expired or blacklisted in Redis');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
