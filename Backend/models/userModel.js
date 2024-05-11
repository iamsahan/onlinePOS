import mongoose from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'User must have a phone number'],
    validate: {
      validator: (el) => /^\d+$/.test(el) && /^\d{10}$/.test(el),
      message: 'Enter a valid phone number',
    },
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "cashier", "employee", "customer"],
    default: "customer",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password confirm"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encrypt the password field
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changepasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changeTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.passwordResetToken = crypto.createHash('sha256').update(otp).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return otp;
};

const User = mongoose.model("User", userSchema);
export default User;
