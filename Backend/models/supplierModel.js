const mongoose = require('mongoose');


const supplierSchema = mongoose.Schema({

    name: {
        type: String,
        required :[true, "please add a name"]

    },
    email: { 
        type: String,
        unique : true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "please add a valid email"
        ]
    },
    photo: {
        type: String,
        required :[true, "please add a Supplier Photo"],
        default: 'no-photo.jpg'

    },
    phone: {
        type: String,
        required :[true, "please add a Supplier Phone"],
        default :"+94xxxxxxxxx"
    },

    status: {
        type: String,
        required :[true, "please add a Supplier Photo"],
    },

    product: {
        type: String,
        required :[true, "please add a Supplier Product"],
    }
}, {
    timestamps: true,
},

);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;

