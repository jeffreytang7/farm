var mongoose = require("mongoose");

var ToolDetailsSchema = new mongoose.Schema({
    location:{
        type: String
    },
    month:{
        type: String
    },
    tool_name:{
        type: String
    },
    quantity:{
        type:String
    },
    amount:{
        type:String
    }
});

module.exports = ToolDetails = mongoose.model("ToolDetails", ToolDetailsSchema);