const mongoose = require("mongoose")

const jsonData1 = mongoose.model("data1",{
    std_name:{
        type:String
    },
    std_code:{
        type:String
    },
    std_id:{
        type:String
    },
    status:{
        type:Boolean
    },
    grp_id:{
        type:String
    },
})
module.exports =jsonData1