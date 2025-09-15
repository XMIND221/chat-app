const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const router = express.Router();

// ✅ Créer une nouvelle salle
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const room = new ChatRoom({ name });
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la création de la salle", error: err });
    }
});

// ✅ Récupérer toutes les salles
router.get("/", async (req, res) => {
    try {
        const rooms = await ChatRoom.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
});

module.exports = router;
