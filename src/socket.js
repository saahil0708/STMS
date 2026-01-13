import io from 'socket.io-client';

// Change URL to your deployed server or localhost
export const socket = io('http://localhost:5000', {
    autoConnect: false
});
