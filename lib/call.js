var fetch = require("node-fetch");


function callOTP(phone, code, cb){
    var url = "https://voiceotp.talking.vn/webservice/clicktodialplan?customerCode=vtlamvoiceotp&appType=NOTICEMSG&callToPhone=" + phone + "&data=" + code + "&repeat=2";
    fetch(url).then(data=>data.json()).then(data=>{
        console.log(data);
        if(cb){
            cb(data);
        }
    });
}

module.exports.callOTP = callOTP;