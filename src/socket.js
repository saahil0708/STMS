import io from 'socket.io-client';

// Change URL to your deployed server or localhost
export const socket = io('https://stms-server-4ova.onrender.com', {
    autoConnect: false,
    transports: ['websocket', 'polling'], // Try WebSocket first, fall back to polling
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});
