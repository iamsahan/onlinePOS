import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  payID: {
    type: String,
    unique: true,
    required: [true, "Payment ID is Required!"],
  },
  managerID: {
    type: String,
    required: [true, "Payer Id is Required!"],
  },
  reason: {
    type: String,
    required: [true, "Payment Reason is Required!"],
  },
  date: {
    type: Date,
    required: [true, "Transaction Date is Required!"],
    default: Date.now(),
  },
  beneficiary: [{
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
  status: {
    type: String,
    default: "completed",
    required: [true, "Transaction Status is Required"],
    enum: ["completed", "cancelled", "pending"],
  }
}, 
{
  timestamps: true,
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;
