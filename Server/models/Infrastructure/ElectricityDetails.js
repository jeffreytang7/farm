var mongoose = require("mongoose");

var ElectricityDetailsSchema = new mongoose.Schema({
    location:{
        type: String
    },
    month:{
        type: String
    },
    division_name:{
        type: String
    },
    power_consumed:{
        type:String
    },
    amount:{
        type:String
    }
});

module.exports = ElectricityDetails = mongoose.model("ElectricityDetails", ElectricityDetailsSchema);