const rauter = require("express").Router();
const logger = require("../logs/logger");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const {Worker,validateWorker,generateWorkerNumber} = require("../models/Worker")
const {authMW} = require("../middleware/auth");
rauter.post("/createadmin",async(req,res)=>{
  const admin = new Worker(req.body);
  admin.password = await bcrypt.hash(admin.password,12);
  admin.workerNum = 1;
  await admin.save();
  res.send(admin);
})
//POST create new Worker
rauter.post("/",authMW("isPersonnelManagerORisAdmin"),async(req,res)=>{
    const {error} = validateWorker(req.body);
    if (error){
      res.status(400).json(error.details[0].message)
      logger.error(`Error message":${error.details[0].message}`);
      return;
    }
    const worker = new Worker(req.body);
    worker.password = await bcrypt.hash(worker.password,12);
    worker.workerNum = Number(await generateWorkerNumber());
    try{    
        await worker.save();
        res.send(worker)
         
    }catch(error){
        res.status(401).send(error.message)
        logger.error(error.message)
    }
})
//POST worker/login 
rauter.post("/login", async (req,res)=>{
    const {error} = ValidateAuth(req.body);
    if (error){
        res.status(400).json(error.details[0].message)
        logger.error(error.details[0].message)
        return;
    }
    const worker = await Worker.findOne({workerNum:req.body.workerNum})
    if (!worker){
        res.status(400).json("the worker num is invalid")
        logger.error("the worker num is invalid")
        return;
    }
      if(worker.loginAttempts < 3){
        const isPasswordValid =  await bcrypt.compare(req.body.password,worker.password);
        if (!isPasswordValid){
            worker.loginAttempts++;
          await Worker.findOneAndUpdate({workerNum:req.body.workerNum},worker);
          res.status(400).json("the Password is invalid")
          logger.error("the Password is invalid")
          return;
        } 
      }
      else{
        setTimeout(async()=>{
            worker.loginAttempts=0;
          await Worker.findOneAndUpdate({workerNum:req.body.workerNum},worker);
        },15000)
        res.status(400).send("Access is denied for 15 minets")
        logger.error("Access is denied for 15 minets")
        return;
      }
    worker.loginAttempts=0;
    await Worker.findOneAndUpdate({workerNum:req.body.workerNum},worker);
    const token = worker.generateAuthToken();
    res.send(token)
  })
  //Get details by worker number
rauter.get("/:workerNum",authMW(),async(req,res)=>{
  const worker = await Worker.findOne({workerNum:req.params.workerNum})
  if(!worker){
    res.status(400).send("worker not faund")
    return
  }
  res.json(worker);
})
//Get details by ID
rauter.get("/byId/:id",authMW(),async(req,res)=>{
  const worker = await Worker.findOne({_id:req.params.id})
  if(!worker){
    res.status(400).send("worker not faund")
    return
  }
  res.json(worker);
})

  //change details . only admin Or PersonnelManager
rauter.put("/:id",authMW("isPersonnelManagerORisAdmin"),async(req,res)=>{

    const worker = await Worker.findOne({workerNum:req.params.id})
    if (!worker){
        res.status(401).send(`the worker number ${req.params.id} not exist`);
        logger.error(`the worker number ${req.params.id} not exist`)
        return;
    }   
    worker.name=req.body.name;
    worker.phone=req.body.phone;
    worker.status=req.body.status;

    try{
        await worker.save();
         res.json(worker);
    }catch(error){
        res.status(400).send(error.message)
        logger.error(error.message)
    }
})

rauter.delete("/:id",authMW("isPersonnelManagerORisAdmin"),async(req,res)=>{
    const worker = await Worker.findOne({workerNum:req.params.id})
    if (!worker){
        res.status(401).send(`the worker number ${req.params.id} not exist`);
        logger.error(`the worker number ${req.params.id} not exist`)
        return;
    }
    if (worker.status==="Admin"){
        res.status(401).send("you cant delete a Admin");
        logger.error(`you cant delete a Admin`)
        return;
    }
    await Worker.findOneAndDelete({workerNum:req.params.id});
    res.json(worker);
})
rauter.put("/orders/:workerNum",authMW(),async(req,res)=>{
  console.log(req.body._id)
  const worker = await Worker.findOne({workerNum:req.params.workerNum});
  worker.orders.push(req.body._id);
  try{
      await Worker.findOneAndUpdate({workerNum:req.params.workerNum},worker);
      res.send(worker);
  }catch(e){
      res.status(400).send(e.message)
  }
})
function ValidateAuth(worker){
    const schema = Joi.object({
        workerNum:Joi.number().min(1).max(1024).required(),
        password:Joi.string().min(6).max(1024).required(),
    })
    return schema.validate(worker);
  }
module.exports = rauter;
