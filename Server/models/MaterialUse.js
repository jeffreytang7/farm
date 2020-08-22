var mongoose = require('mongoose');

var MaterialuseSchema = new mongoose.Schema({
    item:{
        type: String,
    },
    amount:{
        type: String,
    },
    action:{
        type: String,
    },
    name:{
        type: String,
    }, 
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Materialuse = mongoose.model('materialuse', MaterialuseSchema);