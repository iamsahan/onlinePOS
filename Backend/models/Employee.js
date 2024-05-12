import mongoose from "mongoose";

const employeeSchema =  mongoose.Schema({
  EmpID: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  
  phone: {
    type: String,
    unique: true,
    required: [true, 'User must have a phone number'],
   
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Cashier", "Biller"],
    default: "Biller",
  },
  password: {
    type: String,
   

  },
  passwordConfirm: {
    type: String,

  },
});

export const Employee = mongoose.model('Employee', employeeSchema);
