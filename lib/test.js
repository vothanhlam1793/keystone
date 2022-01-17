// File enviroment
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env);

var mail = require("./mail");
async function mailt(){
    console.log(await mail.sendEmailWelcome("vothanhlam1793@gmail.com"));
} 

mailt();