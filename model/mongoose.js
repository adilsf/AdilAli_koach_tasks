const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const User = mongoose.model("user",userSchema)

module.exports = User