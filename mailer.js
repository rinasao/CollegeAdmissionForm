// exports.sendMail = function(receiver,message){

const nodemailer = require("nodemailer");

exports.sendMail = async function (recepient, password) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "rinasaobit@gmail.com", // generated ethereal user
      pass: "bittsaoorinaa", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Do Not Reply 👻"', // sender address
    to: recepient, // list of receivers
    subject: "No Reply ✔", // Subject line // plain text body
    html: "<b>Your Password is ----- ?</b>" + password, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

// }
