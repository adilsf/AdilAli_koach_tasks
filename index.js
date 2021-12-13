const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose")
const {saveData,searchData} =require("./controller/user")        

mongoose.connect("mongodb://127.0.0.1:27017/project",(err,res)=>{
if(err){
    console.log(err)
}else{
    console.log("connected to db")
}
})

app.use(urlencoded({extended:true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/register",async(req,res)=>{
    console.log(req.body)
        const data =await searchData(req.body.email)
       
       console.log(data)
        if(data){
            return res.send("email already exist")
        }
    if(req.body.password == req.body.cpassword){
        saveData(req.body);
        res.send("done")

    }else{
        res.send("please enter same password")
    }
    
})
app.post("/login",async(req,res)=>{
const result =await searchData(req.body.Lemail)
console.log(req.body)
if(result){
    if(result.password == req.body.Lpassword){
        res.redirect("/chatApp")
    }else{
        res.send("please enter correct password")
    }
}    
})

app.listen(3000,()=>{
console.log("server is on the port",3000);
})
