require("dotenv").config();

("use strict");
const nodemailer = require("nodemailer");
const sendMail = async (to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.email_user,
      pass: process.env.email_pass,
    },
  });

  var mailOptions = {
    from: "hiddenbrain@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
