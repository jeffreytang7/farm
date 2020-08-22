var mongoose = require("mongoose");

var ToolCheckoutSchema = new mongoose.Schema({
    toolname:{
        type:String
    },
    timein:{
        type:String
    },
    timeout:{
        type:String
    },
    location:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = ToolCheckout = mongoose.model("toolcheckout", ToolCheckoutSchema);