import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// connexion au backend
const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  // écouter les nouveaux messages
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg.content]); // on ajoute le nouveau message
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  // envoyer un message au backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      content: message,
      senderId: "user1", // tu pourras mettre un vrai user plus tard
      roomId: "general", // on utilise une salle "générale" par défaut
    });

    setMessage("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">💬 Chat-App</h1>

      {/* messages */}
      <div className="border p-3 rounded h-64 overflow-y-auto mb-4 bg-gray-100">
        {messages.length === 0 ? (
          <p className="text-gray-500">Aucun message pour l’instant...</p>
        ) : (
          messages.map((msg, i) => (
            <p key={i} className="mb-1">
              {msg}
            </p>
          ))
        )}
      </div>

      {/* formulaire */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écris ton message..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default App;
