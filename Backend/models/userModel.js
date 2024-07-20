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

const User = mongoose.model("User", userSchema);
export default User;
