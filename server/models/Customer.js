const Joi = require("joi");
const mongoose = require("mongoose");
// const jwt= require("jsonwebtoken");
const config = require("config");
const customerSchema = new mongoose.Schema({
    name:{
        first:{
            type:String,
            required:true,
            minlangth:2,
            maxlangth:255,
        },
        last:{
            type:String,
            required:true,
            minlangth:2,
            maxlangth:255,
        },
        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
      },
    },
    israeliId:{
        type:String,
        required:true,
        unique:true,
        minlangth:9,
        maxlangth:9
    },
    phone:{
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
      },
    email:{
        type:String,
        required:true,
        minlangth:6,
        maxlangth:255,
        unique:true,
    },
    address:{
        city:{
            type:String,
            required:true,
            minlangth:2,
            maxlangth:255,
        },
        street:{
            type:String,
            required:true,
            minlangth:2,
            maxlangth:255,
        },
        houseNumber:{
            type:Number,
            minlangth:1,
            maxlangth:1024,
        },
        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
      },
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    orders:
    [
        {
        order_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        }
    ]
})

function ValidateCustomer(user){
    const schema = Joi.object({
        israeliId:Joi.string().regex(/^[0-9]{9}$/).message("the string must be a 9 digit"),
        name:Joi.object({
            first:Joi.string().min(3).max(255).required(),
            last:Joi.string().min(3).max(255).required(),
        }),
        phone:Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
        email:Joi.string().min(6).max(255).required().email(),
        address:Joi.object({
            city:Joi.string().min(2).max(255).required(),
            street:Joi.string().min(2).max(255).required(),
            houseNumber:Joi.number().min(1).max(1024).required(),
        }),
    })
    return (schema.validate(user))
}
const Customer = mongoose.model("Customers",customerSchema,"customer");
module.exports = {Customer,ValidateCustomer}