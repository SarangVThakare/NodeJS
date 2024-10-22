const express=require('express');
const app=express();
const PORT=8000;
const mongoose=require('mongoose');

//Connecting with mongosh , copy address from terminal.
mongoose
.connect('mongodb://127.0.0.1:27017/first-tutorial')
.then(()=>{console.log("MongoDB Connected")})
.catch((err)=>{console.log("Mongo Error",err)});
/*Schema: Define the structure.
Schema-Model
Using model, we do CRUD operations.
*/

//Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        //required means it must be filled or it gives error.
        required:true,
    },lastName:{
        type:String,
    },email:{
        type:String,
        required:true,
        //unique means it would check in database whether it is already not present.
        unique:true,
    }, job_title:{
        type:String,
    }, gender:{
        type:String,
        required:true,
    }
},{timestamps:true});
//this timestamps, is a functionality of MongoDB, when the entry is created and updated.
//(name of collection in dbs, schema to be used)
//it will change the name to plural form

const User=mongoose.model("user",userSchema);

app.use(express.urlencoded({extended:false}));

app.get("/users",async (req,res)=>{
        const allDbUsers=await User.find({}); //({}) this empty braces means all data.
        const html=
        `<ul>
        ${allDbUsers.map((user)=>`<li>${user.firstName} -${user.email} </li>`).join("")}
        </ul>`;
        res.send(html);
});

app.route("/users/:id")
.get(async (req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
})
.patch(async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{email:"pd@gmail.com"});
    return res.json({status:"Success"});
})
.delete(async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
});

app.route("/api/users/")
.get(async (req,res)=>{
    const allDbUsers=await User.find({});
    res.setHeader("X-MyName","Sarang");
    return res.json(allDbUsers);
})

.patch(async (req,res)=>{
    //Edit users
    return res.json({status:"Pending"});
})
.post(async (req,res)=>{
    //Create new user...
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
    {
        return res.status(400).json({msg:"All fields are req.."});
    }

    const result= await User.create({
        //list here only the keys in Schema.
        //and body. means what is sent in body by client.
        firstName: body.first_name,
        lastName: body.last_name,
        gender:body.gender,
        email:body.email,
        job_title: body.job_title,
    });
    console.log(result);
    return res.status(201).json({msg:"success"});
})
.delete((req,res)=>{
    //To delete the user's data...
    return res.json({status:"pending"});
});

app.listen(PORT,()=>{console.log("Server intiated...")});
