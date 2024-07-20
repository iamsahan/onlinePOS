import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  email : {
    type: String,
    required: [true, "A user must have a password"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8
  },
});

// Hash the password before saving the user
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// Method to check password validity
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// // Encrypt the password field
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password') || this.isNew) {
//     return next();
//   }

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changepasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changeTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//     return JWTTimestamp < changeTimeStamp;
//   }
//   return false;
// };

// userSchema.methods.createPasswordResetOTP = function () {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   this.passwordResetToken = crypto.createHash('sha256').update(otp).digest('hex');
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return otp;
// };

const User = mongoose.model("User", userSchema);
export default User;
