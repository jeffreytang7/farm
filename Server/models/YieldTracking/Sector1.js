var mongoose = require("mongoose");

var Sector1Schema = new mongoose.Schema({
    crop_name:{
        type: String
    },
    month:{
        type: String
    },
    plant_date: {
        type: String
    },
    start_harvest:{
        type: String
    },
    end_harvest:{
        type: String
    },
    daily_yield:{
        type:String
    },
    sector:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Sector1Details = mongoose.model("Sector1Details", Sector1Schema);