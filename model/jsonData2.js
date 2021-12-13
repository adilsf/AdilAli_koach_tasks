const mongoose = require("mongoose")

const jsonData2 = mongoose.model("data2",{
    grp_name:{
        type:String
    },
    grp_code:{
        type:String
    },
    grp_id:{
        type:String
    },
    status:{
        type:Boolean
    },
    clg_id:{
        type:String
    },
})

module.exports =jsonData2