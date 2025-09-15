const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Dummy user storage (remplacer par MongoDB plus tard)
const users = [];

// Inscription
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "Utilisateur créé !" });
});

// Connexion
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
