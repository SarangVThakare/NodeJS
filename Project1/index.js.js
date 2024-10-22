/*Model View Controller:
Model, View, Controller
Controller manipulates model and model updates view.
*/

//requiring express
const express=require('express');
const app=express();

//requiring connection
const {connectMongoDB}=require('./connection');
//requiring middlewares
const {logReqRes}=require("./middlewares");
//requiring router
const userRouter=require('./routes/user');
//deciding port
const PORT=8000;

//Made connection
connectMongoDB("mongodb://127.0.0.1:27017/first-tutorial")
.then(()=>{console.log("MongoDB Connected")})
.catch((err)=>{console.log("Mongo Error",err)});

//Used Middlewares
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Routes
app.use('/users',userRouter);
//Listened the app on port.
app.listen(PORT,()=>{console.log("Server intiated...")});
