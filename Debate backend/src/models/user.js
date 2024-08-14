import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    contact: {
      type: Number,
    },
    profile: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      default: 'ACTIVE'
    }
  }, { timestamps: true });

export const userModel = mongoose.model('user', userSchema);
