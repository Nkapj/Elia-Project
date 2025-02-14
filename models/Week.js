const mongoose = require("mongoose");

const WeekSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guard: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: [{ type: mongoose.Schema.Types.ObjectId, ref: "Day" }]
});

module.exports = mongoose.model("Week", WeekSchema);
