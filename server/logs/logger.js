const pino = require("pino");
const fileTransport = pino.transport({
    target:`pino/file`,
    options:{destination:`${__dirname}/app.log`}
})
module.exports = pino(
{
    level: process.env.PINO_LOG_LEVEL|| "info",
    formatters:{
        level:(lable)=>{
            return{level:lable.toUpperCase()}
            }
    },
    timestamp:pino.stdTimeFunctions.isoTime,
    
},
fileTransport,

);

