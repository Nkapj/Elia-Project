const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
    date: {type: Date, require: true},
    schedule: [{
        _id: false, 
            guard: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
            start : {type: String, required : true,  },
            end : {type: String, required : true,  },


            shifts : [{
                _id: false, 
                    
                    originalGuard : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
                    replacementGuard: {type: mongoose.Schema.Types.ObjectId, ref:'User', default: null}
                    }]
        }]
}); 

module.exports = mongoose.model('Day', daySchema, 'day');