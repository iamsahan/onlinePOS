const mongoose = require('mongoose');

const paymentMetodSchema = new mongoose.Schema({

    payID : {
        type : String,
        unique : true,
        required : [true, "Payment ID is Required!"],
    },

    managerID : {
        type : String,
        required : [true, "Payer Id is Reqired!"],
    },

    reason : {
        type : String,
        required : [true, "Payment Reason is Required!"]
    },

    date : {
        type : Date,
        required : [true, "Transaction Date is Required!"],
        default : Date.now()
    },

    beneficiary : [{
        name : {
            type : String,
            required : [true, "Product Name Reqired"],
        },
        price : {
            type : Number,
            required : [true, "Product Price Reqired"],
        },
        qty : {
            type : Number,
            required : [true, "Product Quantity Reqired"],
            default : 1
        },
    }],

    totalAmount : {
        type : Number,
        required : [true, "Transaction Amount is Reqired"],
    },

    status : {
        type : String,
        default : "completed",
        required : [true, "Transaction Status is Reqired"],
        enum : ["completed", "cancelled", "pending"]
    }
}, 
{
    timestamps : true
})