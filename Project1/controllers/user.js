//file in which schema and model is defined...
const User=require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers=await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user){return res.status(404).json({error:"User not found"});}
    return res.json(user);
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:"Captain"});
    return res.json({status:"Successfully updated"});
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Successfully deleted"});
}

async function handleCreateNewUser(req,res){
    const body=req.body;
    if(!body || !body.firstName || !body.lastName || !body.email){
        return res.status(400).json({msg:"All fields are requireed"});
    }
    const result=await User.create({
        firstName: body.firstName,
        lastName:body.lastName,
        email:body.email,
    });

    return res.status(201).json({msg:"User is created"});
}

module.exports={
    handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser,
};