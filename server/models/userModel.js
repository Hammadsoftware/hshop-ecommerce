import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    details: {
      firstName: { type: String },
      lastName: { type: String },
      companyName: { type: String },
      country: { type: String },
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
