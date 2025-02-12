const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
    startDate : {type: Date, required : true},
    endDate : {type: Date, required : true},
    guard : {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
    days : {type : mongoose.Schema.Types.ObjectId, ref : 'Day'}
});

module.exports = mongoose.model('Week', weekSchema);