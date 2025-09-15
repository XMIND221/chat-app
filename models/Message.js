const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatRoom",
            required: true,
        },
    },
    { timestamps: true } // Ajoute automatiquement createdAt et updatedAt
);

module.exports = mongoose.model("Message", messageSchema);
