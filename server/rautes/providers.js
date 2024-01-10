const rauter = require("express").Router();
const{Provider,validateProvider,generateProviderNumber} = require("../models/Provider");
const {authMW} = require("../middleware/auth")
const logger = require("../logs/logger");
rauter.post("/",authMW("isPurchasingManagerORisAdmin"),async(req,res)=>{
    const {error} = validateProvider(req.body);
    if (error){
      res.status(400).json(error.details[0].message)
      logger.error(`Error message":${error.details[0].message}`);
      return;
    }
    try{
        const provider = new Provider(req.body);
        provider.providerNum = Number(await generateProviderNumber(req.body.providerNum));
        await provider.save();
        res.send(provider)
         
    }catch(error){
        res.status(401).send(error.message)
        logger.error(error.message)
    }
})
rauter.get("/Byid/:id",authMW("isPurchasingManagerORisAdmin"),async(req,res)=>{
    try {
        const provider = await Provider.findOne({_id:req.params.id});
        res.send(provider)
    }
    catch(e){
        res.status(400).send(e.message)
    }

})
rauter.get("/:providerNum",authMW("isPurchasingManagerORisAdmin"),async(req,res)=>{
    try{
        const provider =await Provider.findOne({providerNum:req.params.providerNum});
        if(provider){
            res.json(provider)
            return provider
        }
        else{
            res.status(400).send("provider not exist")
            return 
        }
    }
    catch(e){
       res.status(400).send(e.message)
    }
    
})

rauter.put("/:providerNum",authMW("isPurchasingManagerORisAdmin"),async(req,res)=>{
    try{
        let provider = await Provider.findOne({providerNum:req.params.providerNum});
        if (provider){
            provider.agentName=req.body.agentName;
            provider.agentPhone=req.body.agentPhone;
            provider = await Provider.findOneAndUpdate({providerNum:req.params.providerNum},provider,{new:true})
            res.json(provider) ;  
            return; 
            }
        res.status(401).send(`not provider with ${req.params.providerNum} number`)
    }catch(error){
        res.status(402).send(error.message)
    }
})
module.exports = rauter;