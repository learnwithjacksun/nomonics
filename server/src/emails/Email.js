import { sendEmail } from "../config/email.js";
import {
  Forgot_Password_Email_Template,
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./EmailTemplate.js";

export const sendVerificationEamil = async (email, verificationCode) => {
  try {
    const htmlContent = Verification_Email_Template.replace(
      "{verificationCode}",
      verificationCode
    );
    const info = await sendEmail(email, "Verify your Email", htmlContent);
    console.log("Email send Successfully", info);
  } catch (error) {
    console.log("Email error", error);
  }
};
export const sendWelcomeEmail = async (email, name) => {
  try {
    const htmlContent = Welcome_Email_Template.replace("{name}", name);
    const info = await sendEmail(email, "Welcome Email", htmlContent);
    console.log("Email send Successfully", info);
  } catch (error) {
    console.log("Email error", error);
  }
};

export const sendForgotPasswordEmail = async (email, name, resetUrl) => {
  try {
    const htmlContent = Forgot_Password_Email_Template.replace(
      "{name}",
      name
    ).replace("{resetUrl}", resetUrl);

    const info = await sendEmail(email, "Reset Your Password", htmlContent);
    console.log("Forgot password email sent successfully", info);
  } catch (error) {
    console.log("Forgot password email error", error);
  }
};
