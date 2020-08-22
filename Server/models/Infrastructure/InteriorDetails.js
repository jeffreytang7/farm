var mongoose = require("mongoose");

var InteriorDetailsSchema = new mongoose.Schema({
    location:{
        type: String
    },
    month:{
        type: String
    },
    interior_name:{
        type: String
    },
    area:{
        type:String
    },
    reason:{
        type:String
    },
    amount:{
        type:String
    }
});

module.exports = InteriorDetails = mongoose.model("InteriorDetails", InteriorDetailsSchema);