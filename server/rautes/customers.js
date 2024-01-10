const rauter = require("express").Router();
const logger = require("../logs/logger");
const {authMW} = require("../middleware/auth");
const {Customer,ValidateCustomer} = require("../models/Customer")
//יצירת לקוח חדש
rauter.post("/",authMW(),async(req,res)=>{
    const {error} = ValidateCustomer(req.body);
    if (error){
      res.status(400).json(error.details[0].message)
      logger.error(`Error message":${error.details[0].message}`);
      return;
    }
    try{
        const user = new Customer(req.body);
        await user.save();
        res.send(user);
         
    }catch(error){
        res.status(401).send(error.message)
    } 
})
//מצא לקוח לפי ת"ז
rauter.get("/:id",authMW(),async(req,res)=>{
    const customer = await Customer.findOne({israeliId:req.params.id})
    if(!customer){
      res.status(400).send("customer not faund")
      return
    }
    res.json(customer);
  })
//מצא לקוח לפי מספר איידי
rauter.get("/byid/:id",authMW(),async(req,res)=>{
    const customer = await Customer.findOne({_id:req.params.id})
    if(!customer){
        res.status(400).send("customer not faund")
        return
    }
    res.json(customer);
})
// שינוי פרטי לקוח
rauter.patch("/:id",authMW(),async(req,res)=>{
    const {error} = ValidateCustomer(req.body);
    if (error){
      res.status(400).json(error.details[0].message)
      logger.error(`Error message":${error.details[0].message}`);
      return;
    }
    try{
        const customer = await Customer.findOneAndUpdate({israeliId:req.params.id},req.body,{new:true});
        res.json(customer);
    }
    catch(error){
        res.status(401).send(error.message)
        logger.error(error.message)
    }
})
// מחיקת לקוח מהמאגר
rauter.delete("/:id",authMW(),async(req,res)=>{
    const customer = await Customer.findOne({israeliId:req.params.id})
    if (!customer){
        res.status(401).send(`the customer with israel id- ${req.params.id} not exist`);
        logger.error(`the customer with israel id- ${req.params.id} not exist`)
        return;
    }
    await Customer.findOneAndDelete({israeliId:req.params.id});
    res.json(customer);
})
// הוספת הזמנה למערך הזמנות של לקוח
rauter.put("/orders/:israeliId",authMW(),async(req,res)=>{
    const customer = await Customer.findOne({israeliId:req.params.israeliId});
    console.log(req.body._id)
    customer.orders.push(req.body._id);
    try{
        await Customer.findOneAndUpdate({israeliId:req.params.israeliId},customer);
        res.send(customer);
    }catch(e){
        res.status(400).send(e.message)
    }
})
module.exports = rauter;