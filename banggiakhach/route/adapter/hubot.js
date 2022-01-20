var fetch = require("node-fetch");
module.exports.hubot = async (content, room) => {
    return fetch("http://node.creta.work:1888/hubot/lam", {
        method: "POST",
        body: JSON.stringify({
            room: room,
            message: content
        })
    })
}