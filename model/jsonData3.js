const mongoose = require("mongoose")

const jsonData3 = mongoose.model("data3",{
    clg_name:{
        type:String
    },
    clg_code:{
        type:String
    },
    clg_id:{
        type:String
    },
    status:{
        type:Boolean
    },
})

module.exports =jsonData3