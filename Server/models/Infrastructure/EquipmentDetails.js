var mongoose = require("mongoose");

var EquipmentDetailsSchema = new mongoose.Schema({
    location:{
        type: String
    },
    month:{
        type: String
    },
    equipment_name:{
        type: String
    },
    quantity:{
        type:String
    },
    amount:{
        type:String
    }
});

module.exports = EquipmentDetails = mongoose.model("EquipmentDetails", EquipmentDetailsSchema);