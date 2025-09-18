import React from "react";

const RoomList = ({ rooms = [] }) => {
    return (
        <div>
            <h2>Liste des salons</h2>
            {rooms.length === 0 ? (
                <p>Aucun salon disponible</p>
            ) : (
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index}>{room}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomList;
