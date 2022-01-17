var { createTransport, getTestMessageUrl } = require('nodemailer');
const transport = createTransport({
    // @ts-ignore
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
function makeANiceEmail(text) {
    return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>1
      <p>${text}</p>

      <p>😘, Wes Bos</p>
    </div>
  `;
}
exports.sendPasswordResetEmail = async function (resetToken, to) {
    var _a;
    // email the user a token
    const info = await transport.sendMail({
        to,
        from: 'wes@wesbos.com',
        subject: 'Your password reset token!',
        html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
    });
    if ((_a = process.env.MAIL_USER) === null || _a === void 0 ? void 0 : _a.includes('ethereal.email')) {
        console.log(`� Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
    }
}

exports.sendEmailWelcome = async function (to){
    return await transport.sendMail({
        to,
        from: "cretasolu@gmail.com",
        subject: "Chào mừng đến với cộng đồng Creta",
        html: `
            <div>Hello Black!</div>
        `
    })    
}