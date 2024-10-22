const {v4:uuidv4}=require('uuid');
const User=require("../models/user");

const {setUser,getUser}=require("../services/auth");
async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("login");
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user) return res.render("login",{
        error: "Invalid Username or Password",
    });
    
    const token = setUser(user);
    res.cookie("uid",token,{
        //domain:".google.com", this. before google.com allows all subsites of google for it, like drive.google.com and docs.google.com if . is not given just google.com can access it not other pages.
        //expires:"", 
    }

    //return res.json({token});

    );
    return res.redirect("/");
}
module.exports={handleUserSignUp,handleUserLogin};