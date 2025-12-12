import React, { useState, useRef, useEffect } from 'react';
import { askRoomQuestion } from '../../api/apis';
import './StudentRoom.css'; // Reusing existing CSS or create new one

const Chatbot = ({ roomId }) => {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your chatbot 🤖 How can I help you today?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        setSending(true);
        setMessages((prev) => [...prev, { text: "Typing...", sender: "bot" }]);

        try {
            const res = await askRoomQuestion(roomId, newMessage.text);
            setMessages((prev) => {
                const withoutTyping = prev.filter((m) => m.text !== "Typing..." || m.sender !== "bot");
                return [...withoutTyping, { text: res?.message ?? "No response", sender: "bot" }];
            });
        } catch (err) {
            setMessages((prev) => {
                const withoutTyping = prev.filter((m) => m.text !== "Typing..." || m.sender !== "bot");
                return [...withoutTyping, { text: "Sorry, I couldn't process that.", sender: "bot" }];
            });
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <aside className="room-chatbot">
            <h3>Study Bot</h3>
            <div className="room-chat-window">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`chat-message ${msg.sender === "bot" ? "bot" : "user"}`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="room-chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
                    placeholder="Type your question..."
                    disabled={sending}
                />
                <button onClick={handleSend} disabled={sending}>
                    {sending ? "..." : "Send"}
                </button>
            </div>
        </aside>
    );
};

export default Chatbot;
