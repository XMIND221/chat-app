const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { authenticateToken } = require("./auth");

// Modèle salle de chat
const chatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: String }],
});
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

// Créer salle
router.post("/create", authenticateToken, async (req, res) => {
    try {
        const { name } = req.body;
        const room = new ChatRoom({ name, users: [] });
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer salles
router.get("/", authenticateToken, async (req, res) => {
    const rooms = await ChatRoom.find();
    res.json(rooms);
});

// Rejoindre salle
router.post("/join/:id", authenticateToken, async (req, res) => {
    const room = await ChatRoom.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Salle non trouvée" });
    if (!room.users.includes(req.user.username)) room.users.push(req.user.username);
    await room.save();
    res.json(room);
});

// Quitter salle
router.post("/leave/:id", authenticateToken, async (req, res) => {
    const room = await ChatRoom.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Salle non trouvée" });
    room.users = room.users.filter((u) => u !== req.user.username);
    await room.save();
    res.json(room);
});

module.exports = router;
