var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    role:{
       type: String
    },
    location:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);