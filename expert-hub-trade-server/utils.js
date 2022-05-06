const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const salt = bcrypt.genSaltSync(10);
const fs = require("fs");
const path = require("path");

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const compareHashedPassword = (hashedPassword, password) => {
  const isSame = bcrypt.compareSync(password, hashedPassword);
  return isSame;
};

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const sendEmail = async ({ to, firstName }) => {
  const nodemailerTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamsaharcourt@gmail.com",
      pass: "hamsa080420",
    },
  });

  const nodemailerOptions = {
    from: "hamsaharcourt@gmail.com",
    to: to,
    subject: "Welcome to Julio Homes",
    html: `
    <!doctype html>
    <html>
      <body>
       <img src="https://res.cloudinary.com/dgn6edv1k/image/upload/v1638971915/logo_ygnoa4.png"/>

      <p>Hi ${firstName}</p>
      <p>
      We welcome you to the Julio Stays family! We are so excited to have you join us.
      </p>
      <p>
      Here at Julio Stays, we provide access to:
      </p>
      <ul>
        <li>Comfortable living spaces no matter your budget</li>
        <li>Host spare rooms in your home and earn money</li>
      </ul>

      <p>We would like to help you settle in fine. React out to us via <a href="mailto:info@juliostays.com">info@juliostays.com</a>
      or call +2349070073451 for support </p>  

      <p>Thank you for choosing us</p>
      
      <p>Best regards,</p>
      <p>Hamsa from Julio Stays 💙</p>
      </body>
    </html>
    `,
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
      <p>Image: <amp-img src="https://res.cloudinary.com/dgn6edv1k/image/upload/v1638971915/logo_ygnoa4.png" width="16" height="16"/></p>

      <p>Hi ${firstName}</p>
      <p>
      We welcome you to the Julio Stays family! We are so excited to have you join us.
      </p>
      <p>
      Here at Julio Stays, we provide access to:
      </p>
      <ul>
        <li>Comfortable living spaces no matter your budget</li>
        <li>Host spare rooms in your home and earn money</li>
      </ul>

      <p>We would like to help you settle in fine. React out to us via <a href="mailto:info@juliostays.com">info@juliostays.com</a>
      or call +2349070073451 for support </p>  

      <p>Thank you for choosing us</p>
      
      <p>Best regards,</p>
      <p>Hamsa from Julio Stays 💙</p>
      </body>
    </html>`,
  };

  nodemailerTransporter.sendMail(nodemailerOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  hashPassword,
  compareHashedPassword,
  createToken,
  sendEmail,
};
