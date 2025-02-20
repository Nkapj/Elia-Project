const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, // Permet de savoir si l’utilisateur a vu la notif
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", NotificationSchema);
