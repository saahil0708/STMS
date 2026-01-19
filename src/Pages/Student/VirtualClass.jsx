import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MicrophoneIcon, PhoneXMarkIcon, ShareIcon } from '@heroicons/react/24/solid';
import Peer from 'simple-peer';
import { socket } from '../../socket';

// Polyfill for global if missing (common in Vite with simple-peer)
if (typeof window !== 'undefined' && window.global === undefined) {
    window.global = window;
}

// NOTE: Process polyfill is handled by vite-plugin-node-polyfills in vite.config.js
// Removing manual import to avoid conflicts.



import apiClient from '../../services/apiClient'; // Import apiClient

// ... (existing imports)

const VirtualClass = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [peers, setPeers] = useState([]);
    const [stream, setStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const userVideo = useRef();
    const peersRef = useRef([]);
    const streamRef = useRef(null); // Ref to hold current stream for callbacks
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId') || 'student-' + Math.floor(Math.random() * 1000);

    useEffect(() => {
        const handleJoin = async (currentStream) => {
            // Update ref
            streamRef.current = currentStream;

            // Ensure socket is connected to get socket.id
            if (!socket.connected) {
                console.log("Socket not connected, attempting to connect...");
                socket.connect();
                try {
                    await new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error("Connection timeout"));
                        }, 5000);

                        const onConnect = () => {
                            clearTimeout(timeout);
                            socket.off('connect', onConnect);
                            setConnectionStatus(`Connected: ${socket.id}`);
                            resolve();
                        };

                        const onConnectError = (err) => {
                            clearTimeout(timeout);
                            socket.off('connect', onConnect);
                            socket.off('connect_error', onConnectError);
                            reject(err);
                        };

                        socket.on('connect', onConnect);
                        socket.on('connect_error', onConnectError);

                        if (socket.connected) {
                            clearTimeout(timeout);
                            socket.off('connect', onConnect);
                            socket.off('connect_error', onConnectError);
                            setConnectionStatus(`Connected: ${socket.id}`);
                            resolve();
                        }
                    });
                } catch (err) {
                    console.error("Socket connection failed:", err);
                    setConnectionStatus(`Connection Failed: ${err.message}`);
                    return;
                }
            } else {
                setConnectionStatus(`Connected: ${socket.id}`);
            }

            const myUserId = socket.id;
            console.log("Connected with ID:", myUserId);

            // 1.5 Fetch Lecture Details using apiClient (handles base URL automatically)
            try {
                const res = await apiClient.get(`/auth/lecture/${roomId}`);
                const data = res.data;
                const courseId = data.courseId?._id || data.courseId;

                // 2. Join the Room
                socket.emit('join-room', { roomId, userId: myUserId, courseId });
            } catch (err) {
                console.error("Failed to fetch class info for attendance", err);
                socket.emit('join-room', { roomId, userId: myUserId });
            }
        };

        // 1. Get User Media (Camera/Mic)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(currentStream => {
                setStream(currentStream);
                if (userVideo.current) {
                    userVideo.current.srcObject = currentStream;
                }
                handleJoin(currentStream);
            })
            .catch(err => {
                console.error("Failed to get media", err);
                handleJoin(null);
            });

        // 3. Listen: User Connected (Create Offer)
        const handleUserConnected = (remoteUserId) => {
            console.log("User connected:", remoteUserId);
            // Use streamRef.current instead of currentStream
            const peer = createPeer(remoteUserId, socket.id, streamRef.current);
            peersRef.current.push({
                peerID: remoteUserId,
                peer,
            });
            setPeers(users => [...users, { peerID: remoteUserId, peer }]);
        };

        // 4. Listen: Receive Offer (Create Answer)
        const handleReceiveOffer = (payload) => {
            console.log("Received offer from:", payload.caller);
            // Use streamRef.current instead of currentStream
            const peer = addPeer(payload.sdp, payload.caller, streamRef.current);
            peersRef.current.push({
                peerID: payload.caller,
                peer,
            });
            setPeers(users => [...users, { peerID: payload.caller, peer }]);
        };

        // 5. Listen: Receive Answer
        const handleReceiveAnswer = (payload) => {
            console.log("Received answer from:", payload.caller);
            const item = peersRef.current.find(p => p.peerID === payload.caller);
            if (item) {
                item.peer.signal(payload.sdp);
            }
        };

        // 6. Listen: ICE Candidate
        const handleIceCandidate = (payload) => {
            const item = peersRef.current.find(p => p.peerID === payload.caller);
            if (item) {
                item.peer.signal(payload.candidate);
            }
        };

        // 7. Listen: User Disconnected
        const handleUserDisconnected = (id) => {
            console.log("User disconnected:", id);
            const peerObj = peersRef.current.find(p => p.peerID === id);
            if (peerObj) peerObj.peer.destroy();
            const peers = peersRef.current.filter(p => p.peerID !== id);
            peersRef.current = peers;
            setPeers(peers);
        };

        // Attach listeners
        socket.on('user-connected', handleUserConnected);
        socket.on('offer', handleReceiveOffer);
        socket.on('answer', handleReceiveAnswer);
        socket.on('ice-candidate', handleIceCandidate);
        socket.on('user-disconnected', handleUserDisconnected);

        // Listen: Connection Error
        const handleConnectError = (err) => {
            console.error("Socket connection error:", err);
            setConnectionStatus(`Connection Error: ${err.message}`);
        };

        socket.on('connect_error', handleConnectError);



        // Global cleanup (runs on unmount)
        return () => {
            // Remove all listeners to be safe or specific ones if we lifted variable scope
            // Since listeners are defined inside the promise chain, we rely on the specific cleanup 
            // logic above or brute force here if needed. 
            // Best practice: remove specific listeners. 
            // Due to scoping, we can't easily remove specific functions here if defined inside .then()
            // So we'll use a brute force approach for these specific events which is safer for this singleton socket.
            ['user-connected', 'offer', 'answer', 'ice-candidate', 'user-disconnected', 'connect_error'].forEach(event => {
                socket.removeAllListeners(event);
            });

            socket.disconnect();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Create a new Peer (Initiator)
    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        // Send Offer
        peer.on('signal', signal => {
            socket.emit('offer', { target: userToSignal, caller: callerID, sdp: signal });
        });

        return peer;
    }

    // Add a Peer (Receiver)
    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        // Send Answer
        peer.on('signal', signal => {
            socket.emit('answer', { target: callerID, caller: socket.id, sdp: signal });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    const toggleMute = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const endCall = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        socket.disconnect();
        navigate('/'); // Navigate back to home
    };

    const copyJoinLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Class link copied to clipboard!');
    };

    return (
        <div className="p-6 relative min-h-screen bg-gray-50 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Virtual Class: {roomId}</h1>
                    <p className="text-xs text-gray-500">Status: {connectionStatus}</p>
                </div>
                <div className="flex gap-2">
                    {/* Share button removed as per requirements */}
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20">
                {/* My Video */}
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <video muted ref={userVideo} autoPlay playsInline className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">You {isMuted ? '(Muted)' : ''}</span>
                </div>

                {/* Remote Videos */}
                {peers.map((peerObj, index) => {
                    return (
                        <div key={index} className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <Video peer={peerObj.peer} />
                            <span className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">Peer {peerObj.peerID.slice(0, 5)}</span>
                        </div>
                    );
                })}
            </div>

            {/* Control Bar */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl border border-gray-200 flex items-center gap-6 z-50">
                <button
                    onClick={toggleMute}
                    className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    <MicrophoneIcon className="h-6 w-6" />
                </button>

                <button
                    onClick={endCall}
                    className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-200 transition-all scale-100 hover:scale-110"
                    title="End Call"
                >
                    <PhoneXMarkIcon className="h-8 w-8" />
                </button>
            </div>
        </div>
    );
};

const Video = ({ peer }) => {
    const ref = useRef();

    useEffect(() => {
        peer.on('stream', stream => {
            ref.current.srcObject = stream;
        });
    }, [peer]);

    return <video playsInline autoPlay ref={ref} className="w-full h-full object-cover" />;
};

export default VirtualClass;
