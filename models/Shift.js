const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Employé qui demande le changement
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Employé qui reçoit la demande
    day: { type: mongoose.Schema.Types.ObjectId, ref: "Day", required: true }, // Jour concerné
    oldShift: { 
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
    }, // Shift actuel du demandeur

    newShift: { 
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
    }, // Shift proposé

    status: { 
        type: String, 
        enum: ["pending", "accepted", "rejected"], 
        default: "pending" 
    }, // Statut de la demande
});




module.exports = mongoose.model("Shift", ShiftSchema);
