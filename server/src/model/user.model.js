import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["reader", "creator"],
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    earnings: {
      type: Number,
      default: 0,
    },
    totalComics: {
      type: Number,
      default: 0,
    },
    savedComics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comic",
      },
    ],
    purchasedComics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comic",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      sendPromotionalEmails: {
        type: Boolean,
        default: true,
      },
    },
    otp: String,
    otpExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiresAt;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpires;
      },
    },
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
