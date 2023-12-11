// const expressAsyncHandler = require("express-async-handler");
import nodemailer from "nodemailer";

const sendMail = async ({ emails, html }) => {
  try {
    const emails = [
      "nhanchidanh@gmail.com",
      "danhb1910196@student.ctu.edu.vn",
      "suongb1910289@student.ctu.edu.vn",
    ];

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_NAME, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Elearning" <no-reply@elearning.com>', // sender address
      to: emails.join(", "), // list of receivers
      subject: "Thông báo mới từ Elearning", // Subject line
      // text: "Hello world?", // plain text body
      html: html, // html body
    });

    return info;
  } catch (error) {
    console.log("error: ", error);
  }
};

export default sendMail;
