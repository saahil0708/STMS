import io from 'socket.io-client';

// Change URL to your deployed server or localhost
export const socket = io('https://stms-server-4ova.onrender.com', {
    autoConnect: false
});
