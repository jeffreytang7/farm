var mongoose = require('mongoose');

var AccountInfoSchema = new mongoose.Schema({
    fullname:{
        type:String
    },
    Location:{
        type: String
    },
    Role:{
        type:String
    },
    PaymentType:{
        type: String
    },
    MailingAddress:{
        type:String
    }
});

module.exports = AccountInfo = mongoose.model("accountinfo", AccountInfoSchema);