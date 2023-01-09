const mongoose=require("mongoose");

const schema=mongoose.Schema({
    _id:String,
    data:Object
})



const Data=mongoose.model("data",schema);

module.exports={Data}