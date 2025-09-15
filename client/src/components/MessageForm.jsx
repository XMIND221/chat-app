// MessageForm.jsx
import { useState } from "react";

export default function MessageForm({ socket, roomId, userId }) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        socket.emit("sendMessage", { content: message, senderId: userId, roomId });
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="flex-1 border rounded px-3 py-2"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Envoyer
            </button>
        </form>
    );
}
