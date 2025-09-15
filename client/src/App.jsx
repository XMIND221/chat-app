// App.jsx
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import RoomList from "./components/RoomList";
import CreateChatRoomForm from "./components/CreateChatRoomForm";
import ChatRoom from "./components/ChatRoom";

const socket = io("http://localhost:5000");

export default function App() {
    const [currentRoom, setCurrentRoom] = useState(null); // ID de la salle sélectionnée
    const [rooms, setRooms] = useState([]);
    const userId = "12345"; // ⚠️ à remplacer par l'ID utilisateur réel quand auth sera prête

    // Récupération initiale des salles
    useEffect(() => {
        fetch("http://localhost:5000/api/chatRooms")
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((err) => console.error("Erreur récupération salles:", err));
    }, []);

    return (
        <div className="app-container">
            {/* Sidebar */}
            <div className="sidebar">
                <CreateChatRoomForm setRooms={setRooms} />
                <RoomList
                    rooms={rooms}
                    socket={socket}
                    setCurrentRoom={setCurrentRoom}
                    currentRoom={currentRoom}
                />
            </div>

            {/* Zone de chat */}
            <div className="chat-area">
                {currentRoom ? (
                    <ChatRoom socket={socket} roomId={currentRoom} userId={userId} />
                ) : (
                    <p>Sélectionnez une salle pour commencer à discuter</p>
                )}
            </div>
        </div>
    );
}
