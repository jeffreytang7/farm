var mongoose = require("mongoose");

var EmployeeWagesSchema = new mongoose.Schema({
    ename:{
        type:String
    },
    date:{
        type:String
    },
    timeIn:{
        type:String
    },
    timeOut:{
        type:String
    },
    hrRate:{
        type:String
    },
    overTimeRate:{
        type:String
    },
    bonus:{
        type:String
    },
})

module.exports = EmployeeWages = mongoose.model("EmployeeWages",EmployeeWagesSchema);