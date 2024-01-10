require("dotenv/config")
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const chalk = require("chalk");
const logger = require("./logs/logger");
const path = require("path");

const customerRaute = require("./rautes/customers")
const orderRaute = require("./rautes/orders")
const prodactRaute = require("./rautes/prodacts")
const providerRaute = require("./rautes/providers")
const workerRaute = require("./rautes/workers")

const app = express();

app.use(cors());
app.use(morgan(`DATE: :date[web] ; METHOD: :method ; URL: :url ; STATUS: :status ; RESPONSE TIME: :response-time ms`));
app.use(express.json());

app.use("/api/customers",customerRaute);
app.use("/api/orders",orderRaute);
app.use("/api/prodacts",prodactRaute);
app.use("/api/providers",providerRaute);
app.use("/api/workers",workerRaute);

 
mongoose.connect(config.get("mongoDB.MONGO_URI"))
.then(()=>console.log(chalk.green.bold("connected to DB")))
.catch(()=>console.log(chalk.red.bold("the conection to DB is faild")))

app.use(express.static(path.join(__dirname, 'public')));
app.all("*",(req,res)=>{
    res.status(404).send("page not found")
    logger.error("page not found")
    
})

app.listen(config.get("server.PORT"),console.log(chalk.green.bold("connected to",config.get("server.PORT"))));