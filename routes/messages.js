const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

// ➤ Envoyer un message dans une salle
router.post("/", async (req, res) => {
    const { content, senderId, roomId } = req.body;

    try {
        // Vérifier que la salle existe
        const room = await ChatRoom.findById(roomId);
        if (!room) return res.status(404).json({ message: "Salle non trouvée" });

        // Créer le message
        const message = new Message({
            content,
            sender: senderId,
            room: roomId,
        });
        await message.save();

        res.status(201).json(message);
    } catch (err) {
        console.error("Erreur lors de l'envoi du message :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ➤ Récupérer les messages d’une salle
router.get("/:roomId", async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.roomId })
            .populate("sender", "username") // Affiche seulement le username du User
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        console.error("Erreur lors de la récupération des messages :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
