// Import des dépendances
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Modèles
const Message = require("./models/Message");
const ChatRoom = require("./models/ChatRoom");
const User = require("./models/User"); // si tu as ce modèle

// Routes
const authRoutes = require("./routes/auth");
const chatRoomsRoutes = require("./routes/chatRooms");
const messagesRoutes = require("./routes/messages");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connexion MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/chatRooms", chatRoomsRoutes);
app.use("/api/messages", messagesRoutes);

// ---- 👉 Servir le frontend React (après build) ----
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("⚡ Un utilisateur est connecté");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Utilisateur rejoint la salle ${roomId}`);
    io.to(roomId).emit("roomUpdate", { roomId });
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`Utilisateur quitte la salle ${roomId}`);
    io.to(roomId).emit("roomUpdate", { roomId });
  });

  socket.on("sendMessage", async ({ content, senderId, roomId }) => {
    try {
      const message = await Message.create({
        content,
        sender: senderId,
        room: roomId,
      });
      io.to(roomId).emit("newMessage", message);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté");
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
