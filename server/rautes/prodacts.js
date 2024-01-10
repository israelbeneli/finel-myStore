const rauter = require("express").Router();
const{Prodact,validateProdact} = require("../models/Prodact")
const{authMW} = require("../middleware/auth");
const logger =require("../logs/logger");
//יצירת מוצר חדש
rauter.post("/",authMW("isPurchasingManagerORisAdmin8387"),async(req,res)=>{

    const {error} = validateProdact(req.body);
    if (error){
      res.status(400).json(error.details[0].message)
      logger.error(`Error message":${error.details[0].message}`);
      return;
    }
    try{
        const prodact = new Prodact(req.body);
        await prodact.save();
        res.send(prodact)
         
    }catch(error){
        res.status(401).send(error.message)
        logger.error(error.message)
    }
})
rauter.get("/barcode/:barcode",async(req,res)=>{
    try{
        const product =await Prodact.findOne({barcode:req.params.barcode})
        res.send(product);
    }catch(e){
        res.status(400).send(e.message)
    }
})
rauter.get("/id/:id",async(req,res)=>{
    try{
        const product =await Prodact.findOne({_id:req.params.id})
        res.send(product);
    }catch(e){
        res.status(400).send(e.message)
    }

})
rauter.get("/all",async(req,res)=>{
    try{
        const results = await Prodact.find();
        res.send(results);
    }catch(e){
        res.status(400).send(e.message)
    }

})
//שינוי פרטי מוצר
rauter.patch("/change/:barcode",authMW("isPurchasingManagerORisAdmin"),async(req,res)=>{
       
    try{
        const prodact =await Prodact.findOne({barcode:req.params.barcode})
        if (!prodact){
            res.status(401).send("no item with this barcode")
            return;
        }
            prodact.prodactDetails.name=req.body.prodactDetails.name;
            prodact.prodactDetails.model=req.body.prodactDetails.model;
            prodact.prodactDetails.description=req.body.prodactDetails.description;
            prodact.price=req.body.price;
            prodact.maxDiscount=req.body.maxDiscount;
            prodact.image.url=req.body.image.url;
            prodact.image.alt=req.body.image.alt;
            res.json(await Prodact.findOneAndUpdate({barcode:req.params.barcode},prodact,{new:true}))
    }catch(error){
        res.status(401).send(error.message)
    }
})
//שינוי כמות במלאי
rauter.put("/:barcode",authMW(),async(req,res)=>{
    if (!req.body.units){
        res.status(401).send("no units field in body or is 0")
        return;
    }
    try{
        const prodact =await Prodact.findOne({barcode:req.params.barcode})
        if (!prodact){
            res.status(401).send("no item with this barcode")
            return;
        }
        if(prodact.unitsInStock+Number(req.body.units)<0){
            res.status(401).send("you cant be under 0 units")
            return;
        }
            prodact.unitsInStock=prodact.unitsInStock+Number(req.body.units);
            res.json(await Prodact.findOneAndUpdate({barcode:req.params.barcode},prodact,{new:true}))
    }catch(error){
        res.status(401).send(error.message)
    }
})
module.exports = rauter;