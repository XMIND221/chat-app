import { useState } from "react";

function App() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Salut 👋", from: "other" },
        { id: 2, text: "Yo !", from: "me" },
    ]);
    const [input, setInput] = useState("");

    // Fonction pour envoyer un message
    const sendMessage = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { id: Date.now(), text: input, from: "me" }]);
        setInput("");
    };

    // Fonction pour gérer la touche Entrée
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // évite le retour à la ligne
            sendMessage();
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r p-4">
                <h2 className="text-xl font-bold mb-4">💬 Mes Salons</h2>
                <ul>
                    <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Général</li>
                    <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Développement</li>
                    <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Gaming</li>
                </ul>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b p-4 font-bold">Salon : Général</div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-2 rounded max-w-xs ${msg.from === "me"
                                    ? "bg-blue-500 text-white self-end ml-auto"
                                    : "bg-gray-200 text-black"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress} // ✅ Détection de la touche Entrée
                        placeholder="Écrire un message..."
                        className="flex-1 border rounded p-2"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
