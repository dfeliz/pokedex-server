"use strict";
const nodemailer = require("nodemailer");
const config = require('../../core/webAppConfig');

// async..await is not allowed in global scope, must use a wrapper
exports.sendmail = async (email, hash) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Pokedex App" <pokedex@pokemail.com>', // sender address
    to: email, // list of receivers
    subject: "Account activation", // Subject line
    text: "This is an automated email.", // plain text body
    html: `<b>Hello world?</b> <br></br> <a href="${config.host}:${config.port}/activate?email=${email}&code=${hash}">Click here to activate your account</a>`
  }).catch(console.error);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}