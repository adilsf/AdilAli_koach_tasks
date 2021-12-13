const user = require("../model/mongoose")

const saveData = (data)=>{
    const me = user.create({
        email:data.email,
        password:data.password
    }).then(()=>{
        console.log(me)
    })
    
}
const searchData = async(email)=>{
    const result =await user.findOne({email})
    console.log(result)
    
    return result;
}

module.exports = {saveData,searchData}