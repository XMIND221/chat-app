// ChatRoom.jsx
import { useEffect, useState } from "react";
import MessageForm from "./MessageForm";

export default function ChatRoom({ socket, roomId, userId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Charger les anciens messages
        fetch(`http://localhost:5000/api/messages/${roomId}`)
            .then((res) => res.json())
            .then((data) => setMessages(data));

        // Écouter les nouveaux messages
        socket.on("newMessage", (message) => {
            if (message.room === roomId) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => socket.off("newMessage");
    }, [roomId, socket]);

    return (
        <div className="chat-area">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.senderId === userId ? "me" : "other"}`}
                    >
                        <span>{msg.content}</span>
                        <span className="timestamp">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>

            <MessageForm socket={socket} roomId={roomId} userId={userId} />
        </div>
    );
}
