const {Schema,model}=require('mongoose');
const {createHmac,randomBytes}=require('crypto');
const { createTokenForUser } = require('../services/auth');
//createHmac hashes the password
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:"/images/default.png"
    },
    role:{
        type:String,
        //enumeration means other than that no value is possible
        enum:['USER','ADMIN'],
        default:"USER",
    }
},{timestamps:true});

userSchema.pre("save",function (next){
    const user=this;

    //if password is not modifying in user(either while signing up or resetting password) return;
    if(!user.isModified("password")) return;
    //this is generating a random string, secret key.
    const salt=randomBytes(16).toString();
    //hashed password: (algorithm, key)
    //hash based message authentication code
    const hashedPassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex"); 
    this.salt=salt;
    this.password=hashedPassword;
    next();
});

//making a function of yours for this Schema, virtual functions
userSchema.static('matchPasswordAndGenerateToken',async function (email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error("User Not Found!!");
    const salt=user.salt;
    const hashedPassword=user.password;
    const userProvidedHash=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    if(hashedPassword===userProvidedHash) {
    const token=createTokenForUser(user);
    return token;
    }else{
    throw new Error("!Incorrect Password");
    }
});

const User=model('user',userSchema);

module.exports=User;