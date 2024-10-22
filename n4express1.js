const express=require('express');
const app=express();
//here app is an internal handler, which do all the scratch work for us.
app.get('/',(req,res)=>{
return res.send(`Home Page => ${req.query.name} and ${req.url} and ${req.method}`);
});

app.get('/about',(req,res)=>{
    return res.send("About Us");
});

app.listen(8000,()=>{console.log("Server started...")});
