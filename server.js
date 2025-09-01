// Import des dépendances
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

// Initialisation de l'application Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connexion MongoDB réussie"))
.catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur Chat-App 🚀");
});

// Socket.io (connexion temps réel)
io.on("connection", (socket) => {
  console.log("⚡ Un utilisateur est connecté");

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté");
  });
});

// Lancement du serveur
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
