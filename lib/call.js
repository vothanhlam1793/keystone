var fetch = require("node-fetch");


function callOTP(phone, code, cb){
    var url = "https://voiceotp.talking.vn/webservice/clicktodialplan?customerCode=vtlamvoiceotp&appType=NOTICEMSG&callToPhone=" + phone + "&data=" + code + "&repeat=2";
    fetch(url).then(data=>data.json()).then(data=>{
        sendGoogleSheet(data);
        if(cb){
            cb(data);
        }
    });
}

function sendGoogleSheet(data){
    var url="https://docs.google.com/forms/d/e/1FAIpQLSc5XHO0M4yOQ1_Xp1SswmHgO1VFaHCSw3wi2llmRLhH9IABWA/formResponse?usp=pp_url&entry.1728958714=" + data.message + "&entry.1871970215=" + data.author + "&entry.1958947981=" + data.requestFrom + "&entry.1835095042=" + data.receivedAt + "&entry.2087159540=" + data.status + "&entry.1834391780=" + data.action + "&entry.1778792762="+data.code+"&entry.221939848="+data.responseAt+"&entry.563157724="+data.responseAt+"&entry.1510244630="+data.processid+"&entry.372092611=" + data.version;
    try {
        fetch(url);
    } catch (e) {
        console.log(e);
    }

}

module.exports.callOTP = callOTP;