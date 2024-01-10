const rauter = require("express").Router();
const {Order,validateOrder,generateOrderNumber} = require("../models/Order");
const {Worker}=require("../models/Worker")
const {Customer}=require("../models/Customer")
const {authMW}=require("../middleware/auth")
const logger =require("../logs/logger");
const { forEach } = require("lodash");
rauter.post("/",authMW(),async(req,res)=>{
    try{
    const newOrder=req.body;
    newOrder.orderNum = await generateOrderNumber();
    const order =  new Order(newOrder);
    await order.save();
    res.send(order);
    }catch(e){
        res.status(400).send("cant to add a order")
    }
})
rauter.get("/bycustomer/:customerId",async(req,res)=>{
    const results = await Order.find({customer:req.params.customerId})
    res.send(results.data);
})
rauter.get("/:id", authMW(),async(req,res)=>{
    
    const result = await Order.findOne({_id:req.params.id});
    if (!result){
        res.status(400).send("item isn't exist");
        return;
    }
    res.json(result)
})
rauter.patch("/update/:id",authMW(),async(req,res)=>{
    let order = await Order.findOne({_id:req.params.id});
    if (!order){
        res.status(401).send(`the order number not exist`);
        logger.error(`the order number not exist`)
        return;
    }
    order = await Order.findOneAndUpdate({_id:req.params.id},req.body)
    try{
        await order.save();
         res.json(order);
    }catch(error){
        res.status(400).send(error.message)
        logger.error(error.message)
    }
})
module.exports = rauter;