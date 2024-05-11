import mongoose from 'mongoose';

const { Schema } = mongoose;

const salesSchema = new Schema({
  transactionID: {
    type: String,
    unique: true,
    required: [true, "Transaction ID is Required!"],
  },
  timestamp: {
    type: Date,
    required: [true, "Transaction Date is Required!"],
    default: Date.now(),
  },
  cashier: {
    type: String,
    required: [true, "Transaction Cashier is Required"],
  },
  product: [{
    name: {
      type: String,
      required: [true, "Product Name Required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price Required"],
    },
    qty: {
      type: Number,
      required: [true, "Product Quantity Required"],
      default: 1,
    },
  }],
  totalAmount: {
    type: Number,
    required: [true, "Transaction Amount is Required"],
  },
  customerID: {
    type: String,
  },
  billID: {
    unique: true,
    type: String,
    required: [true, "Transaction Bill Id is Required"],
  },
  paymentMethod: {
    type: String,
    default: "cash",
    required: [true, "Transaction Payment Method is Required"],
  },
  status: {
    type: String,
    default: "completed",
    required: [true, "Transaction Status is Required"],
    enum: ["completed", "returned", "pending"],
  }
}, {
  timestamps: true,
});

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;
