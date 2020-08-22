const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const InfraRent = require("../../models/Infrastructure/InfrastructureRent");
const ElectricityDetails = require("../../models/Infrastructure/ElectricityDetails");
const FurnitureCosts = require("../../models/Infrastructure/FurnitureCosts");
const EquipmentDetails = require('../../models/Infrastructure/EquipmentDetails');
const ToolDetails = require('../../models/Infrastructure/ToolDetails');
const InteriorDetails = require('../../models/Infrastructure/InteriorDetails');


router.get("/getRentDetails", async(req,res) => {
    let {location, month} = req.query
    //console.log("month: ", month);
    let rentRecords = await InfraRent.find({$and:[{location},{month}]});
    if(!rentRecords){
        console.log("no details found");
        res.status(200).json("no details found");
    }
    else{
        console.log("rentRecord: ", rentRecords);
        res.status(200).json(rentRecords);
    }
});

router.get("/getAllRentDetails", async(req,res) => {
    let AllDetails = await InfraRent.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let months = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!months.includes(record.month)){
            months.push(record.month);
        }
      })
      console.log("locations: ", locations);
      //console.log("AllDetails: ", AllDetails);
      let final_data = {};
      //let location_wise_data;
      locations.map((location,index) => {
          var location_wise_data = {};
          //console.log("months: ", months);
          months.map(async(month,idx) => {
             var data = await InfraRent.find({$and:[{location},{month}]});
             //console.log("data: ",data);
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.amount, 10);
             });
             //console.log("month: ", month);
             //console.log("sum: ", sum);
             location_wise_data[month] = sum;
          });
          setTimeout(() => console.log("location_wise_data: ", location_wise_data), 1000);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 1000);
    }
});

router.get("/getAllElectricityDetails", async(req,res) => {
    let AllDetails = await ElectricityDetails.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let months = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!months.includes(record.month)){
            months.push(record.month);
        }
      })
      console.log("locations: ", locations);
      //console.log("AllDetails: ", AllDetails);
      let final_data = {};
      //let location_wise_data;
      locations.map((location,index) => {
          var location_wise_data = {};
          //console.log("months: ", months);
          months.map(async(month,idx) => {
             var data = await ElectricityDetails.find({$and:[{location},{month}]});
             //console.log("data: ",data);
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.amount, 10);
             });
             //console.log("month: ", month);
             //console.log("sum: ", sum);
             location_wise_data[month] = sum;
          });
          setTimeout(() => console.log("location_wise_data: ", location_wise_data), 500);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 500);
    }
});

router.get("/getAllFurnitureDetails", async(req,res) => {
    let AllDetails = await FurnitureCosts.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let months = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!months.includes(record.month)){
            months.push(record.month);
        }
      })
      console.log("locations: ", locations);
      //console.log("AllDetails: ", AllDetails);
      let final_data = {};
      //let location_wise_data;
      locations.map((location,index) => {
          var location_wise_data = {};
          //console.log("months: ", months);
          months.map(async(month,idx) => {
             var data = await FurnitureCosts.find({$and:[{location},{month}]});
             //console.log("data: ",data);
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.amount, 10);
             });
             //console.log("month: ", month);
             //console.log("sum: ", sum);
             location_wise_data[month] = sum;
          });
          setTimeout(() => console.log("location_wise_data: ", location_wise_data), 500);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 500);
    }
});

router.post("/saveRentDetails", async(req,res) => {
    let location = req.body.location;
    let month = req.body.month;
    let building_name = req.body.building_name;
    let rentrecord = await InfraRent.findOne({$and:[{location},{month},{building_name}]});
    if(!rentrecord){
       let area = req.body.area;
       let amount = req.body.amount;
       RentRecord = new InfraRent({
          location,
          month,
          building_name,
          area,
          amount
       });
       await RentRecord.save();
       console.log("New Record Created");
       res.status(200).json("Details Succesfully entered");
    }
    else{
        rentrecord.area = req.body.area;
        rentrecord.amount = req.body.amount;
        await rentrecord.save();
        console.log("existing record updated");
        res.status(200).json("New details updated");
    }
});

router.get("/deleteRentDetails", async(req,res) => {
    let {location, month, building_name} = req.query;
    let rentrecords = await InfraRent.findOne({$and:[{location},{month},{building_name}]});
    if(!rentrecords){
        console.log("Error: no details found");
        res.status(200).json("Error: no details found");
    }
    else{
        await rentrecords.remove();
        console.log("Deleted record Successfully")
        res.status(200).json("Deleted record Successfully");
    }
});

router.get("/getElectricityDetails", async(req,res) => {
    let {location, month} = req.query
    //console.log("month: ", month);
    let electricityRecords = await ElectricityDetails.find({$and:[{location},{month}]});
    if(!electricityRecords){
        console.log("no details found");
        res.status(200).json("no details found");
    }
    else{
        //console.log("electricityRecords: ", electricityRecords);
        res.status(200).json(electricityRecords);
    }
});

router.post("/saveElectricityDetails", async(req,res) => {
    let location = req.body.location;
    let month = req.body.month;
    let division_name = req.body.division_name;
    let electricityrecord = await ElectricityDetails.findOne({$and:[{location},{month},{division_name}]});
    if(!electricityrecord){
       let power_consumed = req.body.power_consumed;
       let amount = req.body.amount;
       ElectricityRecord = new ElectricityDetails({
          location,
          month,
          division_name,
          power_consumed,
          amount
       });
       await ElectricityRecord.save();
       console.log("New Electricity Record Created");
       res.status(200).json("Details Succesfully entered");
    }
    else{
        electricityrecord.power_consumed = req.body.power_consumed;
        electricityrecord.amount = req.body.amount;
        await electricityrecord.save();
        console.log("existing Electricity record updated");
        res.status(200).json("New Electricity details updated");
    }
});

router.get("/deleteElectricityDetails", async(req,res) => {
    let {location, month, division_name} = req.query;
    let electricityrecords = await ElectricityDetails.findOne({$and:[{location},{month},{division_name}]});
    if(!electricityrecords){
        console.log("Error: no details found");
        res.status(200).json("Error: no details found");
    }
    else{
        await electricityrecords.remove();
        console.log("Deleted record Successfully")
        res.status(200).json("Deleted record Successfully");
    }
});

router.post("/saveFurnitureCosts", async(req,res) => {
    let location = req.body.location;
    let month = req.body.month;
    let furniture_item = req.body.furniture_item;
    let furniturerecord = await FurnitureCosts.findOne({$and:[{location},{month},{furniture_item}]});
    if(!furniturerecord){
       let quantity = req.body.quantity;
       let amount = req.body.amount;
       FurnitureRecord = new FurnitureCosts({
          location,
          month,
          furniture_item,
          quantity,
          amount
       });
       await FurnitureRecord.save();
       console.log("New Furniture Record Created");
       res.status(200).json("Details Succesfully entered");
    }
    else{
        furniturerecord.furniture_item = req.body.furniture_item;
        furniturerecord.amount = req.body.amount;
        await furniturerecord.save();
        console.log("existing Furniture record updated");
        res.status(200).json("New Furniture details updated");
    }
});

router.get("/getFurnitureDetails", async(req,res) => {
    let {location, month} = req.query
    //console.log("month: ", month);
    let furniturerecords = await FurnitureCosts.find({$and:[{location},{month}]});
    if(!furniturerecords){
        console.log("no details found");
        res.status(200).json("no details found");
    }
    else{
        res.status(200).json(furniturerecords);
    }
});

router.get("/deleteFurnitureDetails", async(req,res) => {
    let {location, month, furniture_item} = req.query;
    let furniturerecords = await FurnitureCosts.findOne({$and:[{location},{month},{furniture_item}]});
    if(!furniturerecords){
        console.log("Error: no details found");
        res.status(200).json("Error: no details found");
    }
    else{
        await furniturerecords.remove();
        console.log("Deleted record Successfully")
        res.status(200).json("Deleted record Successfully");
    }
});

router.get("/getAllEquipmentDetails", async(req,res) => {
    let AllDetails = await EquipmentDetails.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let months = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!months.includes(record.month)){
            months.push(record.month);
        }
      })
      console.log("locations: ", locations);
      //console.log("AllDetails: ", AllDetails);
      let final_data = {};
      //let location_wise_data;
      locations.map((location,index) => {
          var location_wise_data = {};
          //console.log("months: ", months);
          months.map(async(month,idx) => {
             var data = await EquipmentDetails.find({$and:[{location},{month}]});
             //console.log("data: ",data);
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.amount, 10);
             });
             //console.log("month: ", month);
             //console.log("sum: ", sum);
             location_wise_data[month] = sum;
          });
          setTimeout(() => console.log("location_wise_data: ", location_wise_data), 500);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 500);
    }
});

router.get("/getEquipmentDetails", async(req,res) => {
    let {location, month} = req.query
    //console.log("month: ", month);
    let equipmentrecords = await EquipmentDetails.find({$and:[{location},{month}]});
    if(!equipmentrecords){
        console.log("no details found");
        res.status(200).json("no details found");
    }
    else{
        res.status(200).json(equipmentrecords);
    }
});

router.post("/saveEquipmentDetails", async(req,res) => {
    let location = req.body.location;
    let month = req.body.month;
    let equipment_name = req.body.equipment_name;
    let equipmentrecords = await EquipmentDetails.findOne({$and:[{location},{month},{equipment_name}]});
    if(!equipmentrecords){
       let quantity = req.body.quantity;
       let amount = req.body.amount;
       equipmentrecords = new EquipmentDetails({
          location,
          month,
          equipment_name,
          quantity,
          amount
       });
       await equipmentrecords.save();
       console.log("New Equipment Record Created");
       res.status(200).json("Details Succesfully entered");
    }
    else{
        equipmentrecords.quantity = req.body.quantity;
        equipmentrecords.amount = req.body.amount;
        await equipmentrecords.save();
        console.log("existing Equipment record updated");
        res.status(200).json("New Equipment details updated");
    }
});

router.get("/deleteEquipmentDetails", async(req,res) => {
    let {location, month, equipment_name} = req.query;
    let equipmentrecords = await EquipmentDetails.findOne({$and:[{location},{month},{equipment_name}]});
    if(!equipmentrecords){
        console.log("Error: no details found");
        res.status(200).json("Error: no details found");
    }
    else{
        await equipmentrecords.remove();
        console.log("Delete Equipment Successfully")
        res.status(200).json("Delete Equipment Successfully");
    }
});

router.get("/getToolDetails", async(req,res) => {
    let {location, month} = req.query
    //console.log("month: ", month);
    let toolrecords = await ToolDetails.find({$and:[{location},{month}]});
    if(!toolrecords){
        console.log("no details found");
        res.status(200).json("no details found");
    }
    else{
        res.status(200).json(toolrecords);
    }
});

router.get("/deleteToolDetails", async(req,res) => {
    let {location, month, tool_name} = req.query;
    let toolrecords = await ToolDetails.findOne({$and:[{location},{month},{tool_name}]});
    if(!toolrecords){
        console.log("Error: no details found");
        res.status(200).json("Error: no details found");
    }
    else{
        await toolrecords.remove();
        console.log("Delete Tool Successfully")
        res.status(200).json("Delete Tool Successfully");
    }
});

router.post("/saveToolDetails", async(req,res) => {
    let location = req.body.location;
    let month = req.body.month;
    let tool_name = req.body.tool_name;
    let toolrecords = await ToolDetails.findOne({$and:[{location},{month},{tool_name}]});
    if(!toolrecords){
       let quantity = req.body.quantity;
       let amount = req.body.amount;
       toolrecords = new ToolDetails({
          location,
          month,
          tool_name,
          quantity,
          amount
       });
       await toolrecords.save();
       console.log("New tool Record Created");
       res.status(200).json("Details Succesfully entered");
    }
    else{
        toolrecords.quantity = req.body.quantity;
        toolrecords.amount = req.body.amount;
        await toolrecords.save();
        console.log("existing tool record updated");
        res.status(200).json("New tool details updated");
    }
});

router.get("/getAllToolDetails", async(req,res) => {
    let AllDetails = await ToolDetails.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let months = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!months.includes(record.month)){
            months.push(record.month);
        }
      })
      console.log("locations: ", locations);
      //console.log("AllDetails: ", AllDetails);
      let final_data = {};
      //let location_wise_data;
      locations.map((location,index) => {
          var location_wise_data = {};
          //console.log("months: ", months);
          months.map(async(month,idx) => {
             var data = await ToolDetails.find({$and:[{location},{month}]});
             //console.log("data: ",data);
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.amount, 10);
             });
             //console.log("month: ", month);
             //console.log("sum: ", sum);
             location_wise_data[month] = sum;
          });
          setTimeout(() => console.log("location_wise_data: ", location_wise_data), 500);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 500);
    }
});


router.get("/getInteriorDetails", async(req,res) => {
    let {location, month} = req.query;
    //console.log("month: ", month);
    let interiorrecords = await InteriorDetails.find({$and:[{location},{month}]});
    if(!interiorrecords){
        console.log("no details found");
        res.status(200).json("no details found");
    }
    else{
        res.status(200).json(interiorrecords);
    }
});

router.get("/deleteInteriorDetails", async(req,res) => {
    let {location, month, interior_name} = req.query;
    // console.log(interior_name)
    let interiorrecords = await InteriorDetails.findOne({$and:[{location},{month},{interior_name}]});
    if(!interiorrecords){
        console.log("Error: no details found");
        res.status(200).json("Error: no details found");
    }
    else{
        await interiorrecords.remove();
        console.log("Delete Interior Successfully")
        res.status(200).json("Delete Interior Successfully");
    }
});

router.post("/saveInteriorDetails", async(req,res) => {
    let location = req.body.location;
    let month = req.body.month;
    let interior_name = req.body.interior_name;
    let interiorrecords = await InteriorDetails.findOne({$and:[{location},{month},{interior_name}]});
    if(!interiorrecords){
       let area = req.body.area;
       let reason = req.body.reason;
       let amount = req.body.amount;
       interiorrecords = new InteriorDetails({
          location,
          month,
          interior_name,
          area,
          reason,
          amount
       });
       await interiorrecords.save();
       console.log("New interior Record Created");
       res.status(200).json("Details Succesfully entered");
    }
    else{
        interiorrecords.area = req.body.area;
        interiorrecords.reason = req.body.reason;
        interiorrecords.amount = req.body.amount;
        await interiorrecords.save();
        console.log("existing interior record updated");
        res.status(200).json("New interior details updated");
    }
});

router.get("/getAllInteriorDetails", async(req,res) => {
    let AllDetails = await InteriorDetails.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let months = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!months.includes(record.month)){
            months.push(record.month);
        }
      })
      console.log("locations: ", locations);
      //console.log("AllDetails: ", AllDetails);
      let final_data = {};
      //let location_wise_data;
      locations.map((location,index) => {
          var location_wise_data = {};
          //console.log("months: ", months);
          months.map(async(month,idx) => {
             var data = await InteriorDetails.find({$and:[{location},{month}]});
             //console.log("data: ",data);
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.amount, 10);
             });
             //console.log("month: ", month);
             //console.log("sum: ", sum);
             location_wise_data[month] = sum;
          });
          setTimeout(() => console.log("location_wise_data: ", location_wise_data), 500);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 500);
    }
});


module.exports = router;
