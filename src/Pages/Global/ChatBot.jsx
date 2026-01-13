import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { STMS_CONTEXT } from '../../Utils/chatbotContext';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hi! I am your AI study assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    // ... existing state ...

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
                {
                    system_instruction: {
                        parts: { text: STMS_CONTEXT }
                    },
                    contents: [{ parts: [{ text: input }] }]
                }
            );

            const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
            setMessages(prev => [...prev, { role: 'model', text: aiText }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.', isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center gap-3 shadow-sm z-10">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">AI Study Assistant</h1>
                    <p className="text-xs text-gray-500">Powered by Gemini</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`
                            flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
                            ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'}
                        `}>
                            {msg.role === 'user' ? (
                                <User className="h-5 w-5 text-white" />
                            ) : (
                                <Bot className="h-5 w-5 text-white" />
                            )}
                        </div>

                        <div className={`
                            max-w-[80%] rounded-2xl px-4 py-3 shadow-sm
                            ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                : msg.isError
                                    ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                            }
                        `}>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center gap-2">
                            <Loader2 className="h-4 w-4 text-emerald-600 animate-spin" />
                            <span className="text-sm text-gray-400">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t p-4 pb-6">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`
                            px-4 py-2 rounded-xl flex items-center justify-center transition-all duration-200
                            ${!input.trim() || isLoading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95'
                            }
                        `}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
