var mongoose = require('mongoose');

var YieldSchema = new mongoose.Schema({
    location:{
        type: String
    },
    item:{
        type: String
    },
    itemUnit:{
        type: String
    },
    category:{
        type: String
    },
    requiredItem:{
        type: String
    },
    yield:{
        type: String
    },
    lostproduct:{
        type: String
    },
    netYield:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Yield = mongoose.model('yield', YieldSchema);