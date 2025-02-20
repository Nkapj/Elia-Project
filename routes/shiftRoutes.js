const express = require('express');
const router = express.Router();
const Shift = require('../models/shift');
const Notification = require('../models/Notification');



router.post('/request', async (req, res) => {
    try {
        const { requester, receiver, day, oldShift, newShift } = req.body;

        const newRequest = new Shift({
            requester,
            receiver,
            day,
            oldShift,
            newShift,
            status: "pending"
        });

        await newRequest.save();


        // ✅ Ajouter une notification pour le receiver
        const notification = new Notification({
            receiver,
            message: `Vous avez une nouvelle demande de shift de ${requester}`
        });

        await notification.save();

        res.status(201).json({ message: "Demande envoyée !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err });
    }
});






router.get('/', async (req, res) => {
    try {
        const requests = await Shift.find().populate("requester receiver day");
        res.json(requests);

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err });
    }
});








router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const shiftRequest = await Shift.findById(req.params.id);

        if (!shiftRequest) {
            return res.status(404).json({ error: "Demande non trouvée" });
        }

        shiftRequest.status = status;
        await shiftRequest.save();

        res.json({ message: "Statut mis à jour", shiftRequest });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err });
    }
});




module.exports = router;
