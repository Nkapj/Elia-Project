const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    schedule: [
    {
        guard: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        start: { type: String, required: true },
        end: { type: String, required: true }
    }
    ]
});

module.exports = mongoose.model("Day", DaySchema);
