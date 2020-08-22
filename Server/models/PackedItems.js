var mongoose = require("mongoose");

var PackedItemsSchema = new mongoose.Schema({
    item:{
        type:String
    },
    num:{
        type:String
    },
    units:{
        type:String
    },
    sender:{
        type:String
    },
    paymentType:{
        type:String
    },
    referenceNumber:{
        type:String
    },
    location:{
        type:String
    },
    receiver:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = PackedItems = mongoose.model("Packed Items",PackedItemsSchema);