var mongoose = require('mongoose');

var InfrastructureRentSchema = new mongoose.Schema({
  location:{
      type: String,
  },
  month:{
      type: String
  },
  building_name:{
      type: String
  },
  area:{
      type:String
  },
  amount:{
      type:String
  }
});

module.exports = InfraRent = mongoose.model("InfraRent", InfrastructureRentSchema);
