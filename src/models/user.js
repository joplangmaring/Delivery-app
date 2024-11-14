// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
  provider: String,
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: String,          // Token for password reset
  resetPasswordExpires: Date,           // Expiry date for the token
  otp: String,                         // Field to store OTP
  otpExpires: Date,                    // Expiration date for the OTP
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
