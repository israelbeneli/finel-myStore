const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash")
const {Prodact} = require("./Prodact")
const orderSchema = new mongoose.Schema({
    orderNum:{
        type: Number,
        unique: true,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    customer:{ type: mongoose.Schema.Types.ObjectId, ref: "Customers" },
    prodacts:
    [
        {
        prodact:{ type: mongoose.Schema.Types.ObjectId, ref: "Prodact" },
        units:{
            type:Number,
            default:1
            }
        }
    ],
    totalPrice:{
        type:Number
    },
    worker:{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
    paidUp:{
        type:Boolean,
        default:false
    },
    provided:{
        type:Boolean,
        default:false 
    }

})
async function generateOrderNumber() {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let order = await Order.findOne({orderNum:randomNumber})
    if (!order) return randomNumber;
  }
}

const Order = mongoose.model("Order",orderSchema,"orders")


function validateOrder(order){
const schema= Joi.object({
    orderNum: Joi.number().integer().positive().required(),
    createdAt: Joi.date().default(new Date()),
    prodacts: Joi.array().items(
      Joi.object({
        units: Joi.number().integer().min(0).default(1),
      })
    ),
    totalPrice: Joi.number().default(0),
    paidUp: Joi.boolean().default(false),
    provided: Joi.boolean().default(false),
  });
  return(schema.validate(order))
}

module.exports = {Order,validateOrder,generateOrderNumber}