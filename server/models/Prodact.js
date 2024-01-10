const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const prodactSchema = new mongoose.Schema({
barcode:{
    type:String,
    required:true,
    unique:true,
    minlangth:5,
    maxlangth:255
        },
prodactDetails:{
    name:{
        type:String,
        minlength:2,
        maxlength:255,
        required:true
    },
    model:{
        type:String,
        minlength:2,
        maxlength:255,
        required:true
    },
    description:{
        type:String,
        minlength:2,
        required:true
    },
},
provider:{
    providerId:{ type: mongoose.Schema.Types.ObjectId, ref: "provider" },
    providerName:{type:String,minlength:2}
},
family:{
    type:String,
    enum:["לבנים","קטנים","טכנולוגיה","אחר"],
    required:true
},
price:{
    type:Number,
    min: 0,
    default:0,
    required:true
},
// priceAfterDisc:{
//     type:Number,
//     min: 0,
//     default:0,
//     required:true
// },
maxDiscount:{
    type:Number,
    minlength:0,
    maxlength:100,
    default:0
},
unitsInStock:{
    type:Number,
    minlength: 0,
    maxlength: 1024,
    default:0
},
image:{
    url:{
        type: String,
        minlength: 11,
        maxlength: 1024,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    alt:{
        type:String,
        minlangth:2,
        maxlangth:255, 
    },
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
  },
}
})
const Prodact = mongoose.model("Prodact",prodactSchema,"prodact");
function validateProdact(prodact){
    const schema = Joi.object({
        barcode:Joi.string().min(2).max(255).required(),
        prodactDetails: Joi.object({
            name: Joi.string().min(2).max(255).required(),
            model: Joi.string().min(2).max(255).required(),
            description: Joi.string().min(2).required(),
          }),
        family: Joi.string().valid('לבנים', 'קטנים', 'טכנולוגיה', 'אחר').required(),   
        price: Joi.number().min(0).default(0).required(),
        maxDiscount: Joi.number().min(0).max(100).default(0),
        unitsInStock: Joi.number().min(0).max(1024).default(0),
        provider: Joi.object({
            providerId:Joi.string().min(3).required(),
            providerName:Joi.string()
        }),
        image: Joi.object({
            url: Joi.string().min(11).max(1024).default("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"),
            alt: Joi.string().min(2).max(255),
        })
    })
    return (schema.validate(prodact))
}
module.exports={Prodact,validateProdact}