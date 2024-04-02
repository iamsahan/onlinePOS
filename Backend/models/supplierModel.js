const mongoose = require('mongoose');


const userSchema = mongoose.Schema({


    name:{
        type: String,
        required :[true, "please add a name"]

    },
    email:{
        type: String,
        required :[true, "please add a email"],
        unique : true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "please add a valid email"
        ]
    },
    photo:{
        type: String,
        required :[true, "please add a Photo"],

        default: 'no-photo.jpg'

    },
    phone:{
        type: String,
        default :"+94xxx"
    },
}, {
    timestamps: true,
},

);

const User = mongoose.model('User', userSchema)
module.exports = User

