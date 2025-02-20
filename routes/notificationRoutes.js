const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');


router.get('/:receiverId', async (req, res) => {
    try {
        const notifications = await Notification.find({ receiver: req.params.receiverId, read: false });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err });
    }
});


// 📌 Marquer une notification comme lue
router.put('/:id', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification non trouvée" });
        }

        notification.read = true;
        await notification.save();

        res.json({ message: "Notification marquée comme lue", notification });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err });
    }
});

router.delete('/:notificationId', async (req, res) => {
    try {
        const { notificationId } = req.params;
        const deletedNotification = await Notification.findByIdAndDelete(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({ error: "Notification introuvable" });
        }

        res.json({ message: "Notification supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err });
    }
});


module.exports = router;