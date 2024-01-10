const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");

const providerSchema = new mongoose.Schema({
    providerNum:{        
        type:Number,
        unique:true,
        minlangth:1,
        maxlangth:1024,
        required:true
    },
    providerName:{
        type:String,
        required:true,
        minlangth:2,
        maxlangth:255
    },
    agentName:{
        type:String,
        minlangth:2,
        maxlangth:255
    },
    agentPhone:{
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
    }
})
async function generateProviderNumber(number) {
    let numberSend=number;
    while (true) {
      const randomNumber =numberSend || _.random(0,9999);
      const provider = await Provider.findOne({ providerNum: randomNumber });
      if (!provider) {
        return String(randomNumber);
      }
      numberSend = null;
    }
    
}
const Provider = mongoose.model("Providers",providerSchema,"provider");
function validateProvider(provider){
    const schema = Joi.object({
        providerNum:Joi.number(),
        providerName:Joi.string().min(2).max(255).required(),
        agentName:Joi.string().min(2).max(255),
        agentPhone:Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    })
    return(schema.validate(provider))
}
module.exports = {Provider,validateProvider,generateProviderNumber}