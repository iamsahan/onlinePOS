import mongoose from 'mongoose';

const { Schema } = mongoose;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  email: { 
    type: String,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please add a valid email"
    ]
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  phone: {
    type: String,
    required: [true, "Please add a Supplier Phone"],
    default: "+94xxxxxxxxx"
  },
  status: {
    type: String,
    required: [true, "Please add a Supplier Status"],
  },
  product: {
    type: String,
    required: [true, "Please add a Supplier Product"],
  }
}, {
  timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
