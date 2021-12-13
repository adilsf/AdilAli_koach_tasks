const generateMessage=(username,text)=>{
    return{
        username,
        text,
    createdAt:new Date().getTime()}
}
const generateLocationMessage=(username,val)=>{
return{
    username,
    val,
createdAt:new Date().getTime()
}}
module.exports={
    generateMessage,
    generateLocationMessage
}