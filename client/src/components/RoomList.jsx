// RoomList.jsx
export default function RoomList({ rooms, socket, setCurrentRoom, currentRoom }) {
    const handleJoin = (roomId) => {
        socket.emit("joinRoom", roomId);
        setCurrentRoom(roomId);
    };

    return (
        <div className="sidebar">
            <h2 className="text-lg font-bold mb-2">Salles de discussion</h2>
            <ul className="space-y-2">
                {rooms.map((room) => (
                    <li
                        key={room._id}
                        className={`p-2 rounded cursor-pointer ${currentRoom === room._id ? "bg-blue-500 text-white" : "bg-gray-100"
                            }`}
                        onClick={() => handleJoin(room._id)}
                    >
                        {room.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
