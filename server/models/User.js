const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    email : {type: String,  required: true, unique : true },
    password : {type: String, required: true },
    role : { type: String, enum: ["employé", "admin"], default: "employé"},
    employeeId: { type: String, unique: true, required: true },
    firstname : {type: String,required: true},
    lastname : {type: String,required: true},
    shiftsCompleted: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);

