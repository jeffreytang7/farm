var mongoose = require("mongoose");

var FurnitureCostsSchema = new mongoose.Schema({
    location:{
        type: String
    },
    month:{
        type: String
    },
    furniture_item:{
        type: String
    },
    quantity:{
        type:String
    },
    amount:{
        type:String
    }
});

module.exports = FurnitureCosts = mongoose.model("FurnitureCosts", FurnitureCostsSchema);