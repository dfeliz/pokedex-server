/* eslint-disable no-undef */
"use strict";
const nodemailer = require("nodemailer");
const webAppConfig = require('../../core/webAppConfig');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    user: process.env.SERVER_EMAIL_USERNAME, // Configured email in config.js
    pass: process.env.SERVER_EMAIL_PASSWORD // Configured password in config.js
  }
});

exports.sendActivation = (email, hash) => {
  try {
    transporter.sendMail({
      from: process.env.SERVER_EMAIL_USERNAME, // sender address
      to: email, // list of receivers
      subject: "Account activation", // Subject line
      text: `This is an automated email. Account activation link: http://${process.env.WEBAPP_HOST}:${process.env.WEBAPP_PORT}/activate?email=${email}&code=${hash}`, // plain text body
    })
    console.log("activation email sent");
  }
  catch (err) {
    console.error(err);
  }
}

exports.sendPasswordReset = (email, hash, user) => {
  try {
    transporter.sendMail({
      from: process.env.SERVER_EMAIL_USERNAME, // sender address
      to: email, // list of receivers
      subject: "Password reset", // Subject line
      text: `You have requested password reset, heres the link: http://${process.env.WEBAPP_HOST}:${process.env.WEBAPP_PORT}/reset-password?email=${email}&code=${hash}`, // plain text body
    })
    console.log("password email sent");
  }
  catch (err) {
    console.error(err);
  }
}