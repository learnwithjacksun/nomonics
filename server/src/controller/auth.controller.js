import bcrypt from "bcryptjs";
import UserModel from "../model/user.model.js";

import {
  sendForgotPasswordEmail,
  sendVerificationEamil,
} from "../emails/Email.js";
import generateRandomNumber from "../utils/generateRandomNumbers.js";
import toSlug from "../utils/toSlug.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const onError = (res, error) => {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, role, sendPromotionalEmails } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateRandomNumber(4);
    const otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      username: toSlug(name) + generateRandomNumber(2),
      otp,
      otpExpiresAt,
      preferences: {
        sendPromotionalEmails,
      },
    });

    await newUser.save();

    await sendVerificationEamil(newUser.email, otp);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in the required field",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credientials",
      });
    }

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};



export const sendResetPasswordLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    const resetPasswordToken = generateRandomNumber(6);
    const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const resetUrl = `${env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

    await sendForgotPasswordEmail(user.email, user.name, resetUrl);

    res.status(200).json({
      success: true,
      message: "Reset Password Link sent to your email",
    });
  } catch (error) {
    onError(res, error);
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await UserModel.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Reset Password Link expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};

export const verifyUser = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await UserModel.findOne({ otp });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;

    await user.save();

    
    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
        expiresIn: "1d",
      });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateRandomNumber(4);
    const otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendVerificationEamil(user.email, otp);

    return res.status(200).json({
      success: true,
      message: "Verification OTP resent to your email",
    });
  } catch (error) {
    onError(res, error);
  }
};

export const checkAuth = async (req, res) => {
  const id = req.user.id;
  const token = req.token;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found or token is invalid",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
};
