import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Google",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
