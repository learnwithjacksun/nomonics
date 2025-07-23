import nodemailer from "nodemailer";
import process from "process";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.APP_GMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendEmail = async (email, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: '"Nomomics" <imcarl0.uc@gmail.com>',
      to: email,
      subject,
      html: htmlContent,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info);
    return info;
  } catch (error) {
    console.log(error);
  }
};
