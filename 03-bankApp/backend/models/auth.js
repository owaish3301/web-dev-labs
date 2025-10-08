const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true
    },
    balance:{
        type: Number,
        default : 1000
    }
})

const User = mongoose.model("users",userSchema);

module.exports={User};