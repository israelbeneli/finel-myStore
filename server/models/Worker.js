const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken")
const config = require("config")
const workerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlangth:2,
        maxlangth:255
    },
    workerNum:{
        type:Number,
        unique:true,
        minlangth:1,
        maxlangth:1024,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['Salesman', 'PersonnelManager', 'PurchasingManager', 'Admin'],
        minlangth:2,
        maxlangth:255,
        default:"SalesMan" 
    },
    phone:{
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
    },
    password:{
        type:String,
        required:true,
        minlangth:6,
        maxlangth:1024,
    },
    loginAttempts:{
        type:Number,
        default:0
    },
    orders:
    [
        {
        order_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        }
    ]
})
workerSchema.methods.generateAuthToken = function(){
    return(jwt.sign({_id:this._id , workerNum:this.workerNum , password:this.password,status:this.status},config.get("auth.JWT_SECRET")));
}
async function generateWorkerNumber(number) {
    let numberSend=number;
    while (true) {
      const randomNumber =numberSend || _.random(0,999);
      const worker = await Worker.findOne({ workerNum: randomNumber });
      if (!worker) {
        return String(randomNumber);
      }
      numberSend = null;
    }
    
}
function validateStatus(status) {
    const allowedValues = ['Salesman', 'PersonnelManager', 'PurchasingManager', 'Admin'];
    if (status.every(statusVal =>allowedValues.includes(statusVal))) {
      throw new Error('Invalid status');
    }
    return status;
  }
const Worker = mongoose.model("Worker",workerSchema,"workers")
function validateWorker(worker){
    const schema = Joi.object({
        name:Joi.string().min(2).max(255).required(),
        status:Joi.string().min(2).max(255).default("SalesMan"),
        phone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
        password:Joi.string().min(6).max(1024).required(),
        orders:Joi.string().default([])
    })
    return (schema.validate(worker))
}
module.exports = {Worker,validateWorker,generateWorkerNumber,validateStatus}