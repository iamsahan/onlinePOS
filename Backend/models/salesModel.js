const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
   
        transactionID : {
            type : String,
            unique : true,
            required : [true, "Transaction ID is Required!"],
        },

        timestamp : {
            type : Date,
            required : [true, "Transaction Date is Required!"],
            default : Date.now()
        },

        cashier : {
            type : String,
            required : [true, "Transaction Cashier is Reqired"],
        },

        product : [{
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

        customerID : {
            type : String,
        },

        billID : {
            unique : true,
            type : String,
            required : [true, "Transaction Bill Id is Reqired"],
        },

        paymentMetod : {
            type : String,
            default : "cash",
            required : [true, "Transaction Payment Method is Reqired"],
        },

        status : {
            type : String,
            default : "pending",
            required : [true, "Transaction Status is Reqired"],
            enum : ["completed", "returned", "pending"]
        }
    }
);

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;