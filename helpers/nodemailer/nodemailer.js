"use strict";
const nodemailer = require("nodemailer");
const config = require('../../core/config');
const webAppConfig = require('../../core/webAppConfig');

// async..await is not allowed in global scope, must use a wrapper
exports.sendmail = async (email, hash) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    auth: {
      user: config.emailUsername, // Configured email in config.js
      pass: config.emailPassword // Configured password in config.js
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.emailUsername, // sender address
    to: email, // list of receivers
    subject: "Account activation", // Subject line
    text: `This is an automated email. Account activation link: ${webAppConfig.host}:${webAppConfig.port}/activate?email=${email}&code=${hash}`, // plain text body
  })
  .then(() => {
    console.log("email sent");
  })
  .catch(console.error);
}