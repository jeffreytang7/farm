const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Yield = require("../../models/Yield");
const Sector1Detail = require('../../models/YieldTracking/Sector1');
const Materialuse = require("../../models/MaterialUse");
const EmployeeWages = require("../../models/EmployeeWages");
const AccountInfo = require("../../models/AccountInfo");
const ToolCheckout = require("../../models/ToolCheckout");
const PackedItems = require("../../models/PackedItems");

router.post('/register', [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter a password of minimum length 6 characters').isLength({ min: 6})
], async (req,res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    else{
        
       const email = req.body.email;
       let user = await User.findOne({ email });
       if(user){
           return res.status(400).json({ errors: [{ msg: "User already exists"}]});
       }
       else{
         try {
           const avatar = gravatar.url(email, {
               s: '200',
               r: 'pg',
               d: 'mm'
           })
           const firstName = req.body.firstName;
           const lastName = req.body.lastName;
           const role = req.body.role;
           const location = req.body.location;
           let salt = await bcrypt.genSalt(10);
           const password = await bcrypt.hash(req.body.password, salt);

           user = new User({
               firstName,
               lastName,
               email,
               password,
               role,
               avatar
           })

           await user.save();
           
           const payload = {
               user:{
                   id: user.id
               }
           }
           
           jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err,token) => {
               if(err) throw err;
               res.send({token});
           })

           return //res.status(200).json({msg: "user succesfully Registered"})
        }catch (err){
            console.log(err.message);
            return res.status(400).json({error : err.message});
        }
       }
       //res.send('users route!!');
    }
});

router.get('/getUserDetails', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: "No User details found"});
    }
});

router.post('/login', 
  [
      check('email','Enter a valid email').isEmail(),
      check('password','password is required').exists()
  ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors: errors.array()});
    }
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if(!user){
            res.status(400).json({msg: "user doesn't exist!!"});
        }else{
          const imatch = await bcrypt.compare(password, user.password);
          if(!imatch){
              return res.status(400).json({msg: "invalid password"});
          }
          
          const payload = {
              user:{
                  id: user.id
              }
          };

          jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err,token) => {
              if(err) throw err;
              res.json({token});
          })
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json('server error');
    }
})

router.post('/work-done', 
  [
      check('email','Enter a valid email').isEmail(),
      check('password','password is required').exists()
  ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors: errors.array()});
    }
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if(!user){
            res.status(400).json({msg: "user doesn't exist!!"});
        }else{
          const imatch = await bcrypt.compare(password, user.password);
          if(!imatch){
              return res.status(400).json({msg: "invalid password"});
          }
          
          const payload = {
              user:{
                  id: user.id
              }
          };

          jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err,token) => {
              if(err) throw err;
              res.json({token});
          })
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json('server error');
    }
})

router.post('/yieldtrack', async (req,res) => {
    try{
      let location = req.body.location;
      let item = req.body.item;
      let itemUnit = req.body.itemUnit;
      let category = req.body.category;
      let requiredItem = req.body.requiredItem;
      let yield = req.body.yield;
      let lostproduct = req.body.lostproduct;
      let netYield = req.body.netYield;
      yield = new Yield({
        location,
        item,
        itemUnit,
        category,
        requiredItem,
        yield,
        lostproduct,
        netYield,
    });
    await yield.save();
    console.log("Details succesfully entered");
    res.status(200).json("Details succesfully entered");
    }catch(err){
        console.error(err.message);
        res.status(500).json('server error');
    }
});

// This router distincts all items within a location name
router.get("/getYieldtrackItemYield", async(req, res) =>{
    var jsonLocation = req.query;
    let selectedLocation = jsonLocation.locationChosen;
    let yieldTrackItems = await Yield.distinct('item', {'location': selectedLocation});  // Distinct all 'item' values where 'location' is location selected
    if(!yieldTrackItems){
        console.log("nothing was found");
        res.status(200).json("nothing was found");
    }
    else{
        console.log("Location selected: ", selectedLocation)
        console.log("All Items: ", yieldTrackItems, "\n");
        res.status(200).json(yieldTrackItems);
    }
});

router.get("/getAllYieldDetails", async(req,res) => {
    let AllDetails = await Yield.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let items = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!items.includes(record.item)){
            items.push(record.item);
        }
      })
      console.log("locations: ", locations);
      let final_data = {};
      locations.map((location,index) => {
          var location_wise_data = {};
          items.map(async(item,idx) => {
             var data = await Yield.find({$and:[{location},{item}]});
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + parseInt(dat.netYield, 10);
             });
             location_wise_data[item] = sum;
          });
          setTimeout(() => console.log(location, "location_wise_data: ", location_wise_data), 1000);
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data: ", final_data);
          res.send(final_data);
        }, 1000);
    }
});

router.get("/getAllYieldLoss", async(req,res) => {
    let AllDetails = await Yield.find({});
    if(!AllDetails){
       res.status(500).json("no details found");
    }
    else{
      let locations = [];
      let items = [];
      let ob = {}
      await AllDetails.map((record,index) => {
        if(!locations.includes(record.location)){
            locations.push(record.location);
        }
        if(!items.includes(record.item)){
            items.push(record.item);
        }
      })
      let final_data = {};
      locations.map((location,index) => {
          var location_wise_data = {};
          items.map(async(item,idx) => {
             var data = await Yield.find({$and:[{location},{item}]});
             var sum = 0;
             data.map((dat,i) => {
                 sum = sum + (parseInt(dat.lostproduct, 10)*-1);
             });
             location_wise_data[item] = sum;
          });
          final_data[location] = location_wise_data;
      })
      setTimeout(() => {
          console.log("final_data_lostproduct: ", final_data, "\n");
          res.send(final_data);
        }, 1000);
    }
});

router.get("/getSector1Details", async(req, res) => {
    let AllSector1Details = await Sector1Detail.find({});
    if(!AllSector1Details){
        res.status(500).json("no details found");
    } else {
        let totalYield = 0;
        let plant_dates = [];
        let end_harvest_dates = [];
        AllSector1Details.map((detail, index) => {
            // sum up all daily yield
            let tempYield = parseInt(detail.daily_yield);
            totalYield += tempYield;

            // append all new plant dates and end harvest dates to an array
            if(!plant_dates.includes(detail.plant_date)){
                plant_dates.push(detail.plant_date);
            }
            if(!end_harvest_dates.includes(detail.end_harvest)){
                end_harvest_dates.push(detail.end_harvest);
            }
        });
        
        // Sort Plant Dates and End Harvest Dates
        let plant_dates_sorted = plant_dates.sort(
            function(a,b) {
                a = a.split('-').reverse().join('');
                b = b.split('-').reverse().join('');
                return a > b ? 1 : a < b ? -1 : 0;                
            }
        );
        let end_harvest_dates_sorted = end_harvest_dates.sort(
            function(a,b) {
                a = a.split('-').reverse().join('');
                b = b.split('-').reverse().join('');
                return a > b ? 1 : a < b ? -1 : 0;                
            }
        );

        // Put together final data and send to the requestor
        let final_data = {
            sector : "1",
            cycleStart : plant_dates_sorted[0],
            cycleEnd : end_harvest_dates_sorted[end_harvest_dates_sorted.length - 1],
            weeklyProduce : totalYield,
            lostProduct : 256
        };
        res.send(final_data);
    }
});

router.get("/material", async(req, res) => {
    const { item } = req.query;
    try{
        const materialInfo = await Materialuse.findOne({ item });
        res.send(materialInfo)
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: "No User details found"});
    }
});

router.get("/materialusefill", async(req, res) => {
    try{
        const materialInfo = await Materialuse.findOne({});
        if (!materialInfo) {
            materialuse = new Materialuse({ 
                item: "manure", name: "admin", amount: "100", action: "add"
            });
            await materialuse.save();
            materialuse = new Materialuse({ 
                item: "growth enhancers", name: "admin", amount: "100", action: "add"
            });
            await materialuse.save();
            materialuse = new Materialuse({ 
                item: "seeds", name: "admin", amount: "100", action: "add"
            });
            await materialuse.save();
            materialuse = new Materialuse({ 
                item: "natural fertilizer", name: "admin", amount: "100", action: "add"
            });
            await materialuse.save();
            materialuse = new Materialuse({ 
                item: "soil enhancers", name: "admin", amount: "100", action: "add"
            });
            await materialuse.save();
            materialuse = new Materialuse({ 
                item: "pest control", name: "admin", amount: "100", action: "add"
            });
            await materialuse.save();
            res.status(200).json("Details succesfully entered");
        }
        else{
            res.status(200).json("Already exist")
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: "No User details found"});
    }
});

router.post("/materialuse", async(req,res) => {
    try{
        let item = req.body.item;
        let name = req.body.name;
        let amount = req.body.amount;
        let action = req.body.action;

        const materialInfo = await Materialuse.findOne({ item });
        if (materialInfo) {
            let date_ob = new Date();
            // console.log(materialInfo)
            // console.log(item)
            if (action === "add") {
                let addAmount = parseInt(materialInfo.amount) + parseInt(amount);
                await Materialuse.findOneAndUpdate({item: item}, {name: name, amount: addAmount, action: action, date: date_ob});
                res.status(200).json("Details succesfully entered");
            }
            else {
                let subAmount = materialInfo.amount - parseInt(amount)

                if (subAmount >= 0) {
                    await Materialuse.findOneAndUpdate({item: item}, {name: name, amount: subAmount, action: action, date: date_ob});
                    res.status(200).json("Details succesfully entered");
                }
                else {
                    res.status(200).json(`Error: Input Amount exceeding existing amount`);
                }
            }
        }else{
            materialuse = new Materialuse({ 
                item: "manure", name: "admins", amount: "100", action: "add"
            });
            await materialuse.save();
            res.status(200).json(`Initializing ${materialInfo.item} successfully`)
        }
  
    }catch(err){
        console.log(err.message);
        res.status(500).json("server error");
    }
});

router.post("/inputwages", async(req,res) => {
      try{
          let ename = req.body.ename;
          let date = req.body.date;
          let timeIn = req.body.timeIn;
          let timeOut = req.body.timeOut;
          let hrRate = req.body.hrRate;
          let overTimeRate = req.body.overTimeRate;
          let bonus = req.body.bonus;
          employeewages = new EmployeeWages({
              ename,
              date,
              timeIn,
              timeOut,
              hrRate,
              overTimeRate,
              bonus,
        });
        await employeewages.save();
        console.log("New record created in the database");
        res.status(200).json("New data Recorded succesfully");
      }catch(err){
          console.log(err.message);
          res.status(500).json("server error");
      }
});

router.post("/AccountInfo", async(req,res) => {
    try{
       const accountinfo = await AccountInfo.findOne({ fullname: req.body.name });
       if(!accountinfo){
           let fullname = req.body.name;
           let Location = req.body.farm;
           let Role = req.body.role;
           let PaymentType = "By eMail";
           let MailingAddress = req.body.streetAddress+","+req.body.city+","+req.body.state+","+req.body.zipcode;
           accountinfo1 = new AccountInfo({
            fullname,
            Location,
            Role,
            PaymentType,
            MailingAddress,
           });
           await accountinfo1.save();
           console.log("New User Created");
           res.status(500).json("New User Created");
       }else{
           accountinfo.fullname = req.body.name;
           accountinfo.Location = req.body.farm;
           accountinfo.Role = req.body.role;
           accountinfo.MailingAddress = req.body.streetAddress+","+req.body.city+","+req.body.state+","+req.body.zipcode;
           await accountinfo.save();
           console.log("Employee Account Details Updated");
           res.status(200).json("Employee Account Details Updated");
        }
    }catch(err){
        console.log(err);
        res.status(500).json("server error");
    }
});

router.post("/toolcheckout", async(req,res) => {
    try{
       let toolname = req.body.toolname;
       let timein = req.body.timein;
       let timeout = req.body.timeout;
       let location = req.body.location;
       toolcheckout = new ToolCheckout({
           toolname,
           timein,
           timeout,
           location,
       })
       await toolcheckout.save();
       console.log("New Tool checkout record added");
       res.status(200).json("New Tool checkout record added");
    }catch(err){
        console.log(err.message);
        res.status(500).json("server error");
    }
});

router.post("/farmpacking", async(req,res) => {
    try{
       let item = req.body.item;
       let num = req.body.num;
       let unit = req.body.unit;
       let sender = req.body.sender;
       let paymentType = req.body.paymentType;
       let referenceNumber = req.body.referenceNumber;
       let location = req.body.location;
       let receiver = req.body.receiver;
       packeditems = new PackedItems({
           item,
           num,
           unit,
           sender,
           referenceNumber,
           paymentType,
           location,
           receiver
       });
       await packeditems.save();
       console.log("item added successfully")
       res.status(200).json("item added successfully");
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server error")
    }
})
module.exports = router;