const fs = require("fs")
const jsonData1 =require("../model/jsonData1")
const jsonData2 =require("../model/jsonData2")
const saveData1 = ()=>{
    const buffer = fs.readFileSync("koach_students_JSON1.json")
    const data = JSON.parse(buffer)
    console.log(data.length)
    for(let i=0;i<data.length;i++){
        jsonData1.create({
            std_name:data[i].std_name,
            std_code:data[i].std_code,
            std_id:data[i].std_id,
            status:data[i].status,
            grp_id:data[i].grp_id
        })
    }
}
const saveData2 = ()=>{
    const buffer = fs.readFileSync("koach_students_JSON2.json")
    const data = JSON.parse(buffer)
    console.log(data.length)
    for(let i=0;i<data.length;i++){
        jsonData1.create({
            grp_name:data[i].grp_name,
            grp_code:data[i].grp_code,
            grp_id:data[i].grp_id,
            status:data[i].status,
            clg_id:data[i].clg_id
        })
    }
}
const saveData3 = ()=>{
    const buffer = fs.readFileSync("koach_students_JSON3.json")
    const data = JSON.parse(buffer)
    console.log(data.length)
    for(let i=0;i<data.length;i++){
        jsonData1.create({
            clg_name:data[i].clg_name,
            clg_code:data[i].clg_code,
            clg_id:data[i].clg_id,
            status:data[i].status,
           })
    }
}