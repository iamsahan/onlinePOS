const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lasttName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have a email"],
    lowecase: true,
    validete: [validator.isEmail, "Provide a valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "manager", "cacheir", "employee", "customer"],
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
    required: [true, "A user must have a password comfirm"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
