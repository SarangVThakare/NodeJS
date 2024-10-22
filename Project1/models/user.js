const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true,
},
lastName:{
    type:String,
},
email:{
    type:String,
}
},{timestamps:true})

const User=mongoose.model("clients",userSchema);

module.exports=User;