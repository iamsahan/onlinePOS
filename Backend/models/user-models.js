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
    password:{
        type: String,
        required :[true, "please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [12, "Password must not be more than 12 characters"],
        
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
    bio:{
        type: String,
        maxlength: [12, "Password must not be more than 400 characters"],
        default :"bio"
    }
}, {
    timestamps: true,
},




);
const User = mongoose.model('User', userSchema)
module.exports = User

